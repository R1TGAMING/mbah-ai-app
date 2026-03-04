import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupTextarea,
    InputGroupButton,
} from "@/components/ui/input-group";
import { ArrowUpIcon, ChevronDownIcon } from "lucide-react";
import Conversation, {
    ConversationContent,
    ConversationEmptyState,
    ConversationScrollButton,
} from "@/components/ai/conversation";
import Message, { MessageContent } from "@/components/ai/message";
import { useState, useRef } from "react";
import fetchGemini from "@/api/fetchGemini";
import { Spinner } from "@/components/ui/spinner";
import ReactMarkdown from "react-markdown";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import models from "../../models.json";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type ChatMessage = {
    id: string;
    from: "user" | "assistant";
    text: string;
};

const Chat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [apiKey, setApiKey] = useState("");

    const handleSaveChanges = () => {
        if (!selectedModel || !apiKey) {
            return alert("Please provide a models and api key");
        }

        if (apiKey.length < 10) {
            return alert("Please provide a valid api key");
        }
        setOpenDialog(false);
    };

    const handleModelChange = (
        e: React.MouseEvent<HTMLDivElement>,
        model: string,
    ) => {
        e.preventDefault();

        setSelectedModel(model);
        setOpenDialog(true);
    };

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;
        if (!selectedModel || !apiKey) {
            return alert("Please provide a models and api key");
        }
        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            from: "user",
            text: trimmed,
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const reply = await fetchGemini(trimmed, selectedModel, apiKey);
            const aiMessage: ChatMessage = {
                id: crypto.randomUUID(),
                from: "assistant",
                text:
                    reply ?? "Maaf, tidak ada jawaban atau terjadi kesalahan.",
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    from: "assistant",
                    text: "Terjadi error. Coba lagi.",
                },
            ]);

            
        } finally {
            setIsLoading(false);
            textareaRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <SidebarProvider className="bg-dark h-screen w-screen">
            <div className="flex h-screen w-full">
                <AppSidebar />

                <main className="flex flex-1 flex-col relative overflow-hidden min-h-0">
                    <div className="absolute top-4 left-4 z-10">
                        <SidebarTrigger className="text-white" />
                    </div>

                    {messages.length === 0 ? (
                        <ConversationEmptyState description="ketik untuk mengobrol dengan AI" />
                    ) : (
                        <Conversation className="relative min-h-0 flex-1 p-4 overflow-y-hidden [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                            <ConversationContent>
                                {messages.map((msg) => (
                                    <Message
                                        from={msg.from}
                                        key={msg.id}
                                        className="text-white"
                                    >
                                        <MessageContent>
                                            {msg.from === "assistant" ? (
                                                <div
                                                    className="prose prose-invert prose-sm max-w-none
                                                    prose-headings:text-white prose-headings:font-bold
                                                    prose-p:text-white prose-p:leading-relaxed
                                                    prose-strong:text-white prose-strong:font-bold
                                                    prose-code:bg-white/10 prose-code:text-green-300 prose-code:px-1 prose-code:rounded
                                                    prose-pre:bg-white/10 prose-pre:rounded-lg
                                                    prose-li:text-white prose-ul:text-white prose-ol:text-white
                                                    prose-a:text-blue-400"
                                                >
                                                    <ReactMarkdown>
                                                        {msg.text}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                msg.text
                                            )}
                                        </MessageContent>
                                    </Message>
                                ))}

                                {isLoading && (
                                    <Message
                                        from="assistant"
                                        className="text-white"
                                    >
                                        <MessageContent className="flex flex-row items-center gap-2">
                                            <Spinner />
                                            <span className="animate-pulse">
                                                AI sedang mengetik...
                                            </span>
                                        </MessageContent>
                                    </Message>
                                )}
                            </ConversationContent>
                            <ConversationScrollButton />
                        </Conversation>
                    )}

                    <div className="flex items-end justify-center pb-8 px-4">
                        <div className="w-full max-w-2xl">
                            <InputGroup>
                                <InputGroupTextarea
                                    ref={textareaRef}
                                    placeholder="Chat... (Enter untuk kirim, Shift+Enter untuk baris baru)"
                                    className="text-white max-h-24 overflow-hidden"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isLoading}
                                />
                                <InputGroupAddon
                                    align="block-end"
                                    className="mt-2 justify-between"
                                >
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button
                                                variant="default"
                                                className="bg-[#1e1e1e] hover:bg-[#1b1b1b] max-w-40"
                                            >
                                                {selectedModel
                                                    ? selectedModel
                                                    : "Select Models"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-[#1e1e1e] text-white">
                                            <DropdownMenuGroup>
                                                <DropdownMenuLabel>
                                                    Google
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />

                                                {models.google.map((model) => (
                                                    <DropdownMenuItem
                                                        key={model}
                                                        onClick={(e) =>
                                                            handleModelChange(
                                                                e,
                                                                model,
                                                            )
                                                        }
                                                    >
                                                        {model}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuGroup>

                                            <DropdownMenuItem className=" focus:bg-[#1b1b1b] focus:text-white"></DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <InputGroupButton
                                        className="rounded-full cursor-pointer"
                                        size="icon-sm"
                                        variant="default"
                                        type="button"
                                        onClick={handleSend}
                                        disabled={isLoading || !input.trim()}
                                    >
                                        <ArrowUpIcon />
                                        <span className="sr-only">Send</span>
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </div>

                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogContent className="bg-dark">
                            <DialogHeader className="text-white">
                                <DialogTitle>API Key</DialogTitle>

                                <Input
                                    type="password"
                                    minLength={10}
                                    placeholder="API Key..."
                                    className="text-white"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                />
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer"
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    className="bg-[#1e1e1e] hover:bg-[#1b1b1b] cursor-pointer "
                                    type="submit"
                                    onClick={handleSaveChanges}
                                >
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default Chat;
