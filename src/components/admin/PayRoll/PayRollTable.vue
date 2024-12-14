<script setup>
const props = defineProps({
  listBangLuong: Array,
  currentPage: Number,
  pageSize: Number,
});
</script>

<template>
  <div class="table-responsive">
    <table class="table table-striped table-bordered text-center text-nowrap" cellspacing="0">
      <thead class="">
        <!-- Tiêu đề bảng -->
        <tr>
          <th scope="col" rowspan="2" class="align-middle">STT</th>
          <th scope="col" rowspan="2" class="align-middle">Mã nhân viên</th>
          <th scope="col" rowspan="2" class="align-middle">Họ tên</th>
          <th scope="col" rowspan="2" class="align-middle">Chức vụ</th>
          <th scope="col" rowspan="2" class="align-middle">Lương cơ bản</th>
          <th scope="col" rowspan="2" class="align-middle">Hệ số lương</th>
          <th scope="col" rowspan="2" class="align-middle">Số công</th>
          <th scope="col" rowspan="2" class="align-middle">Lương thưởng</th>
          <th scope="colgroup" colspan="3">Phụ cấp</th>
          <th scope="col" rowspan="2" class="align-middle">Vi phạm</th>
          <th scope="col" rowspan="2" class="align-middle">Tạm ứng</th>
          <th scope="col" rowspan="2" class="align-middle">Thực lãnh</th>
        </tr>
        <tr>
          <th scope="col">Tiền ăn trưa</th>
          <th scope="col">Tiền xăng</th>
          <th scope="col">Tiền điện thoại</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="listBangLuong.length === 0" style="text-align: center; font-style: italic">
                    <td colspan="16">Không tìm thấy nhân viên</td>
                </tr>
        <!-- Dữ liệu bảng -->
        <tr v-for="(item, index) in listBangLuong" :key="index">
          <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
          <td>{{ item.maNhanVien }}</td>
          <td>{{ item.hoTen }}</td>
          <td>{{ item.chucVu }}</td>
          <td>{{ item.luongCoBan }}</td>
          <td>{{ item.heSoLuong }}</td>
          <td>{{ item.soCong }}</td>
          <td>{{ item.luongThuong }}</td>
          <td>{{ item.phuCap.tienAnTrua }}</td>
          <td>{{ item.phuCap.tienXang }}</td>
          <td>{{ item.phuCap.tienDienThoai }}</td>
          <td>{{ item.khauTru.viPham }}</td>
          <td>{{ item.khauTru.tamUng }}</td>
          <td>{{ item.thucLanh }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
