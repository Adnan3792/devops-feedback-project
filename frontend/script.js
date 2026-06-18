const API_URL = "http://localhost:3001";

window.onload = loadFeedback;

async function submitFeedback() {

	    const name = document.getElementById("name").value;
	    const message = document.getElementById("message").value;

	    await fetch(`${API_URL}/feedback`, {
		            method: "POST",
		            headers: {
				                "Content-Type": "application/json"
				            },
		            body: JSON.stringify({
				                name,
				                message
				            })
		        });

	    document.getElementById("name").value = "";
	    document.getElementById("message").value = "";

	    loadFeedback();
}

async function loadFeedback() {

	    const response = await fetch(`${API_URL}/feedback`);

	    const data = await response.json();

	    let html = "";

	    data.forEach(item => {

		            html += `
			            <div class="feedback">
				                <strong>${item.name}</strong>
						            <br>
							                ${item.message}
									        </div>
										        `;
		        });

	    document.getElementById("feedback-list").innerHTML = html;
}
