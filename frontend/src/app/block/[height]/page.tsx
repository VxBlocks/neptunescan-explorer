"use client";
import BlockHashInfoTable from "@/components/block/table/block-hash-info-table";
import BlockIOTable from "@/components/block/table/block-io-table";
import BlockTransactionTable from "@/components/block/table/block-transaction-table";
import { requestBlockInfoByHash } from "@/store/block/block-slice";
import { useRpcBlockData } from "@/store/block/hooks";
import { useAppDispatch } from "@/store/hooks";
import { numberConverTo } from "@/utils/math-format";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Block() {
  const params = useParams();
  const height = params.height as string;
  const dispatch = useAppDispatch();

  const rpcBlock = useRpcBlockData();
  useEffect(() => {
    if (height) {
      dispatch(requestBlockInfoByHash({ hash: height }));
    }
  }, [height]);

  useEffect(() => {
    if (rpcBlock && rpcBlock.digest) {
      document.title = `Block Height ${numberConverTo(
        rpcBlock.height
      )} - Neptune Privacy Explorer`;
    }
  }, [rpcBlock]);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <BlockHashInfoTable hash={height ?? ""} />
        <BlockTransactionTable />
        <BlockIOTable />
      </div>
    </div>
  );
}
