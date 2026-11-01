document.addEventListener("DOMContentLoaded", () => {
    // Typing Effect in Header
    const typedTextElement = document.getElementById("typed-text");
    const textToType = "cat /etc/motd --sys-status";
    let index = 0;

    function typeWriter() {
        if (index < textToType.length) {
            typedTextElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, 70);
        }
    }
    typeWriter();

    // Tag Filtering
    const tagButtons = document.querySelectorAll(".tag-btn");
    const postCards = document.querySelectorAll(".post-card");

    tagButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tagButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterTag = btn.getAttribute("data-tag");

            postCards.forEach(card => {
                const cardTags = card.getAttribute("data-tags").split(" ");
                if (filterTag === "all" || cardTags.includes(filterTag)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // CLI Shell Emulator
    const cliInput = document.getElementById("cli-input");
    const cliOutput = document.getElementById("cli-output");

    const commands = {
        help: "Available commands: <br> - <span class='highlight'>help</span>: Show this help message<br> - <span class='highlight'>ls</span>: List all blog posts<br> - <span class='highlight'>clear</span>: Clear terminal screen<br> - <span class='highlight'>status</span>: Check system status<br> - <span class='highlight'>matrix</span>: Trigger matrix mode",
        ls: "1. Architecting Sovereign Cloud Platforms in Regulated Environments<br>2. Zero-Trust Networking in Multi-Tenant Kubernetes<br>3. Infrastructure as Code: Hardening Terraform Modules",
        status: "SYSTEM_STATUS: ALL SERVICES OPERATIONAL<br>NODE_COUNT: 42<br>LATENCY: 12ms",
        matrix: "Wake up, Neo... The Matrix has you."
    };

    cliInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const input = cliInput.value.trim().toLowerCase();
            cliInput.value = "";

            const p = document.createElement("p");
            p.innerHTML = `<span class="prompt">root@nextstopcloud:~#</span> ${input}`;
            cliOutput.appendChild(p);

            const response = document.createElement("p");
            if (input === "clear") {
                cliOutput.innerHTML = "";
            } else if (commands[input]) {
                response.innerHTML = commands[input];
                cliOutput.appendChild(response);
            } else if (input !== "") {
                response.innerHTML = `Command not found: <span class="highlight">${input}</span>. Type 'help' for available commands.`;
                cliOutput.appendChild(response);
            }

            cliOutput.scrollTop = cliOutput.scrollHeight;
        }
    });
});