import { SocialMediaContentGenerator } from "./content_generator/ContentGenerator"
import { TestPage } from "./TestPage"

export const IndexPage = () => {
    const upcomingTasks = [
        { daysUntil: 5, task: "Prepare graphics for Vitamin C Candy Madness" },
        { daysUntil: 7, task: "Schedule photoshoot for Summer Fruit Blast" },
        { daysUntil: 10, task: "Finalize copy for Holiday Sweet Treats" }
    ]
    return (
        <div className="flex min-h-screen bg-gradient-to-r from-pink-200 via-pink-150 to-pink-100"> {/* Apply gradient here */}
            <div className="w-3/4 rounded-lg m-5 bg-gradient-to-r from-pink-200 via-pink-150 to-pink-100">
                <SocialMediaContentGenerator />
            </div>
            <div className="w-1/4 flex flex-col mt-5 p-6 overflow-y-auto bg-pink-100">
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4 text-pink-700">Upcoming Tasks🩷</h2>
                    <div className="space-y-3">
                        {upcomingTasks.map((task, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-3 border-2 border-pink-300">
                                <div className="text-pink-500 font-semibold mb-1">
                                    In {task.daysUntil} days 🎀
                                </div>
                                <div className="text-pink-600 pl-2 border-l-2 border-pink-300">
                                    {task.task}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <h2 className="text-xl font-bold mb-4 text-pink-700">History🩷</h2>
                    <TestPage />
                </div>
            </div>
        </div>
    )
}
