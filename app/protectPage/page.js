'use client'
import Layouts from "@/components/Layouts";
import Link from "next/link";
import React from "react";

function ProtectPage(props) {
  return (
    <Layouts>
      <div className="min-h-screen">
        <p>bạn chưa đăng nhập, vui lòng đăng nhập để xem đơn hàng đã đặt!</p>
        <Link href="/login" className="underline text-blue-600">Đăng nhập tại đây!</Link>
      </div>
    </Layouts>
  );
}

export default ProtectPage;
