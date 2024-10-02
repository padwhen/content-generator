export interface Post {
    date: string;
    platform: string;
    content: string;
    cta: string;
    action: string;
    isDone?: boolean;
}

export interface Week {
    week: number;
    posts: Post[]
}

export interface Campaign {
    name: string;
    duration: string;
    start_date: string;
    platforms: string[];
    target_audience: string[];
    tone_and_style: string;
    industry: string;
    product_description: string;
    content_schedule: Week[];
}