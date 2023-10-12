function deleteUser(userId) {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
        fetch(`/admin/users/delete/${userId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi khi xóa');
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
                location.reload(); // Tải lại trang sau khi xóa thành công
            })
            .catch(error => {
                console.error(error);
                alert('Đã có lỗi xảy ra.');
            });
    }
}