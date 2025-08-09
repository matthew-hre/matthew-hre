import { defineCMSConfig } from '@matthew-hre/cms'

export default defineCMSConfig({
    repo: 'matthew-hre/matthew-hre',
    contentPath: 'content',
    staticDir: 'static',
    collectionsDir: 'collections',

    static: {
        profile: {
            filename: 'profile.json',
            schema: {
                name: 'string',
                username: 'string',
                work: {
                    title: 'string',
                    location: 'string',
                    locationUrl: 'string?'
                },
                location: 'string',
                education: {
                    school: 'string',
                    schoolUrl: 'string?',
                }

            },
        },
    },

    collections: {
        projects: {
            dir: 'projects',
            schema: {
                name: 'string',
                slug: 'string',
                description: 'string',
                tags: 'string[]',
                url: 'string?',
                github: 'string?',
                fallbackColor: 'string?',
                order: 'number',
            },
        },
    },
} as const)
