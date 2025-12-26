"use client";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { querySearchApi } from "@/utils/api/apis";
import { Loader2, Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function HeaderSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  if (pathname === "/") return null;

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    setIsSearching(true);
    try {
      const res = await querySearchApi({ searchValue: searchValue.trim() });
      const data = res.data;

      if (data.block) {
        router.push(`/block/${data.block.block}`);
      } else if (data.transaction) {
        router.push(`/tx?id=${data.transaction.id}`);
      } else if (data.utxo) {
        router.push(`/utxo/${data.utxo.digest || searchValue.trim()}`);
      } else if (data.input) {
        router.push(`/utxo/${searchValue.trim()}`);
      } else if (data.output) {
        router.push(`/utxo/${searchValue.trim()}`);
      } else {
        toast({
          title: "No results found",
          description: "Please check your search query.",
          variant: "destructive",
        });
      }
      setSearchValue("");
    } catch (error) {
      console.error(error);
      toast({
        title: "Search failed",
        description: "An error occurred while searching.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative sm:w-[500px]">
      {isSearching ? (
        <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
      ) : (
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}
      <Input
        placeholder="Search block, transaction hash, or UTXO"
        className="pl-9 h-9 rounded-full text-sm"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isSearching}
      />
    </div>
  );
}
