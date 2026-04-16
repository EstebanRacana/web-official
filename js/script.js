 src="https://embed.twitch.tv/embed/v1.js"
 let embedCreado = false;
 
function mostrarVivo(datos) {
document.getElementById("stream-embed").style.display = "block";
document.getElementById("offline-card").style.display = "none";
document.getElementById("live-dot").classList.add("en-vivo");
document.getElementById("live-label").textContent ="LIVE — " + datos.viewer_count.toLocaleString("es-AR") + " espectadores";
 if (!embedCreado) {
new Twitch.Embed("stream-embed", {
                    width: "100%",
                    height: "100%",
                    channel: STREAMER,
                    layout: "video",
                    autoplay: true,
                    parent: [DOMINIO]
                });
                embedCreado = true;
            }
        }
 
        function mostrarOffline() {
            document.getElementById("stream-embed").style.display = "none";
            document.getElementById("offline-card").style.display = "flex";
            document.getElementById("live-dot").classList.remove("en-vivo");
            document.getElementById("live-label").textContent = "LIVE";
        }
 
        async function verificarEstado() {
            if (TOKEN === "TU_ACCESS_TOKEN") {
                mostrarOffline();
                return;
            }
 
            try {
                const res = await fetch(
                    `https://api.twitch.tv/helix/streams?user_login=${STREAMER}`,
                    {
                        headers: {
                            "Client-ID": CLIENT_ID,
                            "Authorization": `Bearer ${TOKEN}`
                        }
                    }
                );
 
                const json = await res.json();
 
                if (json.data && json.data.length > 0) {
                    mostrarVivo(json.data[0]);
                } else {
                    mostrarOffline();
                }
            } catch (err) {
                console.warn("Error al verificar Twitch:", err);
                mostrarOffline();
            }
        }
 
        verificarEstado();
        setInterval(verificarEstado, 120_000);
