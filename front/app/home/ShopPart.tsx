
const ShopPart = () => {
    return (
        <section className="max-w-390 justify-center mx-auto my-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Today's Games</h1>
                <div>
                    Categories will be here
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-800 rounded-xl p-4">
                    <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                    <h2 className="text-white text-xl font-bold mb-2">Game Title</h2>
                    <p className="text-gray-400 text-sm">Description of the game</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                    <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                    <h2 className="text-white text-xl font-bold mb-2">Game Title</h2>
                    <p className="text-gray-400 text-sm">Description of the game</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                    <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                    <h2 className="text-white text-xl font-bold mb-2">Game Title</h2>
                    <p className="text-gray-400 text-sm">Description of the game</p>
                </div>
            </div>

        </section>
    )
}

export default ShopPart