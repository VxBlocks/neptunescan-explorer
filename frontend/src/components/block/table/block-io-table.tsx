import { useRpcBlockData } from "@/store/block/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "@/components/ui/copy-button";
import NavTextLink from "@/components/base/nav-text-link";

export default function BlockIOTable() {
  const rpcBlock = useRpcBlockData();

  if (!rpcBlock) return null;

  const hasInputs = rpcBlock.inputs && rpcBlock.inputs.length > 0;
  const hasOutputs = rpcBlock.outputs && rpcBlock.outputs.length > 0;

  if (!hasOutputs) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="shadow-sm border-muted">
        <CardHeader className="bg-muted/30 pb-4">
          <CardTitle className="text-lg font-bold">
            Input UTXOs ({rpcBlock.inputs?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {hasInputs ? (
            <div className="flex flex-col gap-2">
              {rpcBlock.inputs.map((input, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 p-2 bg-muted/20 rounded border"
                >
                  <span className="font-mono text-sm break-all">{input}</span>
                  <CopyButton value={input} />
                </div>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground text-sm italic">No inputs</span>
          )}
        </CardContent>
      </Card>
      {hasOutputs && (
        <Card className="shadow-sm border-muted">
          <CardHeader className="bg-muted/30 pb-4">
            <CardTitle className="text-lg font-bold">
              Output UTXOs ({rpcBlock.outputs.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              {rpcBlock.outputs.map((output, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 p-2 bg-muted/20 rounded border"
                >
                  <div className="flex flex-col gap-1">
                    {index === 0 && (
                      <span className="text-xs text-green-600 font-medium">Mining Reward</span>
                    )}
                    <NavTextLink href={`/utxo/${output}`} className="font-mono text-sm break-all">
                      {output}
                    </NavTextLink>
                  </div>
                  <CopyButton value={output} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
