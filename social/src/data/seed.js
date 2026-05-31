// Deterministic seed data for Buzz social.

export const CURRENT_USER = { handle: 'demo', name: 'Demo User', bio: 'Just hanging out 👋', avatar: 7, followers: 0, following: 0 }

export const USERS = [
  { handle: 'amara', name: 'Amara Okafor', bio: 'Building things at small teams. Design + code.', avatar: 1, followers: 1240, following: 312 },
  { handle: 'diego', name: 'Diego Martins', bio: 'Operations nerd. Coffee obsessive.', avatar: 3, followers: 880, following: 245 },
  { handle: 'sophie', name: 'Sophie Tremblay', bio: 'CTO. Health tech for everyone.', avatar: 5, followers: 4310, following: 188 },
  { handle: 'yuki', name: 'Yuki Tanaka', bio: 'Product director, plant enthusiast.', avatar: 9, followers: 2200, following: 410 },
  { handle: 'fatima', name: 'Fatima Al-Rashid', bio: 'CEO @ Verda. Building clean energy.', avatar: 11, followers: 9850, following: 92 },
  { handle: 'liam', name: 'Liam O\'Connor', bio: 'IT manager. Soccer dad.', avatar: 13, followers: 540, following: 380 },
  { handle: 'priya', name: 'Priya Nair', bio: 'Finance and weekend hiker 🥾', avatar: 15, followers: 1680, following: 220 },
  { handle: 'tom', name: 'Tom Becker', bio: 'Filmmaker. Stories about people.', avatar: 17, followers: 3120, following: 178 },
  { handle: 'hannah', name: 'Hannah Kim', bio: 'Restaurants and good neighborhoods.', avatar: 19, followers: 760, following: 290 },
  { handle: 'marcus', name: 'Marcus Bell', bio: 'Logistics for a living.', avatar: 21, followers: 420, following: 510 },
]

export const TOPICS = [
  { tag: '#design', posts: 1200 },
  { tag: '#productivity', posts: 980 },
  { tag: '#coffee', posts: 760 },
  { tag: '#startups', posts: 1540 },
  { tag: '#hiking', posts: 410 },
  { tag: '#ai', posts: 5240 },
  { tag: '#travel', posts: 1820 },
  { tag: '#books', posts: 660 },
]

export const POSTS = [
  { id: 'p1', author: 'amara', time: '2h', text: 'New side project: a tiny CLI that turns my pomodoro logs into a weekly markdown report. So satisfying. #productivity', likes: 84, comments: [
    { id: 'c1', author: 'yuki', text: 'Open source it!', time: '1h' },
    { id: 'c2', author: 'diego', text: 'Need this.', time: '30m' },
  ]},
  { id: 'p2', author: 'sophie', time: '5h', text: 'We are finally rolling out automatic prior auth for in-network referrals. Two years of work. Thank you to the whole team. 🎉', likes: 412, comments: [
    { id: 'c3', author: 'fatima', text: 'Massive — congrats!', time: '4h' },
  ]},
  { id: 'p3', author: 'tom', time: '8h', text: 'Edit bay all weekend. Always feel like the first cut is awful and the second cut is the actual story.', likes: 56, comments: [] },
  { id: 'p4', author: 'fatima', time: '1d', text: 'Reminder: clean energy is also an infrastructure story. The permits and the panels matter equally. #startups', likes: 1280, comments: [
    { id: 'c4', author: 'liam', text: 'Truth.', time: '20h' },
    { id: 'c5', author: 'sophie', text: '+1000', time: '14h' },
  ]},
  { id: 'p5', author: 'yuki', time: '1d', text: 'My monstera is finally throwing a new leaf 🌿', likes: 38, comments: [] },
  { id: 'p6', author: 'priya', time: '1d', text: 'Trail report: Mt Tam this morning. Cool, foggy, no one else on the loop until the summit. Recommend.', likes: 142, comments: [
    { id: 'c6', author: 'hannah', text: 'Wow, dreamy.', time: '12h' },
  ]},
  { id: 'p7', author: 'diego', time: '2d', text: 'Tried the new tasting menu at La Plaza last night. The al pastor is still the move.', likes: 92, comments: [
    { id: 'c7', author: 'hannah', text: 'They never miss.', time: '1d' },
  ]},
  { id: 'p8', author: 'liam', time: '2d', text: 'School district 1:1 device program launched. Fewer fires than expected. Let me know what worked at yours.', likes: 64, comments: [] },
  { id: 'p9', author: 'hannah', time: '3d', text: 'In love with our new corner spot. The light at 4pm is the entire reason.', likes: 210, comments: [
    { id: 'c8', author: 'amara', text: 'Pls take pictures.', time: '2d' },
  ]},
  { id: 'p10', author: 'marcus', time: '3d', text: 'Shipping a redesign of our dock scheduling tool. So many edge cases — every depot is different.', likes: 28, comments: [] },
  { id: 'p11', author: 'tom', time: '3d', text: 'Watched a 1962 movie last night that hit harder than anything I have seen this year. The pacing!', likes: 145, comments: [] },
  { id: 'p12', author: 'amara', time: '4d', text: 'Hot take: design systems should ship with stories, not just specs.', likes: 188, comments: [
    { id: 'c9', author: 'yuki', text: 'Hard agree.', time: '3d' },
  ]},
]

export const SEED_NOTIFICATIONS = [
  { id: 'n1', kind: 'like', actor: 'amara', text: 'liked your post.', time: '1h', read: false },
  { id: 'n2', kind: 'follow', actor: 'sophie', text: 'started following you.', time: '3h', read: false },
  { id: 'n3', kind: 'comment', actor: 'diego', text: 'commented: "Need this."', time: '5h', read: true },
  { id: 'n4', kind: 'mention', actor: 'fatima', text: 'mentioned you in a thread.', time: '1d', read: true },
  { id: 'n5', kind: 'like', actor: 'tom', text: 'liked your reply.', time: '2d', read: true },
]
