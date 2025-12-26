import NetworkContent from "../home/network-content";
import HeaderSearch from "./header-search";
import React from "react";

export default function ExploreHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="hidden sm:flex sm:justify-end flex-row w-full px-[30px] flex-nowrap my-[10px] gap-4">
        <HeaderSearch />
        <NetworkContent />
      </div>
      {children}
    </>
  );
}
