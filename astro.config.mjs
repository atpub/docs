// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://docs.atpub.me",
	integrations: [
		starlight({
			title: 'ATpub v1',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/atpub' },
				//{ icon: 'github', label: 'Bluesky', href: 'https://bsky.app/profile/atpub.me' }
			],
			editLink: {
				baseUrl: 'https://github.com/atpub/docs/tree/main/',
			},
			lastUpdated: true,
			sidebar: [
				{ slug: "index" },
				{
					label: "Basics",
					items: [
						{ label: "Identities", slug: "basics/identities" },
						{ label: "Teams", slug: "basics/teams" },
						{ label: "Services", slug: "basics/services" },
					]
				},
				{
					label: 'Lexicons',
					items: [
						{ label: "me.atpub.identity.claim", slug: 'lexicons/identity-claim' },
						{ label: "me.atpub.team.member", slug: 'lexicons/team-member' },
						{ label: "me.atpub.team.membership", slug: 'lexicons/team-membership' },						
					],
				},
				{ label: "Service providers ↗", link: "https://services.atpub.me" },
				{ label: "atpub.me ↗", link: "https://atpub.me" }
			],
		}),
	],
});
