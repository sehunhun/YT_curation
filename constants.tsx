
import { CarouselItem, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Insights', href: '#' },
  { label: 'Manifesto', href: '#' },
  { label: 'Membership', href: '#' },
];

export const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: '1',
    title: 'Daily Briefs',
    description: 'Essential morning updates',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'Deep Dives',
    description: 'In-depth weekly analysis',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    title: 'Member Portal',
    description: 'Connect with the community',
    imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    title: 'Exclusive Content',
    description: 'Premium members only',
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800',
  },
];
