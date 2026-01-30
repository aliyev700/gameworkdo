"use client";

import { useState, useEffect, useRef } from "react";
import { FiMessageSquare, FiX, FiSend, FiCpu, FiHelpCircle } from "react-icons/fi";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I am GameBot 🤖. Ask me about stock, specific games, warranties, or store policies!", sender: "bot" }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    // ---------------------------------------------------------
    // THE BOT'S SUPER BRAIN 🧠
    // ---------------------------------------------------------
    const getBotResponse = (text: string) => {
        const lowerText = text.toLowerCase();

        // Helper to check for multiple keywords
        const contains = (keywords: string[]) => {
            return keywords.some(keyword => lowerText.includes(keyword));
        };

        // --- GREETINGS & BASICS ---
        if (contains(["hello", "hi", "hey", "sup", "yo"]))
            return "Greetings, Player 1! 👋 How can I help you level up today?";
        if (contains(["bye", "goodbye", "later"]))
            return "GG! Have a great day. 👋";
        if (contains(["who are you", "what are you"]))
            return "I am GameBot v2.0. I run on caffeine and high-performance code. ☕";
        if (contains(["thank", "thx"]))
            return "You're welcome! Happy gaming! 🎮";

        // --- SPECIFIC POPULAR GAMES ---
        if (contains(["gta", "grand theft auto"]))
            return "GTA V is in stock! If you're asking about GTA VI, we're all waiting patiently... pre-orders aren't open yet!";
        if (contains(["minecraft", "craft"]))
            return "We have Minecraft for all platforms. Looking for Minecoins or the Bedrock Edition?";
        if (contains(["cod", "call of duty", "warzone"]))
            return "Stay frosty! 🔫 We have the latest Call of Duty in stock (Modern Warfare & Black Ops).";
        if (contains(["fifa", "fc 24", "fc 25", "soccer", "football"]))
            return "EA Sports FC is available! Ready to hit the pitch? ⚽";
        if (contains(["mario", "zelda", "pokemon"]))
            return "Nintendo royalty! 👑 We have a huge selection of Switch exclusives in the 'Nintendo' section.";
        if (contains(["souls", "elden ring", "bloodborne", "sekiro"]))
            return "Prepare to die... a lot. ⚔️ We have the full FromSoftware catalog for those seeking a challenge.";
        if (contains(["fortnite", "vbuck", "v-buck"]))
            return "We don't sell the base game (it's free!), but we DO sell V-Bucks cards and exclusive skin bundles.";
        if (contains(["roblox", "robux"]))
            return "Oof! We stock Robux gift cards in various amounts. They make great gifts.";

        // --- HARDWARE & ACCESSORIES ---
        if (contains(["controller", "gamepad", "joycon", "stick drift"]))
            return "We sell DualSense (PS5), Xbox Wireless, and Joy-Cons. If you have stick drift, we also sell repair kits or replacements!";
        if (contains(["headset", "headphones", "audio", "mic"]))
            return "Hearing footsteps is key! 🎧 Check out our HyperX, SteelSeries, and Sony Pulse headsets.";
        if (contains(["ps5", "playstation"]))
            return "The PS5 is a beast. We stock the Disc, Digital, and the new 'Slim' models.";
        if (contains(["xbox", "series x", "series s"]))
            return "Power your dreams. We have both Series X (the fridge) and Series S (the toaster) in stock. 😉";
        if (contains(["switch", "nintendo console"]))
            return "Play at home or on the go. We stock the OLED, Standard, and Lite models.";
        if (contains(["pc", "graphics card", "gpu", "keyboard", "mouse"]))
            return "PC Master Race? 🖥️ We sell mechanical keyboards (Razer/Logitech) and high-performance mice.";

        // --- STORE SERVICES ---
        if (contains(["trade", "sell", "used", "pre-owned"]))
            return "Yes! We accept trade-ins for consoles and physical games. Bring them to our store for a quote.";
        if (contains(["repair", "fix", "broken"]))
            return "We offer console repair services for HDMI ports, disc drives, and overheating issues.";
        if (contains(["gift card", "voucher"]))
            return "We have gift cards for PlayStation Network, Xbox Live, Nintendo eShop, Steam, and our own store!";
        if (contains(["location", "address", "where are you"]))
            return "We are digital right now, but our HQ is located in the Gaming District (Level 1).";

        // --- POLICIES (Shipping, Returns) ---
        if (contains(["price", "cost", "expensive"]))
            return "Our prices are competitive! New AAA games are usually $60-$70, while indies and older titles are cheaper.";
        if (contains(["ship", "delivery", "long"]))
            return "Free shipping on orders over $100! 🚚 Standard delivery is 3-5 business days. Express is 1-2 days.";
        if (contains(["return", "refund", "money back"]))
            return "Physical games: 30-day return if unopened. Digital codes: Non-refundable once viewed/emailed.";
        if (contains(["warranty", "guarantee"]))
            return "New consoles come with a 1-year manufacturer warranty. We also offer extended protection plans.";

        // --- TECHNICAL HELP ---
        if (contains(["lag", "slow", "fps"]))
            return "Lag is the enemy! Check your internet connection, or try lowering your graphics settings if on PC.";
        if (contains(["install", "download"]))
            return "If a disc won't install, check for scratches. If a digital download is stuck, try restarting your router.";

        // --- GAMING CULTURE / EASTER EGGS ---
        if (contains(["best game", "recommend"]))
            return "Subjective! But 'The Witcher 3', 'Red Dead 2', and 'Baldur\'s Gate 3' are must-plays.";
        if (contains(["cake"]))
            return "The cake is a lie. 🍰 (Portal reference!)";
        if (contains(["arrow"]))
            return "I used to be an adventurer like you, then I took an arrow in the knee. 🏹";
        if (contains(["konami", "up up down down"]))
            return "Cheat code activated! 🚀 Just kidding, but you have great taste in classics.";
        if (contains(["gg", "good game"]))
            return "GG WP! (Good Game, Well Played)";
        if (contains(["noob", "n00b"]))
            return "Hey, we were all level 1 once. Keep practicing! 💪";

        // --- FALLBACK ---
        return "My dialogue tree doesn't have a response for that yet. 🌲 Try asking about 'Shipping', 'PS5', 'Zelda', or 'Returns'.";
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMsg: Message = { id: Date.now(), text: inputValue, sender: "user" };
        setMessages((prev) => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate "thinking" time based on message length
        const typingTime = Math.random() * 500 + 800; // 0.8s to 1.3s

        setTimeout(() => {
            const botResponseText = getBotResponse(newUserMsg.text);
            const newBotMsg: Message = { id: Date.now() + 1, text: botResponseText, sender: "bot" };
            setMessages((prev) => [...prev, newBotMsg]);
            setIsTyping(false);
        }, typingTime);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">

            {/* CHAT WINDOW */}
            {isOpen && (
                <div className="mb-4 w-[350px] max-w-[90vw] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-fade-in-up flex flex-col h-[500px]">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 flex justify-between items-center text-white shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                <FiCpu className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm tracking-wide">GameBot Support</h3>
                                <span className="text-[10px] opacity-90 flex items-center gap-1 font-medium">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse border border-green-200"></span>
                                    SYSTEM ONLINE
                                </span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-lg transition">
                            <FiX className="text-lg" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3.5 text-sm shadow-sm ${msg.sender === "user"
                                            ? "bg-red-600 text-white rounded-2xl rounded-br-none"
                                            : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none flex gap-1.5 shadow-sm">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type a message..."
                            className="flex-1 bg-gray-100 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500/20 focus:bg-white transition-all border border-transparent focus:border-red-100"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className={`p-3 rounded-xl transition-all shadow-sm ${inputValue.trim()
                                    ? "bg-red-600 text-white hover:bg-red-700 hover:shadow-md transform hover:-translate-y-0.5"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            <FiSend className="text-lg" />
                        </button>
                    </div>
                </div>
            )}

            {/* TOGGLE BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group w-14 h-14 bg-red-600 text-white rounded-full shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] flex items-center justify-center text-2xl hover:scale-105 hover:bg-red-700 transition-all duration-300"
            >
                {isOpen ? (
                    <FiX className="transform transition-transform group-hover:rotate-90" />
                ) : (
                    <FiMessageSquare className="transform transition-transform group-hover:scale-110" />
                )}
            </button>

            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default ChatBot;