const Home = () => {
  return (
    <>
      <div
        className="container text-center
      "
      >
        <p>Sử dụng API từ trang web https://reqres.in/ để tạo website.</p>
        <p>Sử dụng thư viện React để tạo một màn hình website cơ bản : </p>
        <ul>
          <li style={{ listStyleType: "none" }}>1. Đăng nhập</li>
          <li style={{ listStyleType: "none" }}>2. Thêm User</li>
          <li style={{ listStyleType: "none" }}>3. Sửa User</li>
          <li style={{ listStyleType: "none" }}>4. Xóa User</li>
          <li style={{ listStyleType: "none" }}>5. Hiển thị tất cả User</li>
          <li style={{ listStyleType: "none" }}>6. Tìm kiếm User theo Email</li>
          <li style={{ listStyleType: "none" }}>
            7. Sắp xếp theo FirstName, Id
          </li>
          <li style={{ listStyleType: "none" }}>8. Import User từ file .csv</li>
          <li style={{ listStyleType: "none" }}>9. Export User từ file .csv</li>
        </ul>
      </div>
    </>
  );
};

export default Home;
