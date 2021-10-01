const path = require('path');
// 載入 prerender-spa-plugin (第一步)
const PrerenderSPAPlugin = require('prerender-spa-plugin');
// 載入 PuppeteerRenderer (第二步)
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const paths = [
    {
        path: '/',
        lastmod: '2021-08-01 12:00:00',
        priority: 1.00,
        changefreq: 'monthly'
    },
    {
        path: '/List/2',
        lastmod: '2021-08-01 12:00:00',
        priority: 1.00,
        changefreq: 'monthly'
        // changefreq: 'yearly'
    },
    {
        path: '/List/3',
        lastmod: '2021-08-01 12:00:00',
        priority: 1.00,
        changefreq: 'monthly'
        // changefreq: 'yearly'
    },
    {
        path: '/List/24',
        lastmod: '2021-08-01 12:00:00',
        priority: 1.00,
        changefreq: 'monthly'
        // changefreq: 'yearly'
    }
];

module.exports = {
    // publicPath: '/',
    configureWebpack (config) {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                // 創建實例(第三步)
                new PrerenderSPAPlugin({
                    staticDir: path.join(__dirname, 'dist'),
                    routes: ['/', '/shoppingnotes', '/buycarton', '/corrugatedboxe', '/packmovingcarton'],
                    renderer: new Renderer({
                        renderAfterDocumentEvent: 'render-event',
                    }),
                    minify: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        decodeEntities: true,
                        keepClosingSlash: true,
                        sortAttributes: true,
                    },
                }),
                new SitemapPlugin({
                    base: 'https://shop.igprice.com',
                    paths,
                    options: {
                        filename: 'sitemap.xml'
                    },
                    // sitemapindex: {
                    //     'app': {
                    //         urlset: {
                    //             '/sitemap.xml': {
                    //                 priority: 0.9
                    //             }
                    //         }
                    //     }
                    // },
                })
            );
        }
    },
    productionSourceMap: false
};
