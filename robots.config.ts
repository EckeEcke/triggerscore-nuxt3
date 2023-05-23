export default [
    { UserAgent: '*' },
    { Allow: '*'},
    { Disallow: '/search' },
    { BlankLine: true },

    { Sitemap: (req) => `https://${req.headers.host}/sitemap.xml` }
]