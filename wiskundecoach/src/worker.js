export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // Test van de backend
        if (url.pathname === "/api/test") {
            return new Response(
                JSON.stringify({
                    status: "ok",
                    message: "WiskundeCoach backend werkt!"
                }),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        // AI-chat
        if (url.pathname === "/api/chat" && request.method === "POST") {
            try {
                const body = await request.json();
                const question = body.question;

                if (!question) {
                    return new Response(
                        JSON.stringify({
                            error: "Geen vraag ontvangen."
                        }),
                        {
                            status: 400,
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                    );
                }

                const systemPrompt = `
Je bent WiskundeCoach, een vriendelijke Nederlandse AI-wiskundecoach
voor middelbare scholieren.

Je belangrijkste doel is de leerling te helpen ZELF de oplossing te vinden.

Regels:
- Vraag wat de leerling al geprobeerd heeft als dat nog niet duidelijk is.
- Geef maximaal één kleine hint tegelijk.
- Geef niet meteen de volledige oplossing.
- Laat de leerling zelf de volgende stap bedenken.
- Controleer berekeningen zorgvuldig.
- Gebruik Nederlandse wiskundeterminologie.
- Pas je taal aan aan een middelbare scholier.
- Wees geduldig, positief en duidelijk.
- Als de leerling een fout maakt, leg rustig uit waar de denkstap fout gaat.
- Geef pas een volledige uitwerking als dat echt nodig is of als de leerling
  daar expliciet om vraagt.
`;

                const response = await env.AI.run(
                    "@cf/meta/llama-3.1-8b-instruct-fp8-fast",                    {
                        messages: [
                            {
                                role: "system",
                                content: systemPrompt
                            },
                            {
                                role: "user",
                                content: question
                            }
                        ]
                    }
                );

                return new Response(
                    JSON.stringify({
                        answer: response.response
                    }),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

            } catch (error) {
                return new Response(
                    JSON.stringify({
                        error: "Er ging iets mis met de AI.",
                        details: error.message
                    }),
                    {
                        status: 500,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
            }
        }

        // Alle andere verzoeken naar de website
        return env.ASSETS.fetch(request);
    }
};