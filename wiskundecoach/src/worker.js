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

        // Alle andere verzoeken naar de website
        return env.ASSETS.fetch(request);
    }
};