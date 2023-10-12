// Lấy tham chiếu đến nút kích hoạt, lớp phủ và form ẩn
const showFormButton = document.getElementById("showFormButton");
const overlay = document.getElementById("overlay");
const hiddenForm = document.getElementById("hiddenForm");
const hiddenForm2 = document.getElementById("hiddenForm2");
const formContainer = document.getElementById('formContainer');
const Edit = document.getElementById('Edit');

// Thêm sự kiện click cho nút kích hoạt
showFormButton.addEventListener("click", function() {
    // Hiển thị lớp phủ và form
    overlay.style.display = "block";
    hiddenForm.style.display = "block";
    hiddenForm.classList.add('slide-down');
});
overlay.addEventListener("click", function() {
    // Hiển thị lớp phủ và form
    overlay.style.display = "none";
    hiddenForm.style.display = "none";
});

// Lấy tham chiếu đến nút "Close"
const closeFormButton = document.getElementById("closeFormButton");

// Thêm sự kiện click cho nút "Close" để ẩn form
closeFormButton.addEventListener("click", function() {
    // Ẩn lớp phủ và form
    overlay.style.display = "none";
    hiddenForm.style.display = "none";
    hiddenForm.classList.add('slide-down');
});


function formatDateInput(inputId) {
    const input = document.getElementById(inputId);
    input.addEventListener('change', () => {
        if (input.value) {
            const dateParts = input.value.split('-');
            const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            input.value = formattedDate;
        }
    });
}
formatDateInput('startDate');
formatDateInput('endDate');