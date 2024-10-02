import { useState } from 'react'
import jsonData from './example.json'
import { Campaign, Post } from './types'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Textarea } from './components/ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Dialog, DialogContent, DialogTrigger } from './components/ui/dialog'
import { Heart } from 'lucide-react'

export const TestPage = () => {
    const [campaign, setCampaign] = useState<Campaign>(jsonData)

    const handlePostUpdate = (weekIndex: number, postIndex: number, updatedPost: Post) => {
        const updatedCampaign = { ...campaign };
        updatedCampaign.content_schedule[weekIndex].posts[postIndex] = updatedPost;
        setCampaign(updatedCampaign);
      };
    
    const handleMarkAsDone = (weekIndex: number, postIndex: number) => {
        const updatedCampaign = { ...campaign };
        updatedCampaign.content_schedule[weekIndex].posts[postIndex].isDone = true;
        setCampaign(updatedCampaign);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button 
                    variant="outline" 
                    className="w-full p-3 overflow-hidden text-ellipsis whitespace-nowrap text-lg bg-gradient-to-r from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 text-pink-700 border-2 border-pink-400 shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-between"
                >
                    <Heart className="w-5 h-5 text-pink-500 mr-2" />
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
                                {post.date} - {post.platform}
                                {post.isDone && <Badge className="ml-2 bg-pink-200 text-pink-700">Done</Badge>}
                            </CardTitle>
                            </CardHeader>
                            <CardContent>
                            <Textarea
                                className="mb-2"
                                value={post.content}
                                onChange={(e) => handlePostUpdate(weekIndex, postIndex, { ...post, content: e.target.value })}
                            />
                            <p className="text-pink-600"><strong>CTA:</strong> {post.cta}</p>
                            <p className="text-pink-600"><strong>Action:</strong> {post.action}</p>
                            <Button
                                className="mt-2 bg-pink-500 hover:bg-pink-600"
                                onClick={() => handleMarkAsDone(weekIndex, postIndex)}
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
    )
}