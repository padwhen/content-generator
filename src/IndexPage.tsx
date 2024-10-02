import { SocialMediaContentGenerator } from "./content_generator/ContentGenerator"

export const IndexPage = () => {
    return (
        <div className="flex min-h-screen bg-pink-100">
            <div className="w-3/4 bg-pink-100 rounded-lg m-5">
                <SocialMediaContentGenerator />
            </div>
            <div className="w-1/4 bg-pink-200 p-6">
                Hello
            </div>
        </div>
    )
}