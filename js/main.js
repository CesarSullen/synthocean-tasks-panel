const columns = document.querySelectorAll(".column-body");
let draggedCard = null;

// Update task counts for each column
function updateTaskCounts() {
	columns.forEach((column) => {
		const columnElement = column.parentElement;
		const countEl = columnElement.querySelector(".task-count");
		countEl.textContent = column.children.length;
	});
}

// Make cards draggable
document.querySelectorAll(".task-card").forEach((card) => {
	card.setAttribute("draggable", true);

	card.addEventListener("dragstart", () => {
		draggedCard = card;
		card.style.opacity = "0.5";
	});

	card.addEventListener("dragend", () => {
		draggedCard = null;
		card.style.opacity = "1";
	});
});

// Drag & Drop behavior
columns.forEach((column) => {
	column.addEventListener("dragover", (e) => {
		e.preventDefault();
		column.style.background = "rgba(255, 255, 255, 0.1)";
	});

	column.addEventListener("dragleave", () => {
		column.style.background = "transparent";
	});

	column.addEventListener("drop", () => {
		if (!draggedCard) return;

		column.appendChild(draggedCard);
		column.style.background = "transparent";

		// Detect the new column status
		const newStatus = column.parentElement.classList.contains("pending-column")
			? "pending"
			: column.parentElement.classList.contains("inprogress-column")
			? "inprogress"
			: "completed";

		// Update the custom select text to reflect the new column
		const customSelect = draggedCard.querySelector(".custom-select");
		customSelect.querySelector(".selected").textContent =
			newStatus === "pending"
				? "Pending"
				: newStatus === "inprogress"
				? "In Progress"
				: "Completed";

		updateTaskCounts();
	});
});

// Initialize custom selects
document.querySelectorAll(".custom-select").forEach((select) => {
	const selected = select.querySelector(".selected");
	const optionsContainer = select.querySelector(".options");
	const options = optionsContainer.querySelectorAll("li");

	// Toggle options dropdown
	selected.addEventListener("click", (e) => {
		e.stopPropagation();
		document
			.querySelectorAll(".custom-select")
			.forEach((el) => el.classList.remove("open"));
		select.classList.toggle("open");
	});

	// Handle option click
	options.forEach((option) => {
		option.addEventListener("click", (e) => {
			const value = option.getAttribute("data-value");
			selected.textContent = option.textContent;
			select.classList.remove("open");

			// Move the card to the correct column
			const card = select.closest(".task-card");
			let targetColumn;

			if (value === "pending")
				targetColumn = document.querySelector(".pending-column .column-body");
			else if (value === "inprogress")
				targetColumn = document.querySelector(
					".inprogress-column .column-body"
				);
			else
				targetColumn = document.querySelector(".completed-column .column-body");

			targetColumn.appendChild(card);
			updateTaskCounts();
		});
	});
});

// Close dropdowns if user clicks outside
document.addEventListener("click", () => {
	document
		.querySelectorAll(".custom-select")
		.forEach((el) => el.classList.remove("open"));
});

// Initialize task counts
updateTaskCounts();
