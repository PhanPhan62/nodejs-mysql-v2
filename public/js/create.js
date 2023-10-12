// Lấy tham chiếu đến nút kích hoạt, lớp phủ và form ẩn
const showFormButton = document.getElementById("showFormButton");
const overlay = document.getElementById("overlay");
const hiddenForm = document.getElementById("hiddenForm");
const formContainer = document.getElementById('formContainer');

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

// Thêm sự kiện click cho lớp phủ để ẩn form khi người dùng bấm ra ngoài form
// overlay.addEventListener("click", function () {
//   // Ẩn lớp phủ và form
// //   overlay.style.display = "none";
//   overlay.style.display = "none";
// });
// Lấy tham chiếu đến nút "Close"
const closeFormButton = document.getElementById("closeFormButton");

// Thêm sự kiện click cho nút "Close" để ẩn form
closeFormButton.addEventListener("click", function() {
    // Ẩn lớp phủ và form
    overlay.style.display = "none";
    hiddenForm.style.display = "none";
    hiddenForm.classList.add('slide-down');
    // Đợi khi hiệu ứng hoàn thành rồi mới ẩn form container

});


// // Rest of your JavaScript code for showing the form and overlay...

// document.addEventListener('DOMContentLoaded', function() {
//     const formContainer = document.getElementById('formContainer');
//     const overlay = document.getElementById('overlay');
//     const showFormButton = document.getElementById('showFormButton');
//     const closeFormButton = document.getElementById('closeFormButton');

//     showFormButton.addEventListener('click', () => {
//         formContainer.style.display = 'block';
//         overlay.style.display = 'block';
//         formContainer.classList.add('slide-down');
//     });

//     closeFormButton.addEventListener('click', () => {
//         formContainer.classList.remove('slide-down');
//         overlay.style.display = 'none';

//         setTimeout(() => {
//             formContainer.style.display = 'none';
//         }, 300); // Thời gian phù hợp với hiệu ứng CSS slide-down
//     });
// });