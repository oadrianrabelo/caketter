import Swal from "sweetalert2";

export const Notification = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1300,
  timerProgressBar: true,
  didOpen: (notification) => {
    notification.addEventListener("mouseenter", Swal.stopTimer);
    notification.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
