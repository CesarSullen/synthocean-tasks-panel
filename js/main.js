const columns = document.querySelectorAll(".column-body");
let draggedCard = null;

// Function to update task counts per column
function updateTaskCounts() {
	columns.forEach((column) => {
		const columnElement = column.parentElement;
		const countEl = columnElement.querySelector(".task-count");
		countEl.textContent = column.children.length;
	});
}

// Make all task cards draggable
document.querySelectorAll(".task-card").forEach((card) => {
	card.setAttribute("draggable", true);

	card.addEventListener("dragstart", (e) => {
		draggedCard = card; // Store the card being dragged
		card.style.opacity = "0.5";
	});

	card.addEventListener("dragend", (e) => {
		draggedCard = null; // Clear reference
		card.style.opacity = "1";
	});
});

// Drag & Drop functionality for columns
columns.forEach((column) => {
	column.addEventListener("dragover", (e) => {
		e.preventDefault(); // Allow drop
		column.style.background = "rgba(255, 255, 255, 0.1)";
	});

	column.addEventListener("dragleave", (e) => {
		column.style.background = "transparent";
	});

	column.addEventListener("drop", (e) => {
		e.preventDefault();
		if (!draggedCard) return;

		column.appendChild(draggedCard); // Move the card
		column.style.background = "transparent";

		// Update select to match new column
		const newStatus = column.parentElement.classList.contains("pending-column")
			? "pending"
			: column.parentElement.classList.contains("inprogress-column")
			? "inprogress"
			: "completed";
		const select = draggedCard.querySelector("select.action-btn");
		select.value = newStatus;

		updateTaskCounts(); // Update counters
	});
});

// Move card when select changes
document.querySelectorAll("select.action-btn").forEach((select) => {
	select.addEventListener("change", (e) => {
		const card = select.closest(".task-card");
		const newValue = select.value;

		let targetColumn;
		if (newValue === "pending")
			targetColumn = document.querySelector(".pending-column .column-body");
		else if (newValue === "inprogress")
			targetColumn = document.querySelector(".inprogress-column .column-body");
		else
			targetColumn = document.querySelector(".completed-column .column-body");

		targetColumn.appendChild(card);
		updateTaskCounts();
	});
});

// Initialize task counts on page load
updateTaskCounts();
