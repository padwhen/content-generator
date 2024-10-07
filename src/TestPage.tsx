import { useEffect, useState } from 'react'
// import jsonData from './example.json'
import { Campaign, Post } from './types'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Textarea } from './components/ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Dialog, DialogContent, DialogTrigger } from './components/ui/dialog'
import { Heart } from 'lucide-react'

const ENDPOINT = import.meta.env.VITE_ENDPOINT

export async function fetchCampaigns(userId: any) {
    try {
        const response = await fetch(`${ENDPOINT}?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`)
        }
        const campaigns = await response.json()
        return campaigns;
    } catch (error) {
        console.error('Error fetching campaigns: ', error)
        return null
    }
}

const blinkAnimation = `
  @keyframes blink {
    0% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(236, 72, 153, 0); }
    100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
  }
`;


export const TestPage = () => {
    const userId = localStorage.getItem('userId')
    const [campaigns, setCampaigns] = useState<Campaign[]>([])

    useEffect(() => {
        if (userId) {
            const loadCampaigns = async () => {
                const fetchedCampaigns = await fetchCampaigns(userId);
                if (fetchedCampaigns) {
                    setCampaigns(fetchedCampaigns)
                }
            };
            loadCampaigns();
        }
    }, [userId]);

    const handlePostUpdate = (campaignIndex: number, weekIndex: number, postIndex: number, updatedPost: Post) => {
        const updatedCampaigns = [...campaigns];
        updatedCampaigns[campaignIndex].content_schedule[weekIndex].posts[postIndex] = updatedPost;
        setCampaigns(updatedCampaigns);
    };
    
    const handleMarkAsDone = (campaignIndex: number, weekIndex: number, postIndex: number) => {
        const updatedCampaigns = [...campaigns];
        updatedCampaigns[campaignIndex].content_schedule[weekIndex].posts[postIndex].isDone = true;
        setCampaigns(updatedCampaigns);
    };

    if (campaigns.length == 0) {
        return <div>
            <Button 
                    variant="outline" 
                    className="w-full p-3 overflow-hidden text-ellipsis whitespace-nowrap text-lg bg-gradient-to-r from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 text-pink-700 border-2 border-pink-400 shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-between"
                >
                    <Heart className="w-5 h-5 text-pink-500 mr-2" />
                    <span className="flex-grow text-left">No campaign created yet</span>
                    <span className="text-sm text-pink-600">💖</span>
            </Button>
        </div>
    }

    return (
        <div className="flex flex-col gap-2">
        {campaigns.map((campaign, campaignIndex) => (
            <Dialog key={campaign.id}>
                <DialogTrigger asChild>
                    <Button 
                        variant="outline" 
                        className="w-full p-3 overflow-hidden text-ellipsis whitespace-nowrap text-lg bg-gradient-to-r from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 text-pink-700 border-2 border-pink-400 shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-between"
                    >
                        <Heart className="w-5 h-5 text-pink-500" />
                        <span className="flex-grow text-left">{campaign.name}</span>
                        <span className="text-sm text-pink-600">💖</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className='max-w-[90vw] max-h-[90vh] overflow-y-auto'>
                    <div className="mt-4">
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-pink-700">{campaign.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-pink-600"><strong>Duration:</strong> {campaign.duration}</p>
                                        <p className="text-pink-600"><strong>Start Date:</strong> {campaign.start_date}</p>
                                        <p className="text-pink-600"><strong>Tone and Style:</strong> {campaign.tone_and_style}</p>
                                        <p className="text-pink-600"><strong>Industry:</strong> {campaign.industry}</p>
                                        <p className="text-pink-600"><strong>Product Description:</strong> {campaign.product_description}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-pink-600 font-semibold mb-2">Platforms:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {campaign.platforms.map((platform, index) => (
                                            <Badge key={index} variant="secondary" className="bg-pink-200 text-pink-700 rounded-full px-3 py-1">
                                                {platform}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-pink-600 font-semibold mb-2">Target Audience:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {campaign.target_audience.map((audience, index) => (
                                            <Badge key={index} variant="secondary" className="bg-pink-100 text-pink-700 rounded-full px-3 py-1">
                                                {audience}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                
                        <Accordion type="single" collapsible className="w-full">
                            {campaign.content_schedule.map((week, weekIndex) => (
                                <AccordionItem key={weekIndex} value={`week-${week.week}`}>
                                    <AccordionTrigger className="text-pink-700">Week {week.week}</AccordionTrigger>
                                    <AccordionContent>
                                        {week.posts.map((post, postIndex) => (
                                            <Card key={postIndex} className="mb-4 bg-white">
                                                <CardHeader>
                                                    <CardTitle className="text-lg font-semibold text-pink-600">
                                                        <div className='flex gap-2 capitalize'>{post.date} - {post.platform}</div>
                                                        {Boolean(post.isDone) && <Badge className="ml-2 bg-pink-200 text-pink-700">Done</Badge>}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <Textarea
                                                        className="mb-2"
                                                        value={post.content}
                                                        onChange={(e) => handlePostUpdate(campaignIndex, weekIndex, postIndex, { ...post, content: e.target.value })}
                                                    />
                                                    <p className="text-pink-600 capitalize"><strong>CTA:</strong> {post.cta}</p>
                                                    <p className="text-pink-600 capitalize"><strong>Action:</strong> {post.action}</p>
                                                    <Button
                                                        className="mt-2 bg-pink-500 hover:bg-pink-600"
                                                        onClick={() => handleMarkAsDone(campaignIndex, weekIndex, postIndex)}
                                                        disabled={post.isDone}
                                                    >
                                                        Mark as Done
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </DialogContent>
            </Dialog>
        ))}
    </div>
    )
}