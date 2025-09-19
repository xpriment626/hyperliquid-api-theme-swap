"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronDown, CheckCircle2, Info, ShieldAlert, Sparkles, Zap, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Minimal inline helpers and progressive onboarding for empty state
const ApiMainContent = () => {
  const [wallets, setWallets] = useState<Array<{ name?: string; address: string; validUntil?: string }>>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [showChecklist, setShowChecklist] = useState(true);
  const [securityNoticeCollapsed, setSecurityNoticeCollapsed] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const collapsed = typeof window !== "undefined" && localStorage.getItem("api_security_notice_collapsed");
    if (collapsed === "true") setSecurityNoticeCollapsed(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("api_security_notice_collapsed", securityNoticeCollapsed ? "true" : "false");
  }, [securityNoticeCollapsed]);

  const handleFocusName = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => nameRef.current?.focus(), 300);
  };

  const randomHex = (len = 40) =>
    "0x" + Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join("");

  const handleGenerateBasic = () => {
    const addr = randomHex(40);
    setAddress(addr);
    setCurrentStep(2);
  };

  const handleGenerateNamed = () => {
    handleFocusName();
  };

  const handleAuthorize = () => {
    if (!address) return;
    // Simulate adding a pending wallet row
    const entry = { name: name || undefined, address, validUntil: "—" };
    setWallets([entry, ...wallets]);
    setCurrentStep(3);
  };

  const emptyState = wallets.length === 0;

  const Step = ({ step, label }: { step: number; label: string }) => {
    const active = currentStep === step;
    const done = currentStep > step;
    return (
      <div className="flex items-center gap-2">
        <div
          className={`h-7 w-7 rounded-full grid place-items-center text-sm font-medium border ${
            active ? "bg-primary text-primary-foreground border-primary" : done ? "bg-accent text-foreground border-border" : "bg-transparent text-text-secondary border-border"
          }`}
        >
          {done ? <CheckCircle2 className="h-4 w-4 text-success" /> : step}
        </div>
        <span className={`text-sm ${active ? "text-foreground" : "text-text-secondary"}`}>{label}</span>
      </div>
    );
  };

  const heroIllustration = useMemo(
    () => (
      <div className="relative h-20 w-20 rounded-xl bg-primary/15 grid place-items-center text-primary">
        <Sparkles className="h-8 w-8" />
      </div>
    ),
    []
  );

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto space-y-8" ref={topRef}>
        {/* Security Notice Banner */}
        {!securityNoticeCollapsed && (
          <Alert className="relative bg-accent border-border">
            <button
              type="button"
              aria-label="Dismiss security notice"
              onClick={() => setSecurityNoticeCollapsed(true)}
              className="absolute -top-3 -left-3 z-10 inline-grid place-items-center h-7 w-7 rounded-full text-text-secondary hover:text-foreground hover:bg-muted/50 transition-transform duration-200 hover:scale-110"
            >
              <X className="h-4 w-4" />
            </button>
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Security notice</AlertTitle>
            <AlertDescription>
              API wallets can execute trades with your capital. Only share credentials with trusted applications. Keys cannot be recovered if lost.
            </AlertDescription>
          </Alert>
        )}

        {/* Header */}
        <div>
          <h1 className="text-[32px] font-semibold text-text-primary mb-3">API</h1>
          <p className="text-base text-text-primary max-w-3xl leading-relaxed">
            API wallets (also known as agent wallets) can perform actions on behalf of your account without having withdrawal permissions. You must still use your account's public address for info requests.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="flex items-center gap-4">
          <Step step={1} label="Generate" />
          <div className="h-px flex-1 bg-border" />
          <Step step={2} label="Authorize" />
          <div className="h-px flex-1 bg-border" />
          <Step step={3} label="Save Key" />
        </div>

        {/* Prerequisites Checklist */}
        {showChecklist && (
          <Card className="p-4 border-border bg-card">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-secondary mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-medium text-foreground">Before you begin:</p>
                <ul className="list-disc pl-5 text-text-secondary space-y-1">
                  <li>Wallet connected with signing capability</li>
                  <li>Small amount of ETH for gas fees</li>
                  <li>Secure password manager ready for key storage</li>
                  <li className="text-destructive">API wallets cannot withdraw funds (trade only)</li>
                </ul>
              </div>
              <div className="ml-auto">
                <Button size="sm" variant="ghost" onClick={() => setShowChecklist(false)}>
                  Dismiss
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Form Row */}
        <TooltipProvider>
          <div className="flex flex-col xl:flex-row items-start gap-6">
            <div className="flex-1 w-full space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="api-wallet-name">API Wallet Name</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-text-secondary" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Optional: Give your wallet a memorable name (e.g., "TradingView Bot", "DCA Strategy"). Leave blank for a default unnamed wallet.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="api-wallet-name"
                  ref={nameRef}
                  type="text"
                  placeholder="The name for the API wallet, e.g. my_api_wallet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 bg-accent border-border placeholder:text-muted-foreground text-base rounded-md"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="api-wallet-address">Address of API wallet</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-text-secondary" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Auto-generated when you click "Generate". This will be your API wallet's unique identifier.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative w-full">
                  <Input
                    id="api-wallet-address"
                    type="text"
                    placeholder="Address of API wallet, e.g. 0x123..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-11 bg-accent border-border placeholder:text-muted-foreground text-base pr-44 rounded-md"
                  />
                  {/* Quick Actions Split Button */}
                  <div className="absolute inset-y-0 right-0 flex items-center gap-px pr-2">
                    <Button size="sm" className="h-8" onClick={handleGenerateBasic}>
                      Generate New Wallet
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-64">
                        <DropdownMenuItem onClick={handleGenerateBasic}>
                          Generate basic wallet (no name)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleGenerateNamed}>
                          Generate named wallet (focus name field)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setImportOpen(true)}>
                          Import existing configuration
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href="https://docs.hyperliquid.xyz/reference/api" target="_blank" rel="noreferrer">
                            View documentation
                          </a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Button
                  className="h-11 bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full md:w-auto shrink-0 px-5 text-sm font-medium rounded-md"
                  onClick={handleAuthorize}
                >
                  Authorize API Wallet
                </Button>
                <span className="text-xs text-text-secondary hidden md:inline-flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  Authorization prepares the wallet to trade, but cannot withdraw funds.
                </span>
              </div>
            </div>

            {/* Side panel: Limits & Use cases */}
            <div className="w-full xl:w-[360px] space-y-4">
              <Card className="p-4 border-border bg-card">
                <p className="text-sm font-medium mb-2">Available API Wallets</p>
                <div className="text-sm text-text-secondary space-y-1">
                  <div className="flex justify-between"><span>Unnamed</span><span>1 of 1 available</span></div>
                  <div className="flex justify-between"><span>Named</span><span>3 of 3 available</span></div>
                  <div className="flex justify-between"><span>Per subaccount</span><span>2 additional</span></div>
                </div>
              </Card>

              {/* Use Case Selector Cards */}
              <Card className="p-4 border-border bg-card">
                <p className="text-sm font-medium mb-3">Common integrations</p>
                <div className="space-y-3">
                  <details className="group">
                    <summary className="cursor-pointer text-sm text-foreground">Connect Trading Bot</summary>
                    <div className="mt-2 text-sm text-text-secondary">
                      Integrate with TradingView, Hummingbot, or custom strategies.
                      <ul className="list-disc pl-4 mt-2 space-y-1">
                        <li>Permissions: trade, read-only balances</li>
                        <li>Recommended: 30d validity, rotate keys quarterly</li>
                      </ul>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer text-sm text-foreground">Enable Copy Trading</summary>
                    <div className="mt-2 text-sm text-text-secondary">
                      Let platforms mirror your successful trades.
                      <ul className="list-disc pl-4 mt-2 space-y-1">
                        <li>Permissions: trade only</li>
                        <li>Recommended: per-subaccount isolation</li>
                      </ul>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer text-sm text-foreground">Build Custom Tools</summary>
                    <div className="mt-2 text-sm text-text-secondary">
                      Create your own trading interfaces and analytics.
                      <ul className="list-disc pl-4 mt-2 space-y-1">
                        <li>Permissions: trade, read market data</li>
                        <li>Recommended: narrow scope, monitor usage</li>
                      </ul>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer text-sm text-foreground">Connect to Terminal</summary>
                    <div className="mt-2 text-sm text-text-secondary">
                      Use professional terminals like Tealstreet.
                      <ul className="list-disc pl-4 mt-2 space-y-1">
                        <li>Permissions: trade</li>
                        <li>Recommended: short validity, rotate often</li>
                      </ul>
                    </div>
                  </details>
                </div>
              </Card>
            </div>
          </div>
        </TooltipProvider>

        {/* Import dialog */}
        <Dialog open={importOpen} onOpenChange={setImportOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Import existing configuration</DialogTitle>
              <DialogDescription>
                Paste your API wallet configuration JSON. This placeholder is for future implementation.
              </DialogDescription>
            </DialogHeader>
            <div className="text-sm text-text-secondary">
              Import flow coming soon.
            </div>
          </DialogContent>
        </Dialog>

        {/* Table + Empty State */}
        <div className="border-t border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-b-border hover:bg-transparent">
                <TableHead className="text-text-secondary font-normal text-sm pt-4">API Wallet Name</TableHead>
                <TableHead className="text-text-secondary font-normal text-sm pt-4">API Wallet Address</TableHead>
                <TableHead className="text-text-secondary font-normal text-sm pt-4">Valid Until</TableHead>
                <TableHead className="text-text-secondary font-normal text-sm pt-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emptyState ? (
                // Empty State Hero replacing rows
                <TableRow className="border-none hover:bg-transparent">
                  <TableCell colSpan={4} className="p-0">
                    <div className="py-16 flex flex-col items-center text-center gap-4">
                      {heroIllustration}
                      <h2 className="text-xl font-semibold">No API wallets configured</h2>
                      <p className="text-text-secondary max-w-xl">
                        API wallets let trading bots and external tools execute trades without accessing your funds
                      </p>
                      <div className="flex items-center gap-3">
                        <Button onClick={handleFocusName}>Create Your First API Wallet</Button>
                        <a
                          className="text-sm text-secondary hover:underline"
                          href="https://docs.hyperliquid.xyz/reference/api"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Learn about API wallets
                        </a>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                wallets.map((w, idx) => (
                  <TableRow key={idx} className="border-b-border">
                    <TableCell className="text-sm">{w.name || <span className="text-text-muted">Unnamed</span>}</TableCell>
                    <TableCell className="text-sm">{w.address}</TableCell>
                    <TableCell className="text-sm">{w.validUntil || "—"}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="secondary">Copy Key</Button>
                        <Button size="sm" variant="ghost">Revoke</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
};

export default ApiMainContent;