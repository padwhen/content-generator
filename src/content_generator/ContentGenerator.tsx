import React, { useState } from "react"
import { SelectionBox } from "./SelectionBox";
import { audienceOptions, platformOptions, toneOptions } from "./options";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { generateContent } from "@/GenerateContent";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { fetchCampaigns } from "@/TestPage";

export const SocialMediaContentGenerator = () => {
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [audiences, setAudiences] = useState<string[]>([]);
    const [tones, setTones] = useState<string[]>([]);
    const [industry, setIndustry] = useState<string>("");
    const [includeCTA, setIncludeCTA] = useState<boolean>(false);
    const [frequency, setFrequency] = useState<number>(1);
    const [metrics, setMetrics] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const userId = localStorage.getItem('userId')

    const ENDPOINT = import.meta.env.VITE_ENDPOINT

    const { toast } = useToast()

    const updateCampaignStructure = (parsedResponse: any) => {
        const userId = localStorage.getItem('userId')
        const campaignId = uuidv4()
        return {
            id: campaignId,
            userId: userId,
            Campaign: {
                ...parsedResponse.Campaign,
                content_schedule: parsedResponse.Campaign.content_schedule.map((week: any) => ({
                    ...week,
                    posts: week.posts.map((post: any) => ({
                        ...post,
                        done: false
                    }))
                }))
            }
        }
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: string[] = []

        if (platforms.length === 0) {
            newErrors.push("Please select at least one social media platform.")
        }
        if (audiences.length === 0) {
            newErrors.push("Please select at least one target audience.")
        }
        if (!industry.trim()) {
            newErrors.push("Please enter your industry or niche")
        }
        if (!description.trim()) {
            newErrors.push("Please enter the description of your product")
        }
        setErrors(newErrors)
        if (newErrors.length === 0) {
            setIsLoading(true)
            const response_json = await generateContent({ platforms, audiences, tones, industry, includeCTA, frequency, metrics, description })
            if (response_json !== null) {
                const parsedResponse = JSON.parse(response_json)
                const updatedResponse = updateCampaignStructure(parsedResponse)
                try {
                    const response = await fetch(ENDPOINT, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedResponse)
                    })
                    await response.json();
                    toast({
                        title: `${updatedResponse.Campaign.name} created!`,
                    })
                    // Clear all inputs
                    setPlatforms([]);
                    setAudiences([]);
                    setTones([]);
                    setIndustry("");
                    setIncludeCTA(false);
                    setFrequency(1);
                    setMetrics("");
                    setDescription("");
                    await fetchCampaigns(userId)
                    // Scroll to the top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoading(false)
                }
            }
        }
    }

    return (
        <div className="flex">
            <div className="p-4 ">
                <h1 className="text-3xl font-bold mb-6 text-pink-700">Social Media Content Generator</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <SelectionBox 
                        label="1. Social Media Platforms"
                        options={platformOptions}
                        description="Choose the suitable platforms for this campaign"
                        selected={platforms} 
                        setSelected={setPlatforms}
                    />
                    <SelectionBox
                        label="2. Target Audience"
                        options={audienceOptions}
                        description="Choose the most suitable audience for this campaign"
                        selected={audiences}
                        setSelected={setAudiences}
                    />
                    <SelectionBox
                        label="3. Tone and Style"
                        options={toneOptions}
                        description="Choose the most suitable tone/style for this campaign"
                        selected={tones}
                        setSelected={setTones}
                    />
                    <div>
                        <Label htmlFor="industry" className="text-lg font-semibold">4. Industry/Niche (required)</Label>
                        <p className="italic text-black-200">Enter an industry/nice (for example: Fashion)</p>
                        <Input 
                            id="industry" 
                            placeholder="Enter your industry or niche"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="mt-1 bg-black-20"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="cta" className="text-lg font-semibold">5. Include Call to Action (CTA)</Label>
                        <Switch
                        id="cta"
                        checked={includeCTA}
                        onCheckedChange={setIncludeCTA}
                        />
                    </div>
                    <div>
                        <Label htmlFor="frequency" className="text-lg font-semibold">6. Timing And Frequency (weeks)</Label>
                        <p className="italic text-black-200">Enter a period of time, maximum 8 weeks, minimum of 1 week</p>
                        <Slider id="frequency" min={1} max={8} value={[frequency]} onValueChange={([value]) => setFrequency(value)} className="mt-2" />
                        <div className="text-sm text-pink-600 mt-1">
                            {frequency} week(s)
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="metrics" className="text-lg font-semibold">7. Performance Metrics</Label>
                        <Textarea id="metrics" placeholder="Define how you will measure the success of your content" value={metrics} onChange={(e) => setMetrics(e.target.value)} className="mt-1 bg-black-20" />
                    </div>
                    <div>
                        <Label htmlFor="metrics" className="text-lg font-semibold">8. Short Description of your Product (required)</Label>
                        <Textarea id="metrics" placeholder="Write a short description of your product" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 bg-black-20" />
                    </div>
                    {errors.length > 0 && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                <ul className="list-disc pl-5">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            'Generate Content'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}