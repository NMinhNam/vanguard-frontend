const importAll = (r) => Object.keys(r).map((key) => key.replace('../views/', '').replace('.vue', '').split('/'))
//Cắt các path thành các mảng views/pages/home/index.vue -> ['pages', 'home'. 'index']
const pages = importAll(import.meta.glob('../views/**/*.vue'))

const childrenFilter = (p) => ~p.indexOf('^')

const generateRoute = (path) => {
    if (path[0].toLowerCase().startsWith('index') && path.length > 1) {
        path.shift()
    }

    if (path.length === 1) {
        const shortcut = path[0].toLowerCase()
        return shortcut.startsWith('index') ? '' : shortcut.startsWith('_') ? shortcut.replace('_', ':') : shortcut
    }

    const lastElement = path[path.length - 1]
    if (lastElement.toLowerCase().startsWith('index')) {
        path.pop()
    } else if (lastElement.startsWith('_')) {
        path[path.length - 1] = lastElement.replace('_', ':')
    }
    return path.map((p) => p.toLowerCase()).join('/')
}

const childrenByPath = pages
    .filter((path) => path.some(childrenFilter))
    .map((path) => {
        const copy = [...path]
        copy[copy.length - 1] = copy[copy.length - 1].slice(1)
        const key = `/${generateRoute(copy.slice(0, copy.length - 1))}`
        return {
            path,
            route: `/${generateRoute(copy)}`,
            key,
        }
    })
    .reduce((acc, cur) => {
        const key = cur.key
        delete cur.key
        if (acc[key]) {
            acc[key].push(cur)
        } else {
            acc[key] = [cur]
        }
        return acc
    }, {})

const routes = pages
    .filter((path) => !path.some(childrenFilter))
    .map((path) => {
        const route = `/${generateRoute([...path])}`
        let children = []
        if (childrenByPath[route]) {
            children = childrenByPath[route].map(({ path, route }) => {
                return {
                    path: route,
                    name: path.join('/'),
                    component: () => import(/* @vite-ignore */ `/src/views/${path.join('/')}.vue`),
                    meta: { title: path.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' - ') },
                }
            })
        }
        return {
            path: route,
            name: path.join('/'),
            component: () => import(/* @vite-ignore */ `/src/views/${path.join('/')}.vue`),
            meta: { title: path.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' - ') },
            ...(children.length && { children }),
        }
    })
    .concat([{ path: '/:catchAll(.*)', redirect: '/pages/404error' }]) // Thêm dòng này cho route catch-all

export default routes
