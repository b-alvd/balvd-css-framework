async function loadComponents() {
    try {
        const response = await fetch("./src/scripts/components_config.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        injectComponents(data);
    } catch (error) {
        console.error("Failed to load components:", error);
    }
}

function injectComponents(data) {
    const headersContainer = document.getElementById("header-container");
    const footersContainer = document.getElementById("footer-container");
    const buttonsContainer = document.getElementById("button-container");

    data.forEach(component => {
        // Component div
        const componentElement = document.createElement("div");
        componentElement.classList.add("component");
        componentElement.setAttribute("data-id", component.id);
        // Component name
        const componentElementName = document.createElement("h4");
        componentElementName.classList.add("component__name");
        componentElementName.textContent = component.name
        // Component image
        const componentElementImage = document.createElement("img");
        componentElementImage.src = component.image;
        componentElementImage.alt = component.name;
        // Component description
        const componentElementDescription = document.createElement("p");
        componentElementDescription.classList.add("component__description");
        componentElementDescription.textContent = component.description;
        // Component difficulty
        const componentElementDifficulty = document.createElement("div");
        componentElementDifficulty.classList.add("component__difficulty");
        componentElementDifficulty.innerHTML = `
            <p>Difficulty:</p>
            <div class="stars">
                ${generateStars(component.difficulty)}
            </div>
        `;
        // Component link
        const componentElementLink = document.createElement("a");
        componentElementLink.href = "#";
        componentElementLink.textContent = "View component...";

        componentElement.appendChild(componentElementName);
        componentElement.appendChild(componentElementImage);
        componentElement.appendChild(componentElementDescription);
        componentElement.appendChild(componentElementDifficulty);
        componentElement.appendChild(componentElementLink);

        if (headersContainer && component.type === "header") {
            headersContainer.appendChild(componentElement);
        } else if (footersContainer && component.type === "footer") {
            footersContainer.appendChild(componentElement);
        } else if (buttonsContainer && component.type === "button") {
            buttonsContainer.appendChild(componentElement);
        } else {
            console.warn(`No container found for component type: ${component.type}`);
        }        
    })
}

function generateStars(stars) {
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        starsHtml += i < stars
            ? `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5245 3.46353C11.6741 3.00287 12.3259 3.00287 12.4755 3.46353L14.1329 8.56434C14.1998 8.77035 14.3918 8.90983 14.6084 8.90983H19.9717C20.4561 8.90983 20.6575 9.52964 20.2656 9.81434L15.9266 12.9668C15.7514 13.0941 15.678 13.3198 15.745 13.5258L17.4023 18.6266C17.552 19.0873 17.0248 19.4704 16.6329 19.1857L12.2939 16.0332C12.1186 15.9059 11.8814 15.9059 11.7061 16.0332L7.3671 19.1857C6.97524 19.4704 6.448 19.0873 6.59768 18.6266L8.25503 13.5258C8.32197 13.3198 8.24864 13.0941 8.07339 12.9668L3.73438 9.81434C3.34253 9.52964 3.54392 8.90983 4.02828 8.90983H9.39159C9.6082 8.90983 9.80018 8.77035 9.86712 8.56434L11.5245 3.46353Z" fill="#F9FF00"/>
                </svg>`
            : `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5245 3.46353C11.6741 3.00287 12.3259 3.00287 12.4755 3.46353L14.1329 8.56434C14.1998 8.77035 14.3918 8.90983 14.6084 8.90983H19.9717C20.4561 8.90983 20.6575 9.52964 20.2656 9.81434L15.9266 12.9668C15.7514 13.0941 15.678 13.3198 15.745 13.5258L17.4023 18.6266C17.552 19.0873 17.0248 19.4704 16.6329 19.1857L12.2939 16.0332C12.1186 15.9059 11.8814 15.9059 11.7061 16.0332L7.3671 19.1857C6.97524 19.4704 6.448 19.0873 6.59768 18.6266L8.25503 13.5258C8.32197 13.3198 8.24864 13.0941 8.07339 12.9668L3.73438 9.81434C3.34253 9.52964 3.54392 8.90983 4.02828 8.90983H9.39159C9.6082 8.90983 9.80018 8.77035 9.86712 8.56434L11.5245 3.46353Z" fill="#D1D1D1"/>
                </svg>`;
    }
    return starsHtml;
}

loadComponents();