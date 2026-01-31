"use client";

import { useState, useEffect, useRef } from "react";
import { FiMessageSquare, FiX, FiSend, FiCpu, FiShoppingBag } from "react-icons/fi";

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
        { id: 1, text: "Hello! I am GameBot 🤖. I know about almost every game in stock. Try me!", sender: "bot" }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping, isOpen]);

    const quickActions = [
        "Trade-in Prices 💰",
        "Do you have FC 25? ⚽",
        "PS5 Consoles 🎮",
        "Store Hours ⏰"
    ];

    const getBotResponse = (text: string) => {
        const lowerText = text.toLowerCase();
        const contains = (keywords: string[]) => keywords.some(keyword => lowerText.includes(keyword));

        if (contains(["fifa", "fc 24", "fc 25", "soccer", "football", "ea sports", "ultimate team", "fut"]))
            return "⚽ **EA Sports FC is here!** We have the latest FC (formerly FIFA) in stock. We also sell FC Points for your Ultimate Team packs. Are you looking for PS5, Xbox, or Switch?";

        if (contains(["nba", "2k", "basketball", "vc"]))
            return "🏀 **Ball is Life.** We have NBA 2K in stock. Need some VC to upgrade your MyPlayer? We have gift cards for that too.";

        if (contains(["doner", "pecat", "saurma"]))
            return "😋 Yummy it is now 3.90 in Pecat-Doner.";

        if (contains(["ufc", "mma", "fighting", "wwe", "wrestling"]))
            return "🥊 **Fight Night:** We have UFC 5 and WWE 2K available. Step into the octagon or the ring!";

        if (contains(["mlb", "baseball", "the show"]))
            return "⚾ **Home Run!** MLB The Show is in stock. It's the best baseball sim out there.";

        if (contains(["forza", "horizon", "motorsport"]))
            return "🏎️ **Xbox Racer:** Forza Horizon is a masterpiece. We have it in stock, or you can play it via Game Pass Ultimate (which we sell!).";

        if (contains(["gran turismo", "gt7"]))
            return "🏎️ **The Real Driving Simulator.** Gran Turismo 7 looks incredible on PS5. Do you need a racing wheel to go with it?";

        if (contains(["need for speed", "nfs", "crew", "burnout"]))
            return "🚔 **Pedal to the metal!** We have the latest Need for Speed. Don't get busted.";

        if (contains(["cod", "call of duty", "mw3", "black ops", "warzone"]))
            return "🔫 **Stay Frosty.** We have the newest Call of Duty. Remember, switching to your pistol is always faster than reloading!";

        if (contains(["fortnite", "vbuck", "battle royale"]))
            return "🪂 **Victory Royale!** The game is free, but we sell V-Bucks cards, Minty Legends packs, and controllers to help you crank 90s.";

        if (contains(["valorant", "riot", "league", "lol"]))
            return "🎯 **Riot Games:** Valorant and League are free-to-play on PC! We sell Riot Points (RP) cards for your skins.";

        if (contains(["overwatch", "ow2"]))
            return "🦸 **Heroes Never Die!** We stock coins for the Overwatch Battle Pass.";

        if (contains(["halo", "master chief"]))
            return "🌌 **Finish the Fight.** Halo Infinite is available for Xbox. Master Chief is waiting.";

        if (contains(["gta", "grand theft auto", "rockstar"]))
            return "⭐️ **GTA V:** A classic that never dies. As for GTA VI... we are all waiting for 2025. 🌴";

        if (contains(["rdr", "red dead", "cowboy", "arthur"]))
            return "🤠 **Outlaws for Life.** Red Dead Redemption 2 is a masterpiece. Have some faith, Arthur!";

        if (contains(["god of war", "kratos", "ragnarok"]))
            return "🪓 **Boy!** God of War Ragnarök is in stock for PS5 and PS4. It is an absolute must-play.";

        if (contains(["spiderman", "spider-man", "miles morales"]))
            return "🕸️ **Thwip!** Marvel's Spider-Man 2 is spectacular. We have copies available.";

        if (contains(["assassin", "creed", "mirage", "shadows"]))
            return "🦅 **Nothing is true, everything is permitted.** We have the latest Assassin's Creed titles in stock.";

        if (contains(["last of us", "tlou", "joel", "ellie"]))
            return "🍄 **Endure and Survive.** The Last of Us Part I and II are available. Bring tissues, it's emotional.";

        if (contains(["mario", "odyssey", "wonder", "kart", "party"]))
            return "🍄 **It's-a me!** We have Mario Wonder, Mario Kart 8, and Mario Party. Perfect for family game night.";

        if (contains(["zelda", "link", "totk", "botw", "tears"]))
            return "🗡️ **Hyrule calls.** Tears of the Kingdom is in stock. It's dangerous to go alone, take this game!";

        if (contains(["smash", "bros"]))
            return "🥊 **SETTLE IT IN SMASH!** Super Smash Bros Ultimate is available. Who is your main?";

        if (contains(["animal crossing", "new horizons", "acnh"]))
            return "🍃 **Island Life.** Yes, you can pay off your debt to Tom Nook. We have Animal Crossing in stock.";

        if (contains(["elden ring", "souls", "bloodborne", "sekiro", "fromsoft"]))
            return "⚔️ **Prepare to Die.** We have Elden Ring (and the DLC). A truly challenging masterpiece.";

        if (contains(["cyberpunk", "2077", "phantom liberty"]))
            return "🦾 **Wake up, Samurai.** Cyberpunk 2077 is fixed and amazing now. Highly recommended on next-gen consoles.";

        if (contains(["final fantasy", "ff7", "ff16", "rebirth"]))
            return "🗡️ **Fantasy Awaits.** Final Fantasy VII Rebirth and XVI are in stock. The graphics are insane.";

        if (contains(["bg3", "baldurs gate", "dnd"]))
            return "🎲 **Critical Success!** Baldur's Gate 3 is available. Be careful with the Mind Flayers.";

        if (contains(["hogwarts", "legacy", "harry potter"]))
            return "🪄 **You're a wizard!** Hogwarts Legacy is available on all platforms (Switch, PS5, Xbox).";

        if (contains(["resident evil", "village", "biohazard"]))
            return "🧟 **Umbrella Corp:** We have the Resident Evil Remakes and Village. Lady Dimitrescu is waiting...";

        if (contains(["silent hill"]))
            return "🌫️ **In my restless dreams...** The Silent Hill 2 Remake is here. Play with the lights on.";

        if (contains(["fnaf", "freddy", "five nights"]))
            return "🐻 **Security Alert:** We have FNAF: Security Breach and Help Wanted. Don't run out of power!";

        if (contains(["tekken"]))
            return "👊 **Get ready for the next battle!** Tekken 8 is amazing. We have it in stock.";

        if (contains(["street fighter", "sf6"]))
            return "👊 **Hadouken!** Street Fighter 6 is available. Modern controls make it easy to learn!";

        if (contains(["mortal kombat", "mk1"]))
            return "🩸 **FINISH HIM!** Mortal Kombat 1 is in stock. Not for the faint of heart!";

        if (contains(["minecraft", "blocks"]))
            return "⛏️ **Creeper? Aww man.** Minecraft is available on everything. We also sell Minecoins.";

        if (contains(["roblox", "robux"]))
            return "🟥 **OOF!** We don't sell physical Roblox games (it's free), but we have plenty of Robux Gift Cards!";

        if (contains(["lego", "star wars"]))
            return "🧱 **True Jedi.** We have LEGO Star Wars: The Skywalker Saga and other LEGO titles.";

        if (contains(["trade", "sell", "selling", "swap"]))
            return "💰 **Trade-Ins:** We buy your old games and consoles! You get **20% more** if you choose Store Credit instead of Cash. Bring them in for a quote.";

        if (contains(["return", "refund", "broken"]))
            return "🛡️ **Warranty:** 7 days for used games, 30 days for new (unopened). Consoles have a 3-month store warranty.";

        if (contains(["price", "cost", "how much"]))
            return "🏷️ **Pricing:** New PS5/Xbox games are usually $69.99. Switch games are $59.99. Used games are cheaper! Ask for a specific title.";

        if (contains(["hello", "hi", "hey", "sup"]))
            return "👋 Welcome to the store! I can help you find games, check prices, or explain trade-ins.";

        if (contains(["thank", "cool", "ok"]))
            return "👍 You got it! Let me know if you need anything else.";

        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
        return `🤔 I haven't played that one yet. You can check Google:<br/><br/><a href="${googleUrl}" target="_blank" class="text-blue-600 font-bold underline hover:text-blue-800">🔎 Search for "${text}"</a>`;
    };

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const newUserMsg: Message = { id: Date.now(), text: text, sender: "user" };
        setMessages((prev) => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        const typingTime = Math.random() * 800 + 400;

        setTimeout(() => {
            const botResponseText = getBotResponse(text);
            const newBotMsg: Message = { id: Date.now() + 1, text: botResponseText, sender: "bot" };
            setMessages((prev) => [...prev, newBotMsg]);
            setIsTyping(false);
        }, typingTime);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSend(inputValue);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">

            {isOpen && (
                <div className="mb-4 w-[380px] max-w-[90vw] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-fade-in-up flex flex-col h-[600px]">

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                    <FiCpu className="text-xl" />
                                </div>
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-indigo-600 rounded-full animate-pulse"></span>
                            </div>
                            <div>
                                <h3 className="font-bold text-base tracking-wide">GameStore AI</h3>
                                <span className="text-xs opacity-90 font-medium text-blue-100 flex items-center gap-1">
                                    <FiShoppingBag /> Sales & Support
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-2 rounded-full transition duration-200"
                        >
                            <FiX className="text-xl" />
                        </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
                        <div className="text-center text-xs text-gray-400 my-2">
                            <span>Today</span>
                        </div>

                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3.5 text-sm shadow-sm leading-relaxed ${msg.sender === "user"
                                        ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
                                        : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-sm"
                                        }`}
                                >
                                    <span dangerouslySetInnerHTML={{
                                        __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    }} />
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none flex gap-1.5 shadow-sm">
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="bg-gray-50 px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide py-2">
                        {quickActions.map((action, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSend(action)}
                                className="whitespace-nowrap bg-white border border-blue-200 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-blue-50 transition shadow-sm"
                            >
                                {action}
                            </button>
                        ))}
                    </div>

                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask about FIFA, COD, Trade-ins..."
                            className="flex-1 bg-gray-100 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all border border-transparent focus:border-blue-100 placeholder-gray-400"
                        />
                        <button
                            onClick={() => handleSend(inputValue)}
                            disabled={!inputValue.trim()}
                            className={`p-3 rounded-xl transition-all shadow-sm flex-shrink-0 ${inputValue.trim()
                                ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md transform hover:-translate-y-0.5"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            <FiSend className="text-lg" />
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-16 h-16 bg-blue-600 text-white rounded-full shadow-[0_4px_20px_0_rgba(37,99,235,0.4)] flex items-center justify-center text-2xl hover:scale-105 hover:bg-blue-700 transition-all duration-300"
            >
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                )}
                {isOpen ? (
                    <FiX className="transform transition-transform duration-300 group-hover:rotate-90" />
                ) : (
                    <FiMessageSquare className="transform transition-transform duration-300 group-hover:scale-110" />
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
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default ChatBot;