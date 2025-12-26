import { useRpcBlockData } from "@/store/block/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "@/components/ui/copy-button";
import NavTextLink from "@/components/base/nav-text-link";

export default function BlockIOTable() {
  const rpcBlock = useRpcBlockData();

  if (!rpcBlock) return null;

  const hasInputs = rpcBlock.inputs && rpcBlock.inputs.length > 0;
  const hasOutputs = rpcBlock.outputs && rpcBlock.outputs.length > 0;
  const hasGuesserFees = rpcBlock.guesser_fee_utxo_digests && rpcBlock.guesser_fee_utxo_digests.length > 0;

  // Create a set for quick lookup of guesser fee UTXOs
  const guesserFeeSet = new Set(rpcBlock.guesser_fee_utxo_digests || []);

  // Separate coinbase outputs from guesser fee outputs
  const coinbaseOutputs = rpcBlock.outputs?.filter(output => !guesserFeeSet.has(output)) || [];

  if (!hasOutputs && !hasGuesserFees) return null;

  return (
    <div className="flex flex-col gap-4">
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
                    <NavTextLink href={`/utxo/${input}`} className="font-mono text-sm break-all">
                      {input}
                    </NavTextLink>
                    <CopyButton value={input} />
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground text-sm italic">No inputs</span>
            )}
          </CardContent>
        </Card>
        {coinbaseOutputs.length > 0 && (
          <Card className="shadow-sm border-muted">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="text-lg font-bold">
                Coinbase UTXOs ({coinbaseOutputs.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                {coinbaseOutputs.map((output, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2 p-2 bg-muted/20 rounded border"
                  >
                    <NavTextLink href={`/utxo/${output}`} className="font-mono text-sm break-all">
                      {output}
                    </NavTextLink>
                    <CopyButton value={output} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {hasGuesserFees && (
        <Card className="shadow-sm border-muted">
          <CardHeader className="bg-muted/30 pb-4">
            <CardTitle className="text-lg font-bold">
              Guesser Fee UTXOs ({rpcBlock.guesser_fee_utxo_digests.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {rpcBlock.guesser_fee_utxo_digests.map((digest, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 p-2 bg-purple-50 dark:bg-purple-950/30 rounded border border-purple-200 dark:border-purple-800"
                >
                  <NavTextLink href={`/utxo/${digest}`} className="font-mono text-sm break-all text-purple-700 dark:text-purple-300">
                    {digest}
                  </NavTextLink>
                  <CopyButton value={digest} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
