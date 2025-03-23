export const adminMenu = [
  {
    //hệ thống
    name: "Quản lý người dùng",
    menus: [
      {
        name: "Quản lý khách hàng",
        link: "/system/customer-manage",
      },
      {
        name: "Quản lý quản trị viên",
        link: "/system/admin-manage",
      },
    ],
  },
  {
    name: "Quản lý sản phẩm",
    menus: [
      {
        name: "Thêm/xóa sản phẩm",
        link: "/system/product-manage",
      },
      {
        name: "Chỉnh sửa sản phẩm",
        link: "/system/product-update",
      },
    ],
  },
  {
    name: "Quản lý đơn hàng",
    menus: [
      {
        name: "Đơn hàng chờ xác nhận",
        link: "/system/order-checking",
      },
      {
        name: "Đơn hàng chờ giao",
        link: "/system/order-confirm",
      },
      {
        name: "Đơn hàng đang giao",
        link: "/system/order-delivering",
      },
      {
        name: "Đơn hàng đã hoàn thành",
        link: "/system/order-done",
      },
      {
        name: "Đơn hàng yêu cầu hủy",
        link: "/system/order-req-cancel",
      },
      {
        name: "Đơn hàng đã hủy",
        link: "/system/order-canceled",
      },
    ],
  },
  {
    //hệ thống
    name: "Thống kê",
    menus: [
      // {
      //   name: "menu.system.system-administrator.user-manage",
      //   link: "/system/user-manage",
      // },

      {
        name: "Thống kê sản phẩm",
        link: "/system/statistic-product",
      },

      {
        name: "Thống kê đơn hàng",
        link: "/system/statistic-order",
      },
    ],
  },
];
