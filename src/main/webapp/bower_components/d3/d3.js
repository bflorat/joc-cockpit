d3 = function () {
    function l(a) {
        return null != a && !isNaN(a)
    }

    function n(a) {
        return a.length
    }

    function p(a) {
        for (var b = 1; a * b % 1;)b *= 10;
        return b
    }

    function q(a, b) {
        try {
            for (var c in b)Object.defineProperty(a.prototype, c, {value: b[c], enumerable: !1})
        } catch (c) {
            a.prototype = b
        }
    }

    function r() {
    }

    function u() {
    }

    function v(a, b, c) {
        return function () {
            var d = c.apply(b, arguments);
            return d === b ? a : d
        }
    }

    function w(a, b) {
        if (b in a)return b;
        b = b.charAt(0).toUpperCase() + b.substring(1);
        for (var c = 0, d = x.length; c < d; ++c) {
            var e = x[c] + b;
            if (e in a)return e
        }
    }

    function y() {
    }

    function z() {
    }

    function A(a) {
        function d() {
            for (var f, c = b, d = -1, e = c.length; ++d < e;)(f = c[d].on) && f.apply(this, arguments);
            return a
        }

        var b = [], c = new r;
        return d.on = function (d, e) {
            var g, f = c.get(d);
            return arguments.length < 2 ? f && f.on : (f && (f.on = null, b = b.slice(0, g = b.indexOf(f)).concat(b.slice(g + 1)), c.remove(d)), e && b.push(c.set(d, {on: e})), a)
        }, d
    }

    function B() {
        a.event.preventDefault()
    }

    function C() {
        for (var c, b = a.event; c = b.sourceEvent;)b = c;
        return b
    }

    function D(b) {
        for (var c = new z, d = 0, e = arguments.length; ++d < e;)c[arguments[d]] = A(c);
        return c.of = function (d, e) {
            return function (f) {
                try {
                    var g = f.sourceEvent = a.event;
                    f.target = b, a.event = f, c[f.type].apply(d, e)
                } finally {
                    a.event = g
                }
            }
        }, c
    }

    function G(a) {
        return F(a, L), a
    }

    function M(a) {
        return "function" == typeof a ? a : function () {
            return H(a, this)
        }
    }

    function N(a) {
        return "function" == typeof a ? a : function () {
            return I(a, this)
        }
    }

    function P(b, c) {
        function d() {
            this.removeAttribute(b)
        }

        function e() {
            this.removeAttributeNS(b.space, b.local)
        }

        function f() {
            this.setAttribute(b, c)
        }

        function g() {
            this.setAttributeNS(b.space, b.local, c)
        }

        function h() {
            var a = c.apply(this, arguments);
            null == a ? this.removeAttribute(b) : this.setAttribute(b, a)
        }

        function i() {
            var a = c.apply(this, arguments);
            null == a ? this.removeAttributeNS(b.space, b.local) : this.setAttributeNS(b.space, b.local, a)
        }

        return b = a.ns.qualify(b), null == c ? b.local ? e : d : "function" == typeof c ? b.local ? i : h : b.local ? g : f
    }

    function Q(a) {
        return a.trim().replace(/\s+/g, " ")
    }

    function R(b) {
        return new RegExp("(?:^|\\s+)" + a.requote(b) + "(?:\\s+|$)", "g")
    }

    function S(a) {
        return a.trim().split(/^|\s+/)
    }

    function T(a, b) {
        function d() {
            for (var d = -1; ++d < c;)a[d](this, b)
        }

        function e() {
            for (var d = -1, e = b.apply(this, arguments); ++d < c;)a[d](this, e)
        }

        a = S(a).map(U);
        var c = a.length;
        return "function" == typeof b ? e : d
    }

    function U(a) {
        var b = R(a);
        return function (c, d) {
            if (e = c.classList)return d ? e.add(a) : e.remove(a);
            var e = c.getAttribute("class") || "";
            d ? (b.lastIndex = 0, b.test(e) || c.setAttribute("class", Q(e + " " + a))) : c.setAttribute("class", Q(e.replace(b, " ")))
        }
    }

    function V(a, b, c) {
        function d() {
            this.style.removeProperty(a)
        }

        function e() {
            this.style.setProperty(a, b, c)
        }

        function f() {
            var d = b.apply(this, arguments);
            null == d ? this.style.removeProperty(a) : this.style.setProperty(a, d, c)
        }

        return null == b ? d : "function" == typeof b ? f : e
    }

    function W(a, b) {
        function c() {
            delete this[a]
        }

        function d() {
            this[a] = b
        }

        function e() {
            var c = b.apply(this, arguments);
            null == c ? delete this[a] : this[a] = c
        }

        return null == b ? c : "function" == typeof b ? e : d
    }

    function X(b) {
        return "function" == typeof b ? b : (b = a.ns.qualify(b)).local ? function () {
            return this.ownerDocument.createElementNS(b.space, b.local)
        } : function () {
            return this.ownerDocument.createElementNS(this.namespaceURI, b)
        }
    }

    function Y(a) {
        return {__data__: a}
    }

    function Z(a) {
        return function () {
            return K(this, a)
        }
    }

    function $(b) {
        return arguments.length || (b = a.ascending), function (a, c) {
            return a && c ? b(a.__data__, c.__data__) : !a - !c
        }
    }

    function _(a, b) {
        for (var c = 0, d = a.length; c < d; c++)for (var h, e = a[c], f = 0, g = e.length; f < g; f++)(h = e[f]) && b(h, f, c);
        return a
    }

    function aa(a) {
        return F(a, ba), a
    }

    function ca(a) {
        var b, c;
        return function (d, e, f) {
            var i, g = a[f].update, h = g.length;
            for (f != c && (c = f, b = 0), e >= b && (b = e + 1); !(i = g[b]) && ++b < h;);
            return i
        }
    }

    function da() {
        var a = this.__transition__;
        a && ++a.active
    }

    function fa(b, d, e) {
        function j() {
            var a = this[f];
            a && (this.removeEventListener(b, a, a.$), delete this[f])
        }

        function k() {
            var a = h(d, c(arguments));
            j.call(this), this.addEventListener(b, this[f] = a, a.$ = e), a._ = d
        }

        function l() {
            var d, c = new RegExp("^__on([^.]+)" + a.requote(b) + "$");
            for (var e in this)if (d = e.match(c)) {
                var f = this[e];
                this.removeEventListener(d[1], f, f.$), delete this[e]
            }
        }

        var f = "__on" + b, g = b.indexOf("."), h = ha;
        g > 0 && (b = b.substring(0, g));
        var i = ga.get(b);
        return i && (b = i, h = ia), g ? d ? k : j : d ? y : l
    }

    function ha(b, c) {
        return function (d) {
            var e = a.event;
            a.event = d, c[0] = this.__data__;
            try {
                b.apply(this, c)
            } finally {
                a.event = e
            }
        }
    }

    function ia(a, b) {
        var c = ha(a, b);
        return function (a) {
            var b = this, d = a.relatedTarget;
            d && (d === b || 8 & d.compareDocumentPosition(b)) || c.call(b, a)
        }
    }

    function la() {
        var b = ".dragsuppress-" + ++ka, c = "click" + b, d = a.select(f).on("touchmove" + b, B).on("dragstart" + b, B).on("selectstart" + b, B);
        if (ja) {
            var g = e.style, h = g[ja];
            g[ja] = "none"
        }
        return function (a) {
            function e() {
                d.on(c, null)
            }

            d.on(b, null), ja && (g[ja] = h), a && (d.on(c, function () {
                B(), e()
            }, !0), setTimeout(e, 0))
        }
    }

    function na(b, c) {
        c.changedTouches && (c = c.changedTouches[0]);
        var d = b.ownerSVGElement || b;
        if (d.createSVGPoint) {
            var e = d.createSVGPoint();
            if (ma < 0 && (f.scrollX || f.scrollY)) {
                d = a.select("body").append("svg").style({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    margin: 0,
                    padding: 0,
                    border: "none"
                }, "important");
                var g = d[0][0].getScreenCTM();
                ma = !(g.f || g.e), d.remove()
            }
            return ma ? (e.x = c.pageX, e.y = c.pageY) : (e.x = c.clientX, e.y = c.clientY), e = e.matrixTransform(b.getScreenCTM().inverse()), [e.x, e.y]
        }
        var h = b.getBoundingClientRect();
        return [c.clientX - h.left - b.clientLeft, c.clientY - h.top - b.clientTop]
    }

    function va(a) {
        return a > 0 ? 1 : a < 0 ? -1 : 0
    }

    function wa(a) {
        return a > 1 ? 0 : a < -1 ? oa : Math.acos(a)
    }

    function xa(a) {
        return a > 1 ? qa : a < -1 ? -qa : Math.asin(a)
    }

    function ya(a) {
        return ((a = Math.exp(a)) - 1 / a) / 2
    }

    function za(a) {
        return ((a = Math.exp(a)) + 1 / a) / 2
    }

    function Aa(a) {
        return ((a = Math.exp(2 * a)) - 1) / (a + 1)
    }

    function Ba(a) {
        return (a = Math.sin(a / 2)) * a
    }

    function Ia() {
    }

    function Ja(a, b, c) {
        return new Ka(a, b, c)
    }

    function Ka(a, b, c) {
        this.h = a, this.s = b, this.l = c
    }

    function Ma(a, b, c) {
        function f(a) {
            return a > 360 ? a -= 360 : a < 0 && (a += 360), a < 60 ? d + (e - d) * a / 60 : a < 180 ? e : a < 240 ? d + (e - d) * (240 - a) / 60 : d
        }

        function g(a) {
            return Math.round(255 * f(a))
        }

        var d, e;
        return a = isNaN(a) ? 0 : (a %= 360) < 0 ? a + 360 : a, b = isNaN(b) ? 0 : b < 0 ? 0 : b > 1 ? 1 : b, c = c < 0 ? 0 : c > 1 ? 1 : c, e = c <= .5 ? c * (1 + b) : c + b - c * b, d = 2 * c - e, db(g(a + 120), g(a), g(a - 120))
    }

    function Na(a, b, c) {
        return new Oa(a, b, c)
    }

    function Oa(a, b, c) {
        this.h = a, this.c = b, this.l = c
    }

    function Qa(a, b, c) {
        return isNaN(a) && (a = 0), isNaN(b) && (b = 0), Ra(c, Math.cos(a *= ta) * b, Math.sin(a) * b)
    }

    function Ra(a, b, c) {
        return new Sa(a, b, c)
    }

    function Sa(a, b, c) {
        this.l = a, this.a = b, this.b = c
    }

    function Ya(a, b, c) {
        var d = (a + 16) / 116, e = d + b / 500, f = d - c / 200;
        return e = $a(e) * Ua, d = $a(d) * Va, f = $a(f) * Wa, db(ab(3.2404542 * e - 1.5371385 * d - .4985314 * f), ab(-.969266 * e + 1.8760108 * d + .041556 * f), ab(.0556434 * e - .2040259 * d + 1.0572252 * f))
    }

    function Za(a, b, c) {
        return a > 0 ? Na(Math.atan2(c, b) * ua, Math.sqrt(b * b + c * c), a) : Na(NaN, NaN, a)
    }

    function $a(a) {
        return a > .206893034 ? a * a * a : (a - 4 / 29) / 7.787037
    }

    function _a(a) {
        return a > .008856 ? Math.pow(a, 1 / 3) : 7.787037 * a + 4 / 29
    }

    function ab(a) {
        return Math.round(255 * (a <= .00304 ? 12.92 * a : 1.055 * Math.pow(a, 1 / 2.4) - .055))
    }

    function bb(a) {
        return db(a >> 16, a >> 8 & 255, 255 & a)
    }

    function cb(a) {
        return bb(a) + ""
    }

    function db(a, b, c) {
        return new eb(a, b, c)
    }

    function eb(a, b, c) {
        this.r = a, this.g = b, this.b = c
    }

    function gb(a) {
        return a < 16 ? "0" + Math.max(0, a).toString(16) : Math.min(255, a).toString(16)
    }

    function hb(a, b, c) {
        var g, h, i, d = 0, e = 0, f = 0;
        if (g = /([a-z]+)\((.*)\)/i.exec(a))switch (h = g[2].split(","), g[1]) {
            case"hsl":
                return c(parseFloat(h[0]), parseFloat(h[1]) / 100, parseFloat(h[2]) / 100);
            case"rgb":
                return b(lb(h[0]), lb(h[1]), lb(h[2]))
        }
        return (i = mb.get(a)) ? b(i.r, i.g, i.b) : (null != a && "#" === a.charAt(0) && (4 === a.length ? (d = a.charAt(1), d += d, e = a.charAt(2), e += e, f = a.charAt(3), f += f) : 7 === a.length && (d = a.substring(1, 3), e = a.substring(3, 5), f = a.substring(5, 7)), d = parseInt(d, 16), e = parseInt(e, 16), f = parseInt(f, 16)), b(d, e, f))
    }

    function ib(a, b, c) {
        var g, h, d = Math.min(a /= 255, b /= 255, c /= 255), e = Math.max(a, b, c), f = e - d, i = (e + d) / 2;
        return f ? (h = i < .5 ? f / (e + d) : f / (2 - e - d), g = a == e ? (b - c) / f + (b < c ? 6 : 0) : b == e ? (c - a) / f + 2 : (a - b) / f + 4, g *= 60) : (g = NaN, h = i > 0 && i < 1 ? 0 : g), Ja(g, h, i)
    }

    function jb(a, b, c) {
        a = kb(a), b = kb(b), c = kb(c);
        var d = _a((.4124564 * a + .3575761 * b + .1804375 * c) / Ua), e = _a((.2126729 * a + .7151522 * b + .072175 * c) / Va), f = _a((.0193339 * a + .119192 * b + .9503041 * c) / Wa);
        return Ra(116 * e - 16, 500 * (d - e), 200 * (e - f))
    }

    function kb(a) {
        return (a /= 255) <= .04045 ? a / 12.92 : Math.pow((a + .055) / 1.055, 2.4)
    }

    function lb(a) {
        var b = parseFloat(a);
        return "%" === a.charAt(a.length - 1) ? Math.round(2.55 * b) : b
    }

    function nb(a) {
        return "function" == typeof a ? a : function () {
            return a
        }
    }

    function ob(a) {
        return a
    }

    function pb(a) {
        return function (b, c, d) {
            return 2 === arguments.length && "function" == typeof c && (d = c, c = null), qb(b, c, a, d)
        }
    }

    function qb(b, d, e, g) {
        function m() {
            var b, a = k.status;
            if (!a && k.responseText || a >= 200 && a < 300 || 304 === a) {
                try {
                    b = e.call(h, k)
                } catch (a) {
                    return void i.error.call(h, a)
                }
                i.load.call(h, b)
            } else i.error.call(h, k)
        }

        var h = {}, i = a.dispatch("beforesend", "progress", "load", "error"), j = {}, k = new XMLHttpRequest, l = null;
        return !f.XDomainRequest || "withCredentials"in k || !/^(http(s)?:)?\/\//.test(b) || (k = new XDomainRequest), "onload"in k ? k.onload = k.onerror = m : k.onreadystatechange = function () {
            k.readyState > 3 && m()
        }, k.onprogress = function (b) {
            var c = a.event;
            a.event = b;
            try {
                i.progress.call(h, k)
            } finally {
                a.event = c
            }
        }, h.header = function (a, b) {
            return a = (a + "").toLowerCase(), arguments.length < 2 ? j[a] : (null == b ? delete j[a] : j[a] = b + "", h)
        }, h.mimeType = function (a) {
            return arguments.length ? (d = null == a ? null : a + "", h) : d
        }, h.responseType = function (a) {
            return arguments.length ? (l = a, h) : l
        }, h.response = function (a) {
            return e = a, h
        }, ["get", "post"].forEach(function (a) {
            h[a] = function () {
                return h.send.apply(h, [a].concat(c(arguments)))
            }
        }), h.send = function (a, c, e) {
            if (2 === arguments.length && "function" == typeof c && (e = c, c = null), k.open(a, b, !0), null == d || "accept"in j || (j.accept = d + ",*/*"), k.setRequestHeader)for (var f in j)k.setRequestHeader(f, j[f]);
            return null != d && k.overrideMimeType && k.overrideMimeType(d), null != l && (k.responseType = l), null != e && h.on("error", e).on("load", function (a) {
                e(null, a)
            }), i.beforesend.call(h, k), k.send(null == c ? null : c), h
        }, h.abort = function () {
            return k.abort(), h
        }, a.rebind(h, i, "on"), null == g ? h : h.get(rb(g))
    }

    function rb(a) {
        return 1 === a.length ? function (b, c) {
            a(null == b ? c : null)
        } : a
    }

    function yb() {
        var a = zb(), b = Ab() - a;
        b > 24 ? (isFinite(b) && (clearTimeout(vb), vb = setTimeout(yb, b)), ub = 0) : (ub = 1, xb(yb))
    }

    function zb() {
        var a = Date.now();
        for (wb = sb; wb;)a >= wb.t && (wb.f = wb.c(a - wb.t)), wb = wb.n;
        return a
    }

    function Ab() {
        for (var a, b = sb, c = 1 / 0; b;)b.f ? b = a ? a.n = b.n : sb = b.n : (b.t < c && (c = b.t), b = (a = b).n);
        return tb = a, c
    }

    function Gb(a, b) {
        var c = Math.pow(10, 3 * o(8 - b));
        return {
            scale: b > 8 ? function (a) {
                return a / c
            } : function (a) {
                return a * c
            }, symbol: a
        }
    }

    function Jb(a, b) {
        return b - (a ? Math.ceil(Math.log(a) / Math.LN10) : 1)
    }

    function Kb(a) {
        return a + ""
    }

    function Nb() {
    }

    function Pb(a, b, c) {
        var d = c.s = a + b, e = d - a, f = d - e;
        c.t = a - f + (b - e)
    }

    function Qb(a, b) {
        a && Sb.hasOwnProperty(a.type) && Sb[a.type](a, b)
    }

    function Tb(a, b, c) {
        var f, d = -1, e = a.length - c;
        for (b.lineStart(); ++d < e;)f = a[d], b.point(f[0], f[1], f[2]);
        b.lineEnd()
    }

    function Ub(a, b) {
        var c = -1, d = a.length;
        for (b.polygonStart(); ++c < d;)Tb(a[c], b, 1);
        b.polygonEnd()
    }

    function Yb() {
        function f(a, b) {
            a *= ta, b = b * ta / 2 + oa / 4;
            var f = a - c, g = Math.cos(b), h = Math.sin(b), i = e * h, j = d * g + i * Math.cos(f), k = i * Math.sin(f);
            Wb.add(Math.atan2(k, j)), c = a, d = g, e = h
        }

        var a, b, c, d, e;
        Xb.point = function (g, h) {
            Xb.point = f, c = (a = g) * ta, d = Math.cos(h = (b = h) * ta / 2 + oa / 4), e = Math.sin(h)
        }, Xb.lineEnd = function () {
            f(a, b)
        }
    }

    function Zb(a) {
        var b = a[0], c = a[1], d = Math.cos(c);
        return [d * Math.cos(b), d * Math.sin(b), Math.sin(c)]
    }

    function $b(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
    }

    function _b(a, b) {
        return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
    }

    function ac(a, b) {
        a[0] += b[0], a[1] += b[1], a[2] += b[2]
    }

    function bc(a, b) {
        return [a[0] * b, a[1] * b, a[2] * b]
    }

    function cc(a) {
        var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
        a[0] /= b, a[1] /= b, a[2] /= b
    }

    function dc(a) {
        return [Math.atan2(a[1], a[0]), xa(a[2])]
    }

    function ec(a, b) {
        return o(a[0] - b[0]) < ra && o(a[1] - b[1]) < ra
    }

    function rc(a, b) {
        a *= ta;
        var c = Math.cos(b *= ta);
        sc(c * Math.cos(a), c * Math.sin(a), Math.sin(b))
    }

    function sc(a, b, c) {
        ++fc, hc += (a - hc) / fc, ic += (b - ic) / fc, jc += (c - jc) / fc
    }

    function tc() {
        function d(d, e) {
            d *= ta;
            var f = Math.cos(e *= ta), g = f * Math.cos(d), h = f * Math.sin(d), i = Math.sin(e), j = Math.atan2(Math.sqrt((j = b * i - c * h) * j + (j = c * g - a * i) * j + (j = a * h - b * g) * j), a * g + b * h + c * i);
            gc += j, kc += j * (a + (a = g)), lc += j * (b + (b = h)), mc += j * (c + (c = i)), sc(a, b, c)
        }

        var a, b, c;
        qc.point = function (e, f) {
            e *= ta;
            var g = Math.cos(f *= ta);
            a = g * Math.cos(e), b = g * Math.sin(e), c = Math.sin(f), qc.point = d, sc(a, b, c)
        }
    }

    function uc() {
        qc.point = rc
    }

    function vc() {
        function f(a, b) {
            a *= ta;
            var f = Math.cos(b *= ta), g = f * Math.cos(a), h = f * Math.sin(a), i = Math.sin(b), j = d * i - e * h, k = e * g - c * i, l = c * h - d * g, m = Math.sqrt(j * j + k * k + l * l), n = c * g + d * h + e * i, o = m && -wa(n) / m, p = Math.atan2(m, n);
            nc += o * j, oc += o * k, pc += o * l, gc += p, kc += p * (c + (c = g)), lc += p * (d + (d = h)), mc += p * (e + (e = i)), sc(c, d, e)
        }

        var a, b, c, d, e;
        qc.point = function (g, h) {
            a = g, b = h, qc.point = f, g *= ta;
            var i = Math.cos(h *= ta);
            c = i * Math.cos(g), d = i * Math.sin(g), e = Math.sin(h), sc(c, d, e)
        }, qc.lineEnd = function () {
            f(a, b), qc.lineEnd = uc, qc.point = rc
        }
    }

    function wc() {
        return !0
    }

    function xc(a, b, c, d, e) {
        var f = [], g = [];
        if (a.forEach(function (a) {
                if (!((b = a.length - 1) <= 0)) {
                    var b, c = a[0], d = a[b];
                    if (ec(c, d)) {
                        e.lineStart();
                        for (var h = 0; h < b; ++h)e.point((c = a[h])[0], c[1]);
                        return void e.lineEnd()
                    }
                    var i = new zc(c, a, null, !0), j = new zc(c, null, i, !1);
                    i.o = j, f.push(i), g.push(j), i = new zc(d, a, null, !1), j = new zc(d, null, i, !0), i.o = j, f.push(i), g.push(j)
                }
            }), g.sort(b), yc(f), yc(g), f.length) {
            for (var h = 0, i = c, j = g.length; h < j; ++h)g[h].e = i = !i;
            for (var l, m, k = f[0]; ;) {
                for (var n = k, o = !0; n.v;)if ((n = n.n) === k)return;
                l = n.z, e.lineStart();
                do {
                    if (n.v = n.o.v = !0, n.e) {
                        if (o)for (var h = 0, j = l.length; h < j; ++h)e.point((m = l[h])[0], m[1]); else d(n.x, n.n.x, 1, e);
                        n = n.n
                    } else {
                        if (o) {
                            l = n.p.z;
                            for (var h = l.length - 1; h >= 0; --h)e.point((m = l[h])[0], m[1])
                        } else d(n.x, n.p.x, -1, e);
                        n = n.p
                    }
                    n = n.o, l = n.z, o = !o
                } while (!n.v);
                e.lineEnd()
            }
        }
    }

    function yc(a) {
        if (b = a.length) {
            for (var b, e, c = 0, d = a[0]; ++c < b;)d.n = e = a[c], e.p = d, d = e;
            d.n = e = a[0], e.p = d
        }
    }

    function zc(a, b, c, d) {
        this.x = a, this.z = b, this.o = c, this.e = d, this.v = !1, this.n = this.p = null
    }

    function Ac(b, c, d, e) {
        return function (f, g) {
            function k(a, c) {
                var d = f(a, c);
                b(a = d[0], c = d[1]) && g.point(a, c)
            }

            function l(a, b) {
                var c = f(a, b);
                h.point(c[0], c[1])
            }

            function m() {
                j.point = l, h.lineStart()
            }

            function n() {
                j.point = k, h.lineEnd()
            }

            function t(a, b) {
                s.push([a, b]);
                var c = f(a, b);
                q.point(c[0], c[1])
            }

            function u() {
                q.lineStart(), s = []
            }

            function v() {
                t(s[0][0], s[0][1]), q.lineEnd();
                var c, a = q.clean(), b = p.buffer(), d = b.length;
                if (s.pop(), r.push(s), s = null, d) {
                    if (1 & a) {
                        c = b[0];
                        var f, d = c.length - 1, e = -1;
                        for (g.lineStart(); ++e < d;)g.point((f = c[e])[0], f[1]);
                        return void g.lineEnd()
                    }
                    d > 1 && 2 & a && b.push(b.pop().concat(b.shift())), o.push(b.filter(Bc))
                }
            }

            var o, r, s, h = c(g), i = f.invert(e[0], e[1]), j = {
                point: k,
                lineStart: m,
                lineEnd: n,
                polygonStart: function () {
                    j.point = t, j.lineStart = u, j.lineEnd = v, o = [], r = [], g.polygonStart()
                },
                polygonEnd: function () {
                    j.point = k, j.lineStart = m, j.lineEnd = n, o = a.merge(o);
                    var b = Ec(i, r);
                    o.length ? xc(o, Dc, b, d, g) : b && (g.lineStart(), d(null, null, 1, g), g.lineEnd()), g.polygonEnd(), o = r = null
                },
                sphere: function () {
                    g.polygonStart(), g.lineStart(), d(null, null, 1, g), g.lineEnd(), g.polygonEnd()
                }
            }, p = Cc(), q = c(p);
            return j
        }
    }

    function Bc(a) {
        return a.length > 1
    }

    function Cc() {
        var b, a = [];
        return {
            lineStart: function () {
                a.push(b = [])
            }, point: function (a, c) {
                b.push([a, c])
            }, lineEnd: y, buffer: function () {
                var c = a;
                return a = [], b = null, c
            }, rejoin: function () {
                a.length > 1 && a.push(a.pop().concat(a.shift()))
            }
        }
    }

    function Dc(a, b) {
        return ((a = a.x)[0] < 0 ? a[1] - qa - ra : qa - a[1]) - ((b = b.x)[0] < 0 ? b[1] - qa - ra : qa - b[1])
    }

    function Ec(a, b) {
        var c = a[0], d = a[1], e = [Math.sin(c), -Math.cos(c), 0], f = 0, g = 0;
        Wb.reset();
        for (var h = 0, i = b.length; h < i; ++h) {
            var j = b[h], k = j.length;
            if (k)for (var l = j[0], m = l[0], n = l[1] / 2 + oa / 4, p = Math.sin(n), q = Math.cos(n), r = 1; ;) {
                r === k && (r = 0), a = j[r];
                var s = a[0], t = a[1] / 2 + oa / 4, u = Math.sin(t), v = Math.cos(t), w = s - m, x = o(w) > oa, y = p * u;
                if (Wb.add(Math.atan2(y * Math.sin(w), q * v + y * Math.cos(w))), f += x ? w + (w >= 0 ? pa : -pa) : w, x ^ m >= c ^ s >= c) {
                    var z = _b(Zb(l), Zb(a));
                    cc(z);
                    var A = _b(e, z);
                    cc(A);
                    var B = (x ^ w >= 0 ? -1 : 1) * xa(A[2]);
                    (d > B || d === B && (z[0] || z[1])) && (g += x ^ w >= 0 ? 1 : -1)
                }
                if (!r++)break;
                m = s, p = u, q = v, l = a
            }
        }
        return (f < -ra || f < ra && Wb < 0) ^ 1 & g
    }

    function Gc(a) {
        var e, b = NaN, c = NaN, d = NaN;
        return {
            lineStart: function () {
                a.lineStart(), e = 1
            }, point: function (f, g) {
                var h = f > 0 ? oa : -oa, i = o(f - b);
                o(i - oa) < ra ? (a.point(b, c = (c + g) / 2 > 0 ? qa : -qa), a.point(d, c), a.lineEnd(), a.lineStart(), a.point(h, c), a.point(f, c), e = 0) : d !== h && i >= oa && (o(b - d) < ra && (b -= d * ra), o(f - h) < ra && (f -= h * ra), c = Hc(b, c, f, g), a.point(d, c), a.lineEnd(), a.lineStart(), a.point(h, c), e = 0), a.point(b = f, c = g), d = h
            }, lineEnd: function () {
                a.lineEnd(), b = c = NaN
            }, clean: function () {
                return 2 - e
            }
        }
    }

    function Hc(a, b, c, d) {
        var e, f, g = Math.sin(a - c);
        return o(g) > ra ? Math.atan((Math.sin(b) * (f = Math.cos(d)) * Math.sin(c) - Math.sin(d) * (e = Math.cos(b)) * Math.sin(a)) / (e * f * g)) : (b + d) / 2
    }

    function Ic(a, b, c, d) {
        var e;
        if (null == a)e = c * qa, d.point(-oa, e), d.point(0, e), d.point(oa, e), d.point(oa, 0), d.point(oa, -e), d.point(0, -e), d.point(-oa, -e), d.point(-oa, 0), d.point(-oa, e); else if (o(a[0] - b[0]) > ra) {
            var f = a[0] < b[0] ? oa : -oa;
            e = c * f / 2, d.point(-f, e), d.point(0, e), d.point(f, e)
        } else d.point(b[0], b[1])
    }

    function Jc(a) {
        function f(a, c) {
            return Math.cos(a) * Math.cos(c) > b
        }

        function g(a) {
            var b, e, g, j, k;
            return {
                lineStart: function () {
                    j = g = !1, k = 1
                }, point: function (l, m) {
                    var o, n = [l, m], p = f(l, m), q = c ? p ? 0 : i(l, m) : p ? i(l + (l < 0 ? oa : -oa), m) : 0;
                    if (!b && (j = g = p) && a.lineStart(), p !== g && (o = h(b, n), (ec(b, o) || ec(n, o)) && (n[0] += ra, n[1] += ra, p = f(n[0], n[1]))), p !== g)k = 0, p ? (a.lineStart(), o = h(n, b), a.point(o[0], o[1])) : (o = h(b, n), a.point(o[0], o[1]), a.lineEnd()), b = o; else if (d && b && c ^ p) {
                        var r;
                        q & e || !(r = h(n, b, !0)) || (k = 0, c ? (a.lineStart(), a.point(r[0][0], r[0][1]), a.point(r[1][0], r[1][1]), a.lineEnd()) : (a.point(r[1][0], r[1][1]), a.lineEnd(), a.lineStart(), a.point(r[0][0], r[0][1])))
                    }
                    !p || b && ec(b, n) || a.point(n[0], n[1]), b = n, g = p, e = q
                }, lineEnd: function () {
                    g && a.lineEnd(), b = null
                }, clean: function () {
                    return k | (j && g) << 1
                }
            }
        }

        function h(a, c, d) {
            var e = Zb(a), f = Zb(c), g = [1, 0, 0], h = _b(e, f), i = $b(h, h), j = h[0], k = i - j * j;
            if (!k)return !d && a;
            var l = b * i / k, m = -b * j / k, n = _b(g, h), p = bc(g, l), q = bc(h, m);
            ac(p, q);
            var r = n, s = $b(p, r), t = $b(r, r), u = s * s - t * ($b(p, p) - 1);
            if (!(u < 0)) {
                var v = Math.sqrt(u), w = bc(r, (-s - v) / t);
                if (ac(w, p), w = dc(w), !d)return w;
                var B, x = a[0], y = c[0], z = a[1], A = c[1];
                y < x && (B = x, x = y, y = B);
                var C = y - x, D = o(C - oa) < ra, E = D || C < ra;
                if (!D && A < z && (B = z, z = A, A = B), E ? D ? z + A > 0 ^ w[1] < (o(w[0] - x) < ra ? z : A) : z <= w[1] && w[1] <= A : C > oa ^ (x <= w[0] && w[0] <= y)) {
                    var F = bc(r, (-s + v) / t);
                    return ac(F, p), [w, dc(F)]
                }
            }
        }

        function i(b, d) {
            var e = c ? a : oa - a, f = 0;
            return b < -e ? f |= 1 : b > e && (f |= 2), d < -e ? f |= 4 : d > e && (f |= 8), f
        }

        var b = Math.cos(a), c = b > 0, d = o(b) > ra, e = td(a, 6 * ta);
        return Ac(f, g, e, c ? [0, -a] : [-oa, a - oa])
    }

    function Kc(a, b, c, d) {
        return function (e) {
            var p, f = e.a, g = e.b, h = f.x, i = f.y, j = g.x, k = g.y, l = 0, m = 1, n = j - h, o = k - i;
            if (p = a - h, n || !(p > 0)) {
                if (p /= n, n < 0) {
                    if (p < l)return;
                    p < m && (m = p)
                } else if (n > 0) {
                    if (p > m)return;
                    p > l && (l = p)
                }
                if (p = c - h, n || !(p < 0)) {
                    if (p /= n, n < 0) {
                        if (p > m)return;
                        p > l && (l = p)
                    } else if (n > 0) {
                        if (p < l)return;
                        p < m && (m = p)
                    }
                    if (p = b - i, o || !(p > 0)) {
                        if (p /= o, o < 0) {
                            if (p < l)return;
                            p < m && (m = p)
                        } else if (o > 0) {
                            if (p > m)return;
                            p > l && (l = p)
                        }
                        if (p = d - i, o || !(p < 0)) {
                            if (p /= o, o < 0) {
                                if (p > m)return;
                                p > l && (l = p)
                            } else if (o > 0) {
                                if (p < l)return;
                                p < m && (m = p)
                            }
                            return l > 0 && (e.a = {x: h + l * n, y: i + l * o}), m < 1 && (e.b = {
                                x: h + m * n,
                                y: i + m * o
                            }), e
                        }
                    }
                }
            }
        }
    }

    function Mc(b, c, d, e) {
        function f(a, e) {
            return o(a[0] - b) < ra ? e > 0 ? 0 : 3 : o(a[0] - d) < ra ? e > 0 ? 2 : 1 : o(a[1] - c) < ra ? e > 0 ? 1 : 0 : e > 0 ? 3 : 2
        }

        function g(a, b) {
            return h(a.x, b.x)
        }

        function h(a, b) {
            var c = f(a, 1), d = f(b, 1);
            return c !== d ? c - d : 0 === c ? b[1] - a[1] : 1 === c ? a[0] - b[0] : 2 === c ? a[1] - b[1] : b[0] - a[0]
        }

        return function (i) {
            function q(a) {
                for (var b = 0, c = n.length, d = a[1], e = 0; e < c; ++e)for (var j, f = 1, g = n[e], h = g.length, i = g[0]; f < h; ++f)j = g[f], i[1] <= d ? j[1] > d && r(i, j, a) > 0 && ++b : j[1] <= d && r(i, j, a) < 0 && --b, i = j;
                return 0 !== b
            }

            function r(a, b, c) {
                return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])
            }

            function s(a, g, i, j) {
                var k = 0, l = 0;
                if (null == a || (k = f(a, i)) !== (l = f(g, i)) || h(a, g) < 0 ^ i > 0) {
                    do j.point(0 === k || 3 === k ? b : d, k > 1 ? e : c); while ((k = (k + i + 4) % 4) !== l)
                } else j.point(g[0], g[1])
            }

            function t(a, f) {
                return b <= a && a <= d && c <= f && f <= e
            }

            function u(a, b) {
                t(a, b) && i.point(a, b)
            }

            function D() {
                p.point = F, n && n.push(o = []), B = !0, A = !1, y = z = NaN
            }

            function E() {
                m && (F(v, w), x && A && k.rejoin(), m.push(k.buffer())), p.point = u, A && i.lineEnd()
            }

            function F(a, b) {
                a = Math.max(-Lc, Math.min(Lc, a)), b = Math.max(-Lc, Math.min(Lc, b));
                var c = t(a, b);
                if (n && o.push([a, b]), B)v = a, w = b, x = c, B = !1, c && (i.lineStart(), i.point(a, b)); else if (c && A)i.point(a, b); else {
                    var d = {a: {x: y, y: z}, b: {x: a, y: b}};
                    l(d) ? (A || (i.lineStart(), i.point(d.a.x, d.a.y)), i.point(d.b.x, d.b.y), c || i.lineEnd(), C = !1) : c && (i.lineStart(), i.point(a, b), C = !1)
                }
                y = a, z = b, A = c
            }

            var m, n, o, v, w, x, y, z, A, B, C, j = i, k = Cc(), l = Kc(b, c, d, e), p = {
                point: u,
                lineStart: D,
                lineEnd: E,
                polygonStart: function () {
                    i = k, m = [], n = [], C = !0
                },
                polygonEnd: function () {
                    i = j, m = a.merge(m);
                    var c = q([b, e]), d = C && c, f = m.length;
                    (d || f) && (i.polygonStart(), d && (i.lineStart(), s(null, null, 1, i), i.lineEnd()), f && xc(m, g, c, s, i), i.polygonEnd()), m = n = o = null
                }
            };
            return p
        }
    }

    function Nc(a, b) {
        function c(c, d) {
            return c = a(c, d), b(c[0], c[1])
        }

        return a.invert && b.invert && (c.invert = function (c, d) {
            return c = b.invert(c, d), c && a.invert(c[0], c[1])
        }), c
    }

    function Oc(a) {
        var b = 0, c = oa / 3, d = ld(a), e = d(b, c);
        return e.parallels = function (a) {
            return arguments.length ? d(b = a[0] * oa / 180, c = a[1] * oa / 180) : [b / oa * 180, c / oa * 180]
        }, e
    }

    function Pc(a, b) {
        function g(a, b) {
            var c = Math.sqrt(e - 2 * d * Math.sin(b)) / d;
            return [c * Math.sin(a *= d), f - c * Math.cos(a)]
        }

        var c = Math.sin(a), d = (c + Math.sin(b)) / 2, e = 1 + c * (2 * d - c), f = Math.sqrt(e) / d;
        return g.invert = function (a, b) {
            var c = f - b;
            return [Math.atan2(a, c) / d, xa((e - (a * a + c * c) * d * d) / (2 * d))]
        }, g
    }

    function Tc() {
        function e(a, b) {
            Rc += d * a - c * b, c = a, d = b
        }

        var a, b, c, d;
        Sc.point = function (f, g) {
            Sc.point = e, a = c = f, b = d = g
        }, Sc.lineEnd = function () {
            e(a, b)
        }
    }

    function Zc(a, b) {
        a < Uc && (Uc = a), a > Wc && (Wc = a), b < Vc && (Vc = b), b > Xc && (Xc = b)
    }

    function $c() {
        function d(c, d) {
            b.push("M", c, ",", d, a)
        }

        function e(a, d) {
            b.push("M", a, ",", d), c.point = f
        }

        function f(a, c) {
            b.push("L", a, ",", c)
        }

        function g() {
            c.point = d
        }

        function h() {
            b.push("Z")
        }

        var a = _c(4.5), b = [], c = {
            point: d, lineStart: function () {
                c.point = e
            }, lineEnd: g, polygonStart: function () {
                c.lineEnd = h
            }, polygonEnd: function () {
                c.lineEnd = g, c.point = d
            }, pointRadius: function (b) {
                return a = _c(b), c
            }, result: function () {
                if (b.length) {
                    var a = b.join("");
                    return b = [], a
                }
            }
        };
        return c
    }

    function _c(a) {
        return "m0," + a + "a" + a + "," + a + " 0 1,1 0," + -2 * a + "a" + a + "," + a + " 0 1,1 0," + 2 * a + "z"
    }

    function bd(a, b) {
        hc += a, ic += b, ++jc
    }

    function cd() {
        function c(c, d) {
            var e = c - a, f = d - b, g = Math.sqrt(e * e + f * f);
            kc += g * (a + c) / 2, lc += g * (b + d) / 2, mc += g, bd(a = c, b = d)
        }

        var a, b;
        ad.point = function (d, e) {
            ad.point = c, bd(a = d, b = e)
        }
    }

    function dd() {
        ad.point = bd
    }

    function ed() {
        function e(a, b) {
            var e = a - c, f = b - d, g = Math.sqrt(e * e + f * f);
            kc += g * (c + a) / 2, lc += g * (d + b) / 2, mc += g, g = d * a - c * b, nc += g * (c + a), oc += g * (d + b), pc += 3 * g, bd(c = a, d = b)
        }

        var a, b, c, d;
        ad.point = function (f, g) {
            ad.point = e, bd(a = c = f, b = d = g)
        }, ad.lineEnd = function () {
            e(a, b)
        }
    }

    function fd(a) {
        function d(c, d) {
            a.moveTo(c, d), a.arc(c, d, b, 0, pa)
        }

        function e(b, d) {
            a.moveTo(b, d), c.point = f
        }

        function f(b, c) {
            a.lineTo(b, c)
        }

        function g() {
            c.point = d
        }

        function h() {
            a.closePath()
        }

        var b = 4.5, c = {
            point: d, lineStart: function () {
                c.point = e
            }, lineEnd: g, polygonStart: function () {
                c.lineEnd = h
            }, polygonEnd: function () {
                c.lineEnd = g, c.point = d
            }, pointRadius: function (a) {
                return b = a, c
            }, result: y
        };
        return c
    }

    function gd(a) {
        function e(a) {
            return (d ? g : f)(a)
        }

        function f(b) {
            return jd(b, function (c, d) {
                c = a(c, d), b.point(c[0], c[1])
            })
        }

        function g(b) {
            function s(c, d) {
                c = a(c, d), b.point(c[0], c[1])
            }

            function t() {
                m = NaN, r.point = u, b.lineStart()
            }

            function u(c, e) {
                var f = Zb([c, e]), g = a(c, e);
                h(m, n, l, o, p, q, m = g[0], n = g[1], l = c, o = f[0], p = f[1], q = f[2], d, b), b.point(m, n)
            }

            function v() {
                r.point = s, b.lineEnd()
            }

            function w() {
                t(), r.point = x, r.lineEnd = y
            }

            function x(a, b) {
                u(c = a, e = b), f = m, g = n, i = o, j = p, k = q, r.point = u
            }

            function y() {
                h(m, n, l, o, p, q, f, g, c, i, j, k, d, b), r.lineEnd = v, v()
            }

            var c, e, f, g, i, j, k, l, m, n, o, p, q, r = {
                point: s,
                lineStart: t,
                lineEnd: v,
                polygonStart: function () {
                    b.polygonStart(), r.lineStart = w
                },
                polygonEnd: function () {
                    b.polygonEnd(), r.lineStart = t
                }
            };
            return r
        }

        function h(d, e, f, g, i, j, k, l, m, n, p, q, r, s) {
            var t = k - d, u = l - e, v = t * t + u * u;
            if (v > 4 * b && r--) {
                var w = g + n, x = i + p, y = j + q, z = Math.sqrt(w * w + x * x + y * y), A = Math.asin(y /= z), B = o(o(y) - 1) < ra || o(f - m) < ra ? (f + m) / 2 : Math.atan2(x, w), C = a(B, A), D = C[0], E = C[1], F = D - d, G = E - e, H = u * F - t * G;
                (H * H / v > b || o((t * F + u * G) / v - .5) > .3 || g * n + i * p + j * q < c) && (h(d, e, f, g, i, j, D, E, B, w /= z, x /= z, y, r, s), s.point(D, E), h(D, E, B, w, x, y, k, l, m, n, p, q, r, s))
            }
        }

        var b = .5, c = Math.cos(30 * ta), d = 16;
        return e.precision = function (a) {
            return arguments.length ? (d = (b = a * a) > 0 && 16, e) : Math.sqrt(b)
        }, e
    }

    function hd(a) {
        var b = gd(function (b, c) {
            return a([b * ua, c * ua])
        });
        return function (a) {
            return md(b(a))
        }
    }

    function id(a) {
        this.stream = a
    }

    function jd(a, b) {
        return {
            point: b, sphere: function () {
                a.sphere()
            }, lineStart: function () {
                a.lineStart()
            }, lineEnd: function () {
                a.lineEnd()
            }, polygonStart: function () {
                a.polygonStart()
            }, polygonEnd: function () {
                a.polygonEnd()
            }
        }
    }

    function kd(a) {
        return ld(function () {
            return a
        })()
    }

    function ld(b) {
        function v(a) {
            return a = e(a[0] * ta, a[1] * ta), [a[0] * g + o, p - a[1] * g]
        }

        function w(a) {
            return a = e.invert((a[0] - o) / g, (p - a[1]) / g), a && [a[0] * ua, a[1] * ua]
        }

        function x() {
            e = Nc(d = pd(l, m, n), c);
            var a = c(j, k);
            return o = h - a[0] * g, p = i + a[1] * g, y()
        }

        function y() {
            return u && (u.valid = !1, u = null), v
        }

        var c, d, e, o, p, u, f = gd(function (a, b) {
            return a = c(a, b), [a[0] * g + o, p - a[1] * g]
        }), g = 150, h = 480, i = 250, j = 0, k = 0, l = 0, m = 0, n = 0, q = Fc, r = ob, s = null, t = null;
        return v.stream = function (a) {
            return u && (u.valid = !1), u = md(q(d, f(r(a)))), u.valid = !0, u
        }, v.clipAngle = function (a) {
            return arguments.length ? (q = null == a ? (s = a, Fc) : Jc((s = +a) * ta), y()) : s
        }, v.clipExtent = function (a) {
            return arguments.length ? (t = a, r = a ? Mc(a[0][0], a[0][1], a[1][0], a[1][1]) : ob, y()) : t
        }, v.scale = function (a) {
            return arguments.length ? (g = +a, x()) : g
        }, v.translate = function (a) {
            return arguments.length ? (h = +a[0], i = +a[1], x()) : [h, i]
        }, v.center = function (a) {
            return arguments.length ? (j = a[0] % 360 * ta, k = a[1] % 360 * ta, x()) : [j * ua, k * ua]
        }, v.rotate = function (a) {
            return arguments.length ? (l = a[0] % 360 * ta, m = a[1] % 360 * ta, n = a.length > 2 ? a[2] % 360 * ta : 0, x()) : [l * ua, m * ua, n * ua]
        }, a.rebind(v, f, "precision"), function () {
            return c = b.apply(this, arguments), v.invert = c.invert && w, x()
        }
    }

    function md(a) {
        return jd(a, function (b, c) {
            a.point(b * ta, c * ta)
        })
    }

    function nd(a, b) {
        return [a, b]
    }

    function od(a, b) {
        return [a > oa ? a - pa : a < -oa ? a + pa : a, b]
    }

    function pd(a, b, c) {
        return a ? b || c ? Nc(rd(a), sd(b, c)) : rd(a) : b || c ? sd(b, c) : od
    }

    function qd(a) {
        return function (b, c) {
            return b += a, [b > oa ? b - pa : b < -oa ? b + pa : b, c]
        }
    }

    function rd(a) {
        var b = qd(a);
        return b.invert = qd(-a), b
    }

    function sd(a, b) {
        function g(a, b) {
            var g = Math.cos(b), h = Math.cos(a) * g, i = Math.sin(a) * g, j = Math.sin(b), k = j * c + h * d;
            return [Math.atan2(i * e - k * f, h * c - j * d), xa(k * e + i * f)]
        }

        var c = Math.cos(a), d = Math.sin(a), e = Math.cos(b), f = Math.sin(b);
        return g.invert = function (a, b) {
            var g = Math.cos(b), h = Math.cos(a) * g, i = Math.sin(a) * g, j = Math.sin(b), k = j * e - i * f;
            return [Math.atan2(i * e + j * f, h * c + k * d), xa(k * c - h * d)]
        }, g
    }

    function td(a, b) {
        var c = Math.cos(a), d = Math.sin(a);
        return function (e, f, g, h) {
            var i = g * b;
            null != e ? (e = ud(c, e), f = ud(c, f), (g > 0 ? e < f : e > f) && (e += g * pa)) : (e = a + g * pa, f = a - .5 * i);
            for (var j, k = e; g > 0 ? k > f : k < f; k -= i)h.point((j = dc([c, -d * Math.cos(k), -d * Math.sin(k)]))[0], j[1])
        }
    }

    function ud(a, b) {
        var c = Zb(b);
        c[0] -= a, cc(c);
        var d = wa(-c[1]);
        return ((-c[2] < 0 ? -d : d) + 2 * Math.PI - ra) % (2 * Math.PI)
    }

    function vd(b, c, d) {
        var e = a.range(b, c - ra, d).concat(c);
        return function (a) {
            return e.map(function (b) {
                return [a, b]
            })
        }
    }

    function wd(b, c, d) {
        var e = a.range(b, c - ra, d).concat(c);
        return function (a) {
            return e.map(function (b) {
                return [b, a]
            })
        }
    }

    function xd(a) {
        return a.source
    }

    function yd(a) {
        return a.target
    }

    function zd(a, b, c, d) {
        var e = Math.cos(b), f = Math.sin(b), g = Math.cos(d), h = Math.sin(d), i = e * Math.cos(a), j = e * Math.sin(a), k = g * Math.cos(c), l = g * Math.sin(c), m = 2 * Math.asin(Math.sqrt(Ba(d - b) + e * g * Ba(c - a))), n = 1 / Math.sin(m), o = m ? function (a) {
            var b = Math.sin(a *= m) * n, c = Math.sin(m - a) * n, d = c * i + b * k, e = c * j + b * l, g = c * f + b * h;
            return [Math.atan2(e, d) * ua, Math.atan2(g, Math.sqrt(d * d + e * e)) * ua]
        } : function () {
            return [a * ua, b * ua]
        };
        return o.distance = m, o
    }

    function Cd() {
        function d(d, e) {
            var f = Math.sin(e *= ta), g = Math.cos(e), h = o((d *= ta) - a), i = Math.cos(h);
            Ad += Math.atan2(Math.sqrt((h = g * Math.sin(h)) * h + (h = c * f - b * g * i) * h), b * f + c * g * i), a = d, b = f, c = g
        }

        var a, b, c;
        Bd.point = function (e, f) {
            a = e * ta, b = Math.sin(f *= ta), c = Math.cos(f), Bd.point = d
        }, Bd.lineEnd = function () {
            Bd.point = Bd.lineEnd = y
        }
    }

    function Dd(a, b) {
        function c(b, c) {
            var d = Math.cos(b), e = Math.cos(c), f = a(d * e);
            return [f * e * Math.sin(b), f * Math.sin(c)]
        }

        return c.invert = function (a, c) {
            var d = Math.sqrt(a * a + c * c), e = b(d), f = Math.sin(e), g = Math.cos(e);
            return [Math.atan2(a * f, d * g), Math.asin(d && c * f / d)]
        }, c
    }

    function Gd(a, b) {
        function g(a, b) {
            var c = o(o(b) - qa) < ra ? 0 : f / Math.pow(d(b), e);
            return [c * Math.sin(e * a), f - c * Math.cos(e * a)]
        }

        var c = Math.cos(a), d = function (a) {
            return Math.tan(oa / 4 + a / 2)
        }, e = a === b ? Math.sin(a) : Math.log(c / Math.cos(b)) / Math.log(d(b) / d(a)), f = c * Math.pow(d(a), e) / e;
        return e ? (g.invert = function (a, b) {
            var c = f - b, d = va(e) * Math.sqrt(a * a + c * c);
            return [Math.atan2(a, c) / e, 2 * Math.atan(Math.pow(f / d, 1 / e)) - qa]
        }, g) : Jd
    }

    function Hd(a, b) {
        function f(a, b) {
            var c = e - b;
            return [c * Math.sin(d * a), e - c * Math.cos(d * a)]
        }

        var c = Math.cos(a), d = a === b ? Math.sin(a) : (c - Math.cos(b)) / (b - a), e = c / d + a;
        return o(d) < ra ? nd : (f.invert = function (a, b) {
            var c = e - b;
            return [Math.atan2(a, c) / d, e - va(d) * Math.sqrt(a * a + c * c)]
        }, f)
    }

    function Jd(a, b) {
        return [a, Math.log(Math.tan(oa / 4 + b / 2))]
    }

    function Kd(a) {
        var f, b = kd(a), c = b.scale, d = b.translate, e = b.clipExtent;
        return b.scale = function () {
            var a = c.apply(b, arguments);
            return a === b ? f ? b.clipExtent(null) : b : a
        }, b.translate = function () {
            var a = d.apply(b, arguments);
            return a === b ? f ? b.clipExtent(null) : b : a
        }, b.clipExtent = function (a) {
            var g = e.apply(b, arguments);
            if (g === b) {
                if (f = null == a) {
                    var h = oa * c(), i = d();
                    e([[i[0] - h, i[1] - h], [i[0] + h, i[1] + h]])
                }
            } else f && (g = null);
            return g
        }, b.clipExtent(null)
    }

    function Nd(a, b) {
        return [Math.log(Math.tan(oa / 4 + b / 2)), -a]
    }

    function Od(a) {
        return a[0]
    }

    function Pd(a) {
        return a[1]
    }

    function Qd(a, b, c, d) {
        var e, f, g, h, i, j, k;
        return e = d[a], f = e[0], g = e[1], e = d[b], h = e[0], i = e[1], e = d[c], j = e[0], k = e[1], (k - g) * (h - f) - (i - g) * (j - f) > 0
    }

    function Sd(a, b, c) {
        return (c[0] - b[0]) * (a[1] - b[1]) < (c[1] - b[1]) * (a[0] - b[0])
    }

    function Td(a, b, c, d) {
        var e = a[0], f = c[0], g = b[0] - e, h = d[0] - f, i = a[1], j = c[1], k = b[1] - i, l = d[1] - j, m = (h * (i - j) - l * (e - f)) / (l * g - h * k);
        return [e + m * g, i + m * k]
    }

    function Ud(a) {
        var b = a[0], c = a[a.length - 1];
        return !(b[0] - c[0] || b[1] - c[1])
    }

    function ae() {
        ve(this), this.edge = this.site = this.circle = null
    }

    function be(a) {
        var b = Yd.pop() || new ae;
        return b.site = a, b
    }

    function ce(a) {
        me(a), Xd.remove(a), Yd.push(a), ve(a)
    }

    function de(a) {
        var b = a.circle, c = b.x, d = b.cy, e = {x: c, y: d}, f = a.P, g = a.N, h = [a];
        ce(a);
        for (var i = f; i.circle && o(c - i.circle.x) < ra && o(d - i.circle.cy) < ra;)f = i.P, h.unshift(i), ce(i), i = f;
        h.unshift(i), me(i);
        for (var j = g; j.circle && o(c - j.circle.x) < ra && o(d - j.circle.cy) < ra;)g = j.N, h.push(j), ce(j), j = g;
        h.push(j), me(j);
        var l, k = h.length;
        for (l = 1; l < k; ++l)j = h[l], i = h[l - 1], se(j.edge, i.site, j.site, e);
        i = h[0], j = h[k - 1], j.edge = qe(i.site, j.site, null, e), le(i), le(j)
    }

    function ee(a) {
        for (var d, e, f, g, b = a.x, c = a.y, h = Xd._; h;)if (f = fe(h, c) - b, f > ra)h = h.L; else {
            if (g = b - ge(h, c), !(g > ra)) {
                f > -ra ? (d = h.P, e = h) : g > -ra ? (d = h, e = h.N) : d = e = h;
                break
            }
            if (!h.R) {
                d = h;
                break
            }
            h = h.R
        }
        var i = be(a);
        if (Xd.insert(d, i), d || e) {
            if (d === e)return me(d), e = be(d.site), Xd.insert(i, e), i.edge = e.edge = qe(d.site, i.site), le(d), void le(e);
            if (!e)return void(i.edge = qe(d.site, i.site));
            me(d), me(e);
            var j = d.site, k = j.x, l = j.y, m = a.x - k, n = a.y - l, o = e.site, p = o.x - k, q = o.y - l, r = 2 * (m * q - n * p), s = m * m + n * n, t = p * p + q * q, u = {
                x: (q * s - n * t) / r + k,
                y: (m * t - p * s) / r + l
            };
            se(e.edge, j, o, u), i.edge = qe(j, a, null, u), e.edge = qe(a, o, null, u), le(d), le(e)
        }
    }

    function fe(a, b) {
        var c = a.site, d = c.x, e = c.y, f = e - b;
        if (!f)return d;
        var g = a.P;
        if (!g)return -(1 / 0);
        c = g.site;
        var h = c.x, i = c.y, j = i - b;
        if (!j)return h;
        var k = h - d, l = 1 / f - 1 / j, m = k / j;
        return l ? (-m + Math.sqrt(m * m - 2 * l * (k * k / (-2 * j) - i + j / 2 + e - f / 2))) / l + d : (d + h) / 2
    }

    function ge(a, b) {
        var c = a.N;
        if (c)return fe(c, b);
        var d = a.site;
        return d.y === b ? d.x : 1 / 0
    }

    function he(a) {
        this.site = a, this.edges = []
    }

    function ie(a) {
        for (var f, g, h, i, l, m, n, p, q, r, b = a[0][0], c = a[1][0], d = a[0][1], e = a[1][1], j = Wd, k = j.length; k--;)if (l = j[k], l && l.prepare())for (n = l.edges, p = n.length, m = 0; m < p;)r = n[m].end(), h = r.x, i = r.y, q = n[++m % p].start(), f = q.x, g = q.y, (o(h - f) > ra || o(i - g) > ra) && (n.splice(m, 0, new te(re(l.site, r, o(h - b) < ra && e - i > ra ? {
            x: b,
            y: o(f - b) < ra ? g : e
        } : o(i - e) < ra && c - h > ra ? {x: o(g - e) < ra ? f : c, y: e} : o(h - c) < ra && i - d > ra ? {
            x: c,
            y: o(f - c) < ra ? g : d
        } : o(i - d) < ra && h - b > ra ? {x: o(g - d) < ra ? f : b, y: d} : null), l.site, null)), ++p)
    }

    function je(a, b) {
        return b.angle - a.angle
    }

    function ke() {
        ve(this), this.x = this.y = this.arc = this.site = this.cy = null
    }

    function le(a) {
        var b = a.P, c = a.N;
        if (b && c) {
            var d = b.site, e = a.site, f = c.site;
            if (d !== f) {
                var g = e.x, h = e.y, i = d.x - g, j = d.y - h, k = f.x - g, l = f.y - h, m = 2 * (i * l - j * k);
                if (!(m >= -sa)) {
                    var n = i * i + j * j, o = k * k + l * l, p = (l * n - j * o) / m, q = (i * o - k * n) / m, l = q + h, r = _d.pop() || new ke;
                    r.arc = a, r.site = e, r.x = p + g, r.y = l + Math.sqrt(p * p + q * q), r.cy = l, a.circle = r;
                    for (var s = null, t = $d._; t;)if (r.y < t.y || r.y === t.y && r.x <= t.x) {
                        if (!t.L) {
                            s = t.P;
                            break
                        }
                        t = t.L
                    } else {
                        if (!t.R) {
                            s = t;
                            break
                        }
                        t = t.R
                    }
                    $d.insert(s, r), s || (Zd = r)
                }
            }
        }
    }

    function me(a) {
        var b = a.circle;
        b && (b.P || (Zd = b.N), $d.remove(b), _d.push(b), ve(b), a.circle = null)
    }

    function ne(a) {
        for (var e, b = Vd, c = Kc(a[0][0], a[0][1], a[1][0], a[1][1]), d = b.length; d--;)e = b[d], (!oe(e, a) || !c(e) || o(e.a.x - e.b.x) < ra && o(e.a.y - e.b.y) < ra) && (e.a = e.b = null, b.splice(d, 1))
    }

    function oe(a, b) {
        var c = a.b;
        if (c)return !0;
        var q, r, d = a.a, e = b[0][0], f = b[1][0], g = b[0][1], h = b[1][1], i = a.l, j = a.r, k = i.x, l = i.y, m = j.x, n = j.y, o = (k + m) / 2, p = (l + n) / 2;
        if (n === l) {
            if (o < e || o >= f)return;
            if (k > m) {
                if (d) {
                    if (d.y >= h)return
                } else d = {x: o, y: g};
                c = {x: o, y: h}
            } else {
                if (d) {
                    if (d.y < g)return
                } else d = {x: o, y: h};
                c = {x: o, y: g}
            }
        } else if (q = (k - m) / (n - l), r = p - q * o, q < -1 || q > 1)if (k > m) {
            if (d) {
                if (d.y >= h)return
            } else d = {x: (g - r) / q, y: g};
            c = {x: (h - r) / q, y: h}
        } else {
            if (d) {
                if (d.y < g)return
            } else d = {x: (h - r) / q, y: h};
            c = {x: (g - r) / q, y: g}
        } else if (l < n) {
            if (d) {
                if (d.x >= f)return
            } else d = {x: e, y: q * e + r};
            c = {x: f, y: q * f + r}
        } else {
            if (d) {
                if (d.x < e)return
            } else d = {x: f, y: q * f + r};
            c = {x: e, y: q * e + r}
        }
        return a.a = d, a.b = c, !0
    }

    function pe(a, b) {
        this.l = a, this.r = b, this.a = this.b = null
    }

    function qe(a, b, c, d) {
        var e = new pe(a, b);
        return Vd.push(e), c && se(e, a, b, c), d && se(e, b, a, d), Wd[a.i].edges.push(new te(e, a, b)), Wd[b.i].edges.push(new te(e, b, a)), e
    }

    function re(a, b, c) {
        var d = new pe(a, null);
        return d.a = b, d.b = c, Vd.push(d), d
    }

    function se(a, b, c, d) {
        a.a || a.b ? a.l === c ? a.b = d : a.a = d : (a.a = d, a.l = b, a.r = c)
    }

    function te(a, b, c) {
        var d = a.a, e = a.b;
        this.edge = a, this.site = b, this.angle = c ? Math.atan2(c.y - b.y, c.x - b.x) : a.l === b ? Math.atan2(e.x - d.x, d.y - e.y) : Math.atan2(d.x - e.x, e.y - d.y)
    }

    function ue() {
        this._ = null
    }

    function ve(a) {
        a.U = a.C = a.L = a.R = a.P = a.N = null
    }

    function we(a, b) {
        var c = b, d = b.R, e = c.U;
        e ? e.L === c ? e.L = d : e.R = d : a._ = d, d.U = e, c.U = d, c.R = d.L, c.R && (c.R.U = c), d.L = c
    }

    function xe(a, b) {
        var c = b, d = b.L, e = c.U;
        e ? e.L === c ? e.L = d : e.R = d : a._ = d, d.U = e, c.U = d, c.L = d.R, c.L && (c.L.U = c), d.R = c
    }

    function ye(a) {
        for (; a.L;)a = a.L;
        return a
    }

    function ze(a, b) {
        var d, e, f, c = a.sort(Ae).pop();
        for (Vd = [], Wd = new Array(a.length), Xd = new ue, $d = new ue; ;)if (f = Zd, c && (!f || c.y < f.y || c.y === f.y && c.x < f.x))c.x === d && c.y === e || (Wd[c.i] = new he(c), ee(c), d = c.x, e = c.y), c = a.pop(); else {
            if (!f)break;
            de(f.arc)
        }
        b && (ne(b), ie(b));
        var g = {cells: Wd, edges: Vd};
        return Xd = $d = Vd = Wd = null, g
    }

    function Ae(a, b) {
        return b.y - a.y || b.x - a.x
    }

    function Ce(a, b, c) {
        return (a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y)
    }

    function De(a) {
        return a.x
    }

    function Ee(a) {
        return a.y
    }

    function Fe() {
        return {leaf: !0, nodes: [], point: null, x: null, y: null}
    }

    function Ge(a, b, c, d, e, f) {
        if (!a(b, c, d, e, f)) {
            var g = .5 * (c + e), h = .5 * (d + f), i = b.nodes;
            i[0] && Ge(a, i[0], c, d, g, h), i[1] && Ge(a, i[1], g, d, e, h), i[2] && Ge(a, i[2], c, h, g, f), i[3] && Ge(a, i[3], g, h, e, f)
        }
    }

    function He(b, c) {
        b = a.rgb(b), c = a.rgb(c);
        var d = b.r, e = b.g, f = b.b, g = c.r - d, h = c.g - e, i = c.b - f;
        return function (a) {
            return "#" + gb(Math.round(d + g * a)) + gb(Math.round(e + h * a)) + gb(Math.round(f + i * a))
        }
    }

    function Ie(a, b) {
        var e, c = {}, d = {};
        for (e in a)e in b ? c[e] = Me(a[e], b[e]) : d[e] = a[e];
        for (e in b)e in a || (d[e] = b[e]);
        return function (a) {
            for (e in c)d[e] = c[e](a);
            return d
        }
    }

    function Je(a, b) {
        return b -= a = +a, function (c) {
            return a + b * c
        }
    }

    function Ke(a, b) {
        var c, d, e, j, k, f = 0, g = 0, h = [], i = [];
        for (a += "", b += "", Le.lastIndex = 0, d = 0; c = Le.exec(b); ++d)c.index && h.push(b.substring(f, g = c.index)), i.push({
            i: h.length,
            x: c[0]
        }), h.push(null), f = Le.lastIndex;
        for (f < b.length && h.push(b.substring(f)), d = 0, j = i.length; (c = Le.exec(a)) && d < j; ++d)if (k = i[d], k.x == c[0]) {
            if (k.i)if (null == h[k.i + 1])for (h[k.i - 1] += k.x, h.splice(k.i, 1), e = d + 1; e < j; ++e)i[e].i--; else for (h[k.i - 1] += k.x + h[k.i + 1], h.splice(k.i, 2), e = d + 1; e < j; ++e)i[e].i -= 2; else if (null == h[k.i + 1])h[k.i] = k.x; else for (h[k.i] = k.x + h[k.i + 1], h.splice(k.i + 1, 1), e = d + 1; e < j; ++e)i[e].i--;
            i.splice(d, 1), j--, d--
        } else k.x = Je(parseFloat(c[0]), parseFloat(k.x));
        for (; d < j;)k = i.pop(), null == h[k.i + 1] ? h[k.i] = k.x : (h[k.i] = k.x + h[k.i + 1], h.splice(k.i + 1, 1)), j--;
        return 1 === h.length ? null == h[0] ? (k = i[0].x, function (a) {
            return k(a) + ""
        }) : function () {
            return b
        } : function (a) {
            for (d = 0; d < j; ++d)h[(k = i[d]).i] = k.x(a);
            return h.join("")
        }
    }

    function Me(b, c) {
        for (var e, d = a.interpolators.length; --d >= 0 && !(e = a.interpolators[d](b, c)););
        return e
    }

    function Ne(a, b) {
        var h, c = [], d = [], e = a.length, f = b.length, g = Math.min(a.length, b.length);
        for (h = 0; h < g; ++h)c.push(Me(a[h], b[h]));
        for (; h < e; ++h)d[h] = a[h];
        for (; h < f; ++h)d[h] = b[h];
        return function (a) {
            for (h = 0; h < g; ++h)d[h] = c[h](a);
            return d
        }
    }

    function Re(a) {
        return function (b) {
            return b <= 0 ? 0 : b >= 1 ? 1 : a(b)
        }
    }

    function Se(a) {
        return function (b) {
            return 1 - a(1 - b)
        }
    }

    function Te(a) {
        return function (b) {
            return .5 * (b < .5 ? a(2 * b) : 2 - a(2 - 2 * b))
        }
    }

    function Ue(a) {
        return a * a
    }

    function Ve(a) {
        return a * a * a
    }

    function We(a) {
        if (a <= 0)return 0;
        if (a >= 1)return 1;
        var b = a * a, c = b * a;
        return 4 * (a < .5 ? c : 3 * (a - b) + c - .75)
    }

    function Xe(a) {
        return function (b) {
            return Math.pow(b, a)
        }
    }

    function Ye(a) {
        return 1 - Math.cos(a * qa)
    }

    function Ze(a) {
        return Math.pow(2, 10 * (a - 1))
    }

    function $e(a) {
        return 1 - Math.sqrt(1 - a * a)
    }

    function _e(a, b) {
        var c;
        return arguments.length < 2 && (b = .45), arguments.length ? c = b / pa * Math.asin(1 / a) : (a = 1, c = b / 4), function (d) {
            return 1 + a * Math.pow(2, -10 * d) * Math.sin((d - c) * pa / b)
        }
    }

    function af(a) {
        return a || (a = 1.70158), function (b) {
            return b * b * ((a + 1) * b - a)
        }
    }

    function bf(a) {
        return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
    }

    function cf(b, c) {
        b = a.hcl(b), c = a.hcl(c);
        var d = b.h, e = b.c, f = b.l, g = c.h - d, h = c.c - e, i = c.l - f;
        return isNaN(h) && (h = 0, e = isNaN(e) ? c.c : e), isNaN(g) ? (g = 0, d = isNaN(d) ? c.h : d) : g > 180 ? g -= 360 : g < -180 && (g += 360), function (a) {
            return Qa(d + g * a, e + h * a, f + i * a) + ""
        }
    }

    function df(b, c) {
        b = a.hsl(b), c = a.hsl(c);
        var d = b.h, e = b.s, f = b.l, g = c.h - d, h = c.s - e, i = c.l - f;
        return isNaN(h) && (h = 0, e = isNaN(e) ? c.s : e), isNaN(g) ? (g = 0, d = isNaN(d) ? c.h : d) : g > 180 ? g -= 360 : g < -180 && (g += 360), function (a) {
            return Ma(d + g * a, e + h * a, f + i * a) + ""
        }
    }

    function ef(b, c) {
        b = a.lab(b), c = a.lab(c);
        var d = b.l, e = b.a, f = b.b, g = c.l - d, h = c.a - e, i = c.b - f;
        return function (a) {
            return Ya(d + g * a, e + h * a, f + i * a) + ""
        }
    }

    function ff(a, b) {
        return b -= a, function (c) {
            return Math.round(a + b * c)
        }
    }

    function gf(a) {
        var b = [a.a, a.b], c = [a.c, a.d], d = jf(b), e = hf(b, c), f = jf(kf(c, b, -e)) || 0;
        b[0] * c[1] < c[0] * b[1] && (b[0] *= -1, b[1] *= -1, d *= -1, e *= -1), this.rotate = (d ? Math.atan2(b[1], b[0]) : Math.atan2(-c[0], c[1])) * ua, this.translate = [a.e, a.f], this.scale = [d, f], this.skew = f ? Math.atan2(e, f) * ua : 0
    }

    function hf(a, b) {
        return a[0] * b[0] + a[1] * b[1]
    }

    function jf(a) {
        var b = Math.sqrt(hf(a, a));
        return b && (a[0] /= b, a[1] /= b), b
    }

    function kf(a, b, c) {
        return a[0] += c * b[0], a[1] += c * b[1], a
    }

    function mf(b, c) {
        var f, d = [], e = [], g = a.transform(b), h = a.transform(c), i = g.translate, j = h.translate, k = g.rotate, l = h.rotate, m = g.skew, n = h.skew, o = g.scale, p = h.scale;
        return i[0] != j[0] || i[1] != j[1] ? (d.push("translate(", null, ",", null, ")"), e.push({
            i: 1,
            x: Je(i[0], j[0])
        }, {
            i: 3,
            x: Je(i[1], j[1])
        })) : j[0] || j[1] ? d.push("translate(" + j + ")") : d.push(""), k != l ? (k - l > 180 ? l += 360 : l - k > 180 && (k += 360), e.push({
            i: d.push(d.pop() + "rotate(", null, ")") - 2,
            x: Je(k, l)
        })) : l && d.push(d.pop() + "rotate(" + l + ")"), m != n ? e.push({
            i: d.push(d.pop() + "skewX(", null, ")") - 2,
            x: Je(m, n)
        }) : n && d.push(d.pop() + "skewX(" + n + ")"), o[0] != p[0] || o[1] != p[1] ? (f = d.push(d.pop() + "scale(", null, ",", null, ")"), e.push({
            i: f - 4,
            x: Je(o[0], p[0])
        }, {
            i: f - 2,
            x: Je(o[1], p[1])
        })) : 1 == p[0] && 1 == p[1] || d.push(d.pop() + "scale(" + p + ")"), f = e.length, function (a) {
            for (var c, b = -1; ++b < f;)d[(c = e[b]).i] = c.x(a);
            return d.join("")
        }
    }

    function nf(a, b) {
        return b = b - (a = +a) ? 1 / (b - a) : 0, function (c) {
            return (c - a) * b
        }
    }

    function of(a, b) {
        return b = b - (a = +a) ? 1 / (b - a) : 0, function (c) {
            return Math.max(0, Math.min(1, (c - a) * b))
        }
    }

    function pf(a) {
        for (var b = a.source, c = a.target, d = rf(b, c), e = [b]; b !== d;)b = b.parent, e.push(b);
        for (var f = e.length; c !== d;)e.splice(f, 0, c), c = c.parent;
        return e
    }

    function qf(a) {
        for (var b = [], c = a.parent; null != c;)b.push(a), a = c, c = c.parent;
        return b.push(a), b
    }

    function rf(a, b) {
        if (a === b)return a;
        for (var c = qf(a), d = qf(b), e = c.pop(), f = d.pop(), g = null; e === f;)g = e, e = c.pop(), f = d.pop();
        return g
    }

    function sf(a) {
        a.fixed |= 2
    }

    function tf(a) {
        a.fixed &= -7
    }

    function uf(a) {
        a.fixed |= 4, a.px = a.x, a.py = a.y
    }

    function vf(a) {
        a.fixed &= -5
    }

    function wf(a, b, c) {
        var d = 0, e = 0;
        if (a.charge = 0, !a.leaf)for (var i, f = a.nodes, g = f.length, h = -1; ++h < g;)i = f[h], null != i && (wf(i, b, c), a.charge += i.charge, d += i.charge * i.cx, e += i.charge * i.cy);
        if (a.point) {
            a.leaf || (a.point.x += Math.random() - .5, a.point.y += Math.random() - .5);
            var j = b * c[a.point.index];
            a.charge += a.pointCharge = j, d += j * a.point.x, e += j * a.point.y
        }
        a.cx = d / a.charge, a.cy = e / a.charge
    }

    function zf(b, c) {
        return a.rebind(b, c, "sort", "children", "value"), b.nodes = b, b.links = Df, b
    }

    function Af(a) {
        return a.children
    }

    function Bf(a) {
        return a.value
    }

    function Cf(a, b) {
        return b.value - a.value
    }

    function Df(b) {
        return a.merge(b.map(function (a) {
            return (a.children || []).map(function (b) {
                return {source: a, target: b}
            })
        }))
    }

    function Ff(a) {
        return a.x
    }

    function Gf(a) {
        return a.y
    }

    function Hf(a, b, c) {
        a.y0 = b, a.y = c
    }

    function Kf(b) {
        return a.range(b.length)
    }

    function Lf(a) {
        for (var b = -1, c = a[0].length, d = []; ++b < c;)d[b] = 0;
        return d
    }

    function Mf(a) {
        for (var e, b = 1, c = 0, d = a[0][1], f = a.length; b < f; ++b)(e = a[b][1]) > d && (c = b, d = e);
        return c
    }

    function Nf(a) {
        return a.reduce(Of, 0)
    }

    function Of(a, b) {
        return a + b[1]
    }

    function Pf(a, b) {
        return Qf(a, Math.ceil(Math.log(b.length) / Math.LN2 + 1))
    }

    function Qf(a, b) {
        for (var c = -1, d = +a[0], e = (a[1] - d) / b, f = []; ++c <= b;)f[c] = e * c + d;
        return f
    }

    function Rf(b) {
        return [a.min(b), a.max(b)]
    }

    function Sf(a, b) {
        return a.parent == b.parent ? 1 : 2
    }

    function Tf(a) {
        var b = a.children;
        return b && b.length ? b[0] : a._tree.thread
    }

    function Uf(a) {
        var c, b = a.children;
        return b && (c = b.length) ? b[c - 1] : a._tree.thread
    }

    function Vf(a, b) {
        var c = a.children;
        if (c && (e = c.length))for (var d, e, f = -1; ++f < e;)b(d = Vf(c[f], b), a) > 0 && (a = d);
        return a
    }

    function Wf(a, b) {
        return a.x - b.x
    }

    function Xf(a, b) {
        return b.x - a.x
    }

    function Yf(a, b) {
        return a.depth - b.depth
    }

    function Zf(a, b) {
        function c(a, d) {
            var e = a.children;
            if (e && (i = e.length))for (var f, i, g = null, h = -1; ++h < i;)f = e[h], c(f, g), g = f;
            b(a, d)
        }

        c(a, null)
    }

    function $f(a) {
        for (var f, b = 0, c = 0, d = a.children, e = d.length; --e >= 0;)f = d[e]._tree, f.prelim += b, f.mod += b, b += f.shift + (c += f.change)
    }

    function _f(a, b, c) {
        a = a._tree, b = b._tree;
        var d = c / (b.number - a.number);
        a.change += d, b.change -= d, b.shift += c, b.prelim += c, b.mod += c
    }

    function ag(a, b, c) {
        return a._tree.ancestor.parent == b.parent ? a._tree.ancestor : c
    }

    function bg(a, b) {
        return a.value - b.value
    }

    function cg(a, b) {
        var c = a._pack_next;
        a._pack_next = b, b._pack_prev = a, b._pack_next = c, c._pack_prev = b
    }

    function dg(a, b) {
        a._pack_next = b, b._pack_prev = a
    }

    function eg(a, b) {
        var c = b.x - a.x, d = b.y - a.y, e = a.r + b.r;
        return .999 * e * e > c * c + d * d
    }

    function fg(a) {
        function n(a) {
            c = Math.min(a.x - a.r, c), d = Math.max(a.x + a.r, d), e = Math.min(a.y - a.r, e), f = Math.max(a.y + a.r, f)
        }

        if ((b = a.children) && (m = b.length)) {
            var b, g, h, i, j, k, l, m, c = 1 / 0, d = -(1 / 0), e = 1 / 0, f = -(1 / 0);
            if (b.forEach(gg), g = b[0], g.x = -g.r, g.y = 0, n(g), m > 1 && (h = b[1], h.x = h.r, h.y = 0, n(h), m > 2))for (i = b[2], jg(g, h, i), n(i), cg(g, i), g._pack_prev = i, cg(i, h), h = g._pack_next, j = 3; j < m; j++) {
                jg(g, h, i = b[j]);
                var o = 0, p = 1, q = 1;
                for (k = h._pack_next; k !== h; k = k._pack_next, p++)if (eg(k, i)) {
                    o = 1;
                    break
                }
                if (1 == o)for (l = g._pack_prev; l !== k._pack_prev && !eg(l, i); l = l._pack_prev, q++);
                o ? (p < q || p == q && h.r < g.r ? dg(g, h = k) : dg(g = l, h), j--) : (cg(g, i), h = i, n(i))
            }
            var r = (c + d) / 2, s = (e + f) / 2, t = 0;
            for (j = 0; j < m; j++)i = b[j], i.x -= r, i.y -= s, t = Math.max(t, i.r + Math.sqrt(i.x * i.x + i.y * i.y));
            a.r = t, b.forEach(hg)
        }
    }

    function gg(a) {
        a._pack_next = a._pack_prev = a
    }

    function hg(a) {
        delete a._pack_next, delete a._pack_prev
    }

    function ig(a, b, c, d) {
        var e = a.children;
        if (a.x = b += d * a.x, a.y = c += d * a.y, a.r *= d, e)for (var f = -1, g = e.length; ++f < g;)ig(e[f], b, c, d)
    }

    function jg(a, b, c) {
        var d = a.r + c.r, e = b.x - a.x, f = b.y - a.y;
        if (d && (e || f)) {
            var g = b.r + c.r, h = e * e + f * f;
            g *= g, d *= d;
            var i = .5 + (d - g) / (2 * h), j = Math.sqrt(Math.max(0, 2 * g * (d + h) - (d -= h) * d - g * g)) / (2 * h);
            c.x = a.x + i * e + j * f, c.y = a.y + i * f - j * e
        } else c.x = a.x + d, c.y = a.y
    }

    function kg(b) {
        return 1 + a.max(b, function (a) {
                return a.y
            })
    }

    function lg(a) {
        return a.reduce(function (a, b) {
                return a + b.x
            }, 0) / a.length
    }

    function mg(a) {
        var b = a.children;
        return b && b.length ? mg(b[0]) : a
    }

    function ng(a) {
        var c, b = a.children;
        return b && (c = b.length) ? ng(b[c - 1]) : a
    }

    function og(a) {
        return {x: a.x, y: a.y, dx: a.dx, dy: a.dy}
    }

    function pg(a, b) {
        var c = a.x + b[3], d = a.y + b[0], e = a.dx - b[1] - b[3], f = a.dy - b[0] - b[2];
        return e < 0 && (c += e / 2, e = 0), f < 0 && (d += f / 2, f = 0), {x: c, y: d, dx: e, dy: f}
    }

    function qg(a) {
        var b = a[0], c = a[a.length - 1];
        return b < c ? [b, c] : [c, b]
    }

    function rg(a) {
        return a.rangeExtent ? a.rangeExtent() : qg(a.range())
    }

    function sg(a, b, c, d) {
        var e = c(a[0], a[1]), f = d(b[0], b[1]);
        return function (a) {
            return f(e(a))
        }
    }

    function tg(a, b) {
        var g, c = 0, d = a.length - 1, e = a[c], f = a[d];
        return f < e && (g = c, c = d, d = g, g = e, e = f, f = g), a[c] = b.floor(e), a[d] = b.ceil(f), a
    }

    function ug(a) {
        return a ? {
            floor: function (b) {
                return Math.floor(b / a) * a
            }, ceil: function (b) {
                return Math.ceil(b / a) * a
            }
        } : vg
    }

    function wg(b, c, d, e) {
        var f = [], g = [], h = 0, i = Math.min(b.length, c.length) - 1;
        for (b[i] < b[0] && (b = b.slice().reverse(), c = c.slice().reverse()); ++h <= i;)f.push(d(b[h - 1], b[h])), g.push(e(c[h - 1], c[h]));
        return function (c) {
            var d = a.bisect(b, c, 1, i) - 1;
            return g[d](f[d](c))
        }
    }

    function xg(a, b, c, d) {
        function g() {
            var g = Math.min(a.length, b.length) > 2 ? wg : sg, i = d ? of : nf;
            return e = g(a, b, i, c), f = g(b, a, i, Me), h
        }

        function h(a) {
            return e(a)
        }

        var e, f;
        return h.invert = function (a) {
            return f(a)
        }, h.domain = function (b) {
            return arguments.length ? (a = b.map(Number), g()) : a
        }, h.range = function (a) {
            return arguments.length ? (b = a, g()) : b
        }, h.rangeRound = function (a) {
            return h.range(a).interpolate(ff)
        }, h.clamp = function (a) {
            return arguments.length ? (d = a, g()) : d
        }, h.interpolate = function (a) {
            return arguments.length ? (c = a, g()) : c
        }, h.ticks = function (b) {
            return Bg(a, b)
        }, h.tickFormat = function (b, c) {
            return Cg(a, b, c)
        }, h.nice = function (b) {
            return zg(a, b), g()
        }, h.copy = function () {
            return xg(a, b, c, d)
        }, g()
    }

    function yg(b, c) {
        return a.rebind(b, c, "range", "rangeRound", "interpolate", "clamp")
    }

    function zg(a, b) {
        return tg(a, ug(Ag(a, b)[2]))
    }

    function Ag(a, b) {
        null == b && (b = 10);
        var c = qg(a), d = c[1] - c[0], e = Math.pow(10, Math.floor(Math.log(d / b) / Math.LN10)), f = b / d * e;
        return f <= .15 ? e *= 10 : f <= .35 ? e *= 5 : f <= .75 && (e *= 2), c[0] = Math.ceil(c[0] / e) * e, c[1] = Math.floor(c[1] / e) * e + .5 * e, c[2] = e, c
    }

    function Bg(b, c) {
        return a.range.apply(a, Ag(b, c))
    }

    function Cg(b, c, d) {
        var e = Ag(b, c);
        return a.format(d ? d.replace(Hb, function (a, b, c, d, f, g, h, i, j, k) {
            return [b, c, d, f, g, h, i, j || "." + Fg(k, e), k].join("")
        }) : ",." + Eg(e[2]) + "f")
    }

    function Eg(a) {
        return -Math.floor(Math.log(a) / Math.LN10 + .01)
    }

    function Fg(a, b) {
        var c = Eg(b[2]);
        return a in Dg ? Math.abs(c - Eg(Math.max(Math.abs(b[0]), Math.abs(b[1])))) + +("e" !== a) : c - 2 * ("%" === a)
    }

    function Gg(b, c, d, e) {
        function f(a) {
            return (d ? Math.log(a < 0 ? 0 : a) : -Math.log(a > 0 ? 0 : -a)) / Math.log(c)
        }

        function g(a) {
            return d ? Math.pow(c, a) : -Math.pow(c, -a)
        }

        function h(a) {
            return b(f(a))
        }

        return h.invert = function (a) {
            return g(b.invert(a))
        }, h.domain = function (a) {
            return arguments.length ? (d = a[0] >= 0, b.domain((e = a.map(Number)).map(f)), h) : e
        }, h.base = function (a) {
            return arguments.length ? (c = +a, b.domain(e.map(f)), h) : c
        }, h.nice = function () {
            var a = tg(e.map(f), d ? Math : Ig);
            return b.domain(a), e = a.map(g), h
        }, h.ticks = function () {
            var a = qg(e), b = [], h = a[0], i = a[1], j = Math.floor(f(h)), k = Math.ceil(f(i)), l = c % 1 ? 2 : c;
            if (isFinite(k - j)) {
                if (d) {
                    for (; j < k; j++)for (var m = 1; m < l; m++)b.push(g(j) * m);
                    b.push(g(j))
                } else for (b.push(g(j)); j++ < k;)for (var m = l - 1; m > 0; m--)b.push(g(j) * m);
                for (j = 0; b[j] < h; j++);
                for (k = b.length; b[k - 1] > i; k--);
                b = b.slice(j, k)
            }
            return b
        }, h.tickFormat = function (b, c) {
            if (!arguments.length)return Hg;
            arguments.length < 2 ? c = Hg : "function" != typeof c && (c = a.format(c));
            var j, e = Math.max(.1, b / h.ticks().length), i = d ? (j = 1e-12, Math.ceil) : (j = -1e-12, Math.floor);
            return function (a) {
                return a / g(i(f(a) + j)) <= e ? c(a) : ""
            }
        }, h.copy = function () {
            return Gg(b.copy(), c, d, e)
        }, yg(h, b)
    }

    function Jg(a, b, c) {
        function f(b) {
            return a(d(b))
        }

        var d = Kg(b), e = Kg(1 / b);
        return f.invert = function (b) {
            return e(a.invert(b))
        }, f.domain = function (b) {
            return arguments.length ? (a.domain((c = b.map(Number)).map(d)), f) : c
        }, f.ticks = function (a) {
            return Bg(c, a)
        }, f.tickFormat = function (a, b) {
            return Cg(c, a, b)
        }, f.nice = function (a) {
            return f.domain(zg(c, a))
        }, f.exponent = function (g) {
            return arguments.length ? (d = Kg(b = g), e = Kg(1 / b), a.domain(c.map(d)), f) : b
        }, f.copy = function () {
            return Jg(a.copy(), b, c)
        }, yg(f, a)
    }

    function Kg(a) {
        return function (b) {
            return b < 0 ? -Math.pow(-b, a) : Math.pow(b, a)
        }
    }

    function Lg(b, c) {
        function g(a) {
            return e[((d.get(a) || "range" === c.t && d.set(a, b.push(a))) - 1) % e.length]
        }

        function h(c, d) {
            return a.range(b.length).map(function (a) {
                return c + d * a
            })
        }

        var d, e, f;
        return g.domain = function (a) {
            if (!arguments.length)return b;
            b = [], d = new r;
            for (var h, e = -1, f = a.length; ++e < f;)d.has(h = a[e]) || d.set(h, b.push(h));
            return g[c.t].apply(g, c.a)
        }, g.range = function (a) {
            return arguments.length ? (e = a, f = 0, c = {t: "range", a: arguments}, g) : e
        }, g.rangePoints = function (a, d) {
            arguments.length < 2 && (d = 0);
            var i = a[0], j = a[1], k = (j - i) / (Math.max(1, b.length - 1) + d);
            return e = h(b.length < 2 ? (i + j) / 2 : i + k * d / 2, k), f = 0, c = {t: "rangePoints", a: arguments}, g
        }, g.rangeBands = function (a, d, i) {
            arguments.length < 2 && (d = 0), arguments.length < 3 && (i = d);
            var j = a[1] < a[0], k = a[j - 0], l = a[1 - j], m = (l - k) / (b.length - d + 2 * i);
            return e = h(k + m * i, m), j && e.reverse(), f = m * (1 - d), c = {t: "rangeBands", a: arguments}, g
        }, g.rangeRoundBands = function (a, d, i) {
            arguments.length < 2 && (d = 0), arguments.length < 3 && (i = d);
            var j = a[1] < a[0], k = a[j - 0], l = a[1 - j], m = Math.floor((l - k) / (b.length - d + 2 * i)), n = l - k - (b.length - d) * m;
            return e = h(k + Math.round(n / 2), m), j && e.reverse(), f = Math.round(m * (1 - d)), c = {
                t: "rangeRoundBands",
                a: arguments
            }, g
        }, g.rangeBand = function () {
            return f
        }, g.rangeExtent = function () {
            return qg(c.a[0])
        }, g.copy = function () {
            return Lg(b, c)
        }, g.domain(b)
    }

    function Qg(b, c) {
        function e() {
            var e = 0, g = c.length;
            for (d = []; ++e < g;)d[e - 1] = a.quantile(b, e / g);
            return f
        }

        function f(b) {
            if (!isNaN(b = +b))return c[a.bisect(d, b)]
        }

        var d;
        return f.domain = function (c) {
            return arguments.length ? (b = c.filter(function (a) {
                return !isNaN(a)
            }).sort(a.ascending), e()) : b
        }, f.range = function (a) {
            return arguments.length ? (c = a, e()) : c
        }, f.quantiles = function () {
            return d
        }, f.invertExtent = function (a) {
            return a = c.indexOf(a), a < 0 ? [NaN, NaN] : [a > 0 ? d[a - 1] : b[0], a < d.length ? d[a] : b[b.length - 1]]
        }, f.copy = function () {
            return Qg(b, c)
        }, e()
    }

    function Rg(a, b, c) {
        function f(b) {
            return c[Math.max(0, Math.min(e, Math.floor(d * (b - a))))]
        }

        function g() {
            return d = c.length / (b - a), e = c.length - 1, f
        }

        var d, e;
        return f.domain = function (c) {
            return arguments.length ? (a = +c[0], b = +c[c.length - 1], g()) : [a, b]
        }, f.range = function (a) {
            return arguments.length ? (c = a, g()) : c
        }, f.invertExtent = function (b) {
            return b = c.indexOf(b), b = b < 0 ? NaN : b / d + a, [b, b + 1 / d]
        }, f.copy = function () {
            return Rg(a, b, c)
        }, g()
    }

    function Sg(b, c) {
        function d(d) {
            if (d <= d)return c[a.bisect(b, d)]
        }

        return d.domain = function (a) {
            return arguments.length ? (b = a, d) : b
        }, d.range = function (a) {
            return arguments.length ? (c = a, d) : c
        }, d.invertExtent = function (a) {
            return a = c.indexOf(a), [b[a - 1], b[a]]
        }, d.copy = function () {
            return Sg(b, c)
        }, d
    }

    function Tg(a) {
        function b(a) {
            return +a
        }

        return b.invert = b, b.domain = b.range = function (c) {
            return arguments.length ? (a = c.map(b), b) : a
        }, b.ticks = function (b) {
            return Bg(a, b)
        }, b.tickFormat = function (b, c) {
            return Cg(a, b, c)
        }, b.copy = function () {
            return Tg(a)
        }, b
    }

    function Wg(a) {
        return a.innerRadius
    }

    function Xg(a) {
        return a.outerRadius
    }

    function Yg(a) {
        return a.startAngle
    }

    function Zg(a) {
        return a.endAngle
    }

    function $g(a) {
        function h(f) {
            function o() {
                h.push("M", e(a(i), g))
            }

            for (var l, h = [], i = [], j = -1, k = f.length, m = nb(b), n = nb(c); ++j < k;)d.call(this, l = f[j], j) ? i.push([+m.call(this, l, j), +n.call(this, l, j)]) : i.length && (o(), i = []);
            return i.length && o(), h.length ? h.join("") : null
        }

        var b = Od, c = Pd, d = wc, e = ah, f = e.key, g = .7;
        return h.x = function (a) {
            return arguments.length ? (b = a, h) : b
        }, h.y = function (a) {
            return arguments.length ? (c = a, h) : c
        }, h.defined = function (a) {
            return arguments.length ? (d = a, h) : d
        }, h.interpolate = function (a) {
            return arguments.length ? (f = "function" == typeof a ? e = a : (e = _g.get(a) || ah).key, h) : f
        }, h.tension = function (a) {
            return arguments.length ? (g = a, h) : g
        }, h
    }

    function ah(a) {
        return a.join("L")
    }

    function bh(a) {
        return ah(a) + "Z"
    }

    function ch(a) {
        for (var b = 0, c = a.length, d = a[0], e = [d[0], ",", d[1]]; ++b < c;)e.push("H", (d[0] + (d = a[b])[0]) / 2, "V", d[1]);
        return c > 1 && e.push("H", d[0]), e.join("")
    }

    function dh(a) {
        for (var b = 0, c = a.length, d = a[0], e = [d[0], ",", d[1]]; ++b < c;)e.push("V", (d = a[b])[1], "H", d[0]);
        return e.join("")
    }

    function eh(a) {
        for (var b = 0, c = a.length, d = a[0], e = [d[0], ",", d[1]]; ++b < c;)e.push("H", (d = a[b])[0], "V", d[1]);
        return e.join("")
    }

    function fh(a, b) {
        return a.length < 4 ? ah(a) : a[1] + ih(a.slice(1, a.length - 1), jh(a, b))
    }

    function gh(a, b) {
        return a.length < 3 ? ah(a) : a[0] + ih((a.push(a[0]), a), jh([a[a.length - 2]].concat(a, [a[1]]), b))
    }

    function hh(a, b) {
        return a.length < 3 ? ah(a) : a[0] + ih(a, jh(a, b))
    }

    function ih(a, b) {
        if (b.length < 1 || a.length != b.length && a.length != b.length + 2)return ah(a);
        var c = a.length != b.length, d = "", e = a[0], f = a[1], g = b[0], h = g, i = 1;
        if (c && (d += "Q" + (f[0] - 2 * g[0] / 3) + "," + (f[1] - 2 * g[1] / 3) + "," + f[0] + "," + f[1], e = a[1], i = 2), b.length > 1) {
            h = b[1], f = a[i], i++, d += "C" + (e[0] + g[0]) + "," + (e[1] + g[1]) + "," + (f[0] - h[0]) + "," + (f[1] - h[1]) + "," + f[0] + "," + f[1];
            for (var j = 2; j < b.length; j++, i++)f = a[i], h = b[j], d += "S" + (f[0] - h[0]) + "," + (f[1] - h[1]) + "," + f[0] + "," + f[1]
        }
        if (c) {
            var k = a[i];
            d += "Q" + (f[0] + 2 * h[0] / 3) + "," + (f[1] + 2 * h[1] / 3) + "," + k[0] + "," + k[1]
        }
        return d
    }

    function jh(a, b) {
        for (var e, c = [], d = (1 - b) / 2, f = a[0], g = a[1], h = 1, i = a.length; ++h < i;)e = f, f = g, g = a[h], c.push([d * (g[0] - e[0]), d * (g[1] - e[1])]);
        return c
    }

    function kh(a) {
        if (a.length < 3)return ah(a);
        var b = 1, c = a.length, d = a[0], e = d[0], f = d[1], g = [e, e, e, (d = a[1])[0]], h = [f, f, f, d[1]], i = [e, ",", f, "L", oh(rh, g), ",", oh(rh, h)];
        for (a.push(a[c - 1]); ++b <= c;)d = a[b], g.shift(), g.push(d[0]), h.shift(), h.push(d[1]), sh(i, g, h);
        return a.pop(), i.push("L", d), i.join("")
    }

    function lh(a) {
        if (a.length < 4)return ah(a);
        for (var e, b = [], c = -1, d = a.length, f = [0], g = [0]; ++c < 3;)e = a[c], f.push(e[0]), g.push(e[1]);
        for (b.push(oh(rh, f) + "," + oh(rh, g)), --c; ++c < d;)e = a[c], f.shift(), f.push(e[0]), g.shift(), g.push(e[1]), sh(b, f, g);
        return b.join("")
    }

    function mh(a) {
        for (var b, f, c = -1, d = a.length, e = d + 4, g = [], h = []; ++c < 4;)f = a[c % d], g.push(f[0]), h.push(f[1]);
        for (b = [oh(rh, g), ",", oh(rh, h)], --c; ++c < e;)f = a[c % d], g.shift(), g.push(f[0]), h.shift(), h.push(f[1]), sh(b, g, h);
        return b.join("")
    }

    function nh(a, b) {
        var c = a.length - 1;
        if (c)for (var i, j, d = a[0][0], e = a[0][1], f = a[c][0] - d, g = a[c][1] - e, h = -1; ++h <= c;)i = a[h], j = h / c, i[0] = b * i[0] + (1 - b) * (d + j * f), i[1] = b * i[1] + (1 - b) * (e + j * g);
        return kh(a)
    }

    function oh(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
    }

    function sh(a, b, c) {
        a.push("C", oh(ph, b), ",", oh(ph, c), ",", oh(qh, b), ",", oh(qh, c), ",", oh(rh, b), ",", oh(rh, c))
    }

    function th(a, b) {
        return (b[1] - a[1]) / (b[0] - a[0])
    }

    function uh(a) {
        for (var b = 0, c = a.length - 1, d = [], e = a[0], f = a[1], g = d[0] = th(e, f); ++b < c;)d[b] = (g + (g = th(e = f, f = a[b + 1]))) / 2;
        return d[b] = g, d
    }

    function vh(a) {
        for (var c, d, e, f, b = [], g = uh(a), h = -1, i = a.length - 1; ++h < i;)c = th(a[h], a[h + 1]), o(c) < ra ? g[h] = g[h + 1] = 0 : (d = g[h] / c, e = g[h + 1] / c, f = d * d + e * e, f > 9 && (f = 3 * c / Math.sqrt(f), g[h] = f * d, g[h + 1] = f * e));
        for (h = -1; ++h <= i;)f = (a[Math.min(i, h + 1)][0] - a[Math.max(0, h - 1)][0]) / (6 * (1 + g[h] * g[h])), b.push([f || 0, g[h] * f || 0]);
        return b
    }

    function wh(a) {
        return a.length < 3 ? ah(a) : a[0] + ih(a, vh(a))
    }

    function xh(a) {
        for (var b, e, f, c = -1, d = a.length; ++c < d;)b = a[c], e = b[0], f = b[1] + Ug, b[0] = e * Math.cos(f), b[1] = e * Math.sin(f);
        return a
    }

    function yh(a) {
        function l(h) {
            function x() {
                l.push("M", g(a(n), k), j, i(a(m.reverse()), k), "Z")
            }

            for (var q, v, w, l = [], m = [], n = [], o = -1, p = h.length, r = nb(b), s = nb(d), t = b === c ? function () {
                return v
            } : nb(c), u = d === e ? function () {
                return w
            } : nb(e); ++o < p;)f.call(this, q = h[o], o) ? (m.push([v = +r.call(this, q, o), w = +s.call(this, q, o)]), n.push([+t.call(this, q, o), +u.call(this, q, o)])) : m.length && (x(), m = [], n = []);
            return m.length && x(), l.length ? l.join("") : null
        }

        var b = Od, c = Od, d = 0, e = Pd, f = wc, g = ah, h = g.key, i = g, j = "L", k = .7;
        return l.x = function (a) {
            return arguments.length ? (b = c = a, l) : c
        }, l.x0 = function (a) {
            return arguments.length ? (b = a, l) : b
        }, l.x1 = function (a) {
            return arguments.length ? (c = a, l) : c
        }, l.y = function (a) {
            return arguments.length ? (d = e = a, l) : e
        }, l.y0 = function (a) {
            return arguments.length ? (d = a, l) : d
        }, l.y1 = function (a) {
            return arguments.length ? (e = a, l) : e
        }, l.defined = function (a) {
            return arguments.length ? (f = a, l) : f
        }, l.interpolate = function (a) {
            return arguments.length ? (h = "function" == typeof a ? g = a : (g = _g.get(a) || ah).key, i = g.reverse || g, j = g.closed ? "M" : "L", l) : h
        }, l.tension = function (a) {
            return arguments.length ? (k = a, l) : k
        }, l
    }

    function zh(a) {
        return a.radius
    }

    function Ah(a) {
        return [a.x, a.y]
    }

    function Bh(a) {
        return function () {
            var b = a.apply(this, arguments), c = b[0], d = b[1] + Ug;
            return [c * Math.cos(d), c * Math.sin(d)]
        }
    }

    function Ch() {
        return 64
    }

    function Dh() {
        return "circle"
    }

    function Eh(a) {
        var b = Math.sqrt(a / oa);
        return "M0," + b + "A" + b + "," + b + " 0 1,1 0," + -b + "A" + b + "," + b + " 0 1,1 0," + b + "Z"
    }

    function Ih(a, b) {
        return F(a, Jh), a.id = b, a
    }

    function Nh(a, b, c, d) {
        var e = a.id;
        return _(a, "function" == typeof c ? function (a, f, g) {
            a.__transition__[e].tween.set(b, d(c.call(a, a.__data__, f, g)))
        } : (c = d(c), function (a) {
            a.__transition__[e].tween.set(b, c)
        }))
    }

    function Oh(a) {
        return null == a && (a = ""), function () {
            this.textContent = a
        }
    }

    function Ph(b, c, d, e) {
        var f = b.__transition__ || (b.__transition__ = {active: 0, count: 0}), g = f[d];
        if (!g) {
            var h = e.time;
            g = f[d] = {
                tween: new r,
                time: h,
                ease: e.ease,
                delay: e.delay,
                duration: e.duration
            }, ++f.count, a.timer(function (e) {
                function o(e) {
                    return f.active > d ? q() : (f.active = d, g.event && g.event.start.call(b, i, c), g.tween.forEach(function (a, d) {
                        (d = d.call(b, i, c)) && n.push(d)
                    }), void a.timer(function () {
                        return m.c = p(e || 1) ? wc : p, 1
                    }, 0, h))
                }

                function p(a) {
                    if (f.active !== d)return q();
                    for (var e = a / l, h = j(e), k = n.length; k > 0;)n[--k].call(b, h);
                    return e >= 1 ? (g.event && g.event.end.call(b, i, c), q()) : void 0
                }

                function q() {
                    return --f.count ? delete f[d] : delete b.__transition__, 1
                }

                var i = b.__data__, j = g.ease, k = g.delay, l = g.duration, m = wb, n = [];
                return m.t = k + h, k <= e ? o(e - k) : void(m.c = o)
            }, 0, h)
        }
    }

    function Sh(a, b) {
        a.attr("transform", function (a) {
            return "translate(" + b(a) + ",0)"
        })
    }

    function Th(a, b) {
        a.attr("transform", function (a) {
            return "translate(0," + b(a) + ")"
        })
    }

    function Zh() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }

    function gi(a, b, c) {
        function d(b) {
            var c = a(b), d = f(c, 1);
            return b - c < d - b ? c : d
        }

        function e(c) {
            return b(c = a(new Xh(c - 1)), 1), c
        }

        function f(a, c) {
            return b(a = new Xh(+a), c), a
        }

        function g(a, d, f) {
            var g = e(a), h = [];
            if (f > 1)for (; g < d;)c(g) % f || h.push(new Date(+g)), b(g, 1); else for (; g < d;)h.push(new Date(+g)), b(g, 1);
            return h
        }

        function h(a, b, c) {
            try {
                Xh = Zh;
                var d = new Zh;
                return d._ = a, g(d, b, c)
            } finally {
                Xh = Date
            }
        }

        a.floor = a, a.round = d, a.ceil = e, a.offset = f, a.range = g;
        var i = a.utc = hi(a);
        return i.floor = i, i.round = hi(d), i.ceil = hi(e), i.offset = hi(f), i.range = h, a
    }

    function hi(a) {
        return function (b, c) {
            try {
                Xh = Zh;
                var d = new Zh;
                return d._ = b, a(d, c)._
            } finally {
                Xh = Date
            }
        }
    }

    function ii(a) {
        function c(c) {
            for (var g, h, i, d = [], e = -1, f = 0; ++e < b;)37 === a.charCodeAt(e) && (d.push(a.substring(f, e)), null != (h = wi[g = a.charAt(++e)]) && (g = a.charAt(++e)), (i = xi[g]) && (g = i(c, null == h ? "e" === g ? " " : "0" : h)), d.push(g), f = e + 1);
            return d.push(a.substring(f, e)), d.join("")
        }

        var b = a.length;
        return c.parse = function (b) {
            var c = {y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0, Z: null}, d = ji(c, a, b, 0);
            if (d != b.length)return null;
            "p"in c && (c.H = c.H % 12 + 12 * c.p);
            var e = null != c.Z && Xh !== Zh, f = new (e ? Zh : Xh);
            return "j"in c ? f.setFullYear(c.y, 0, c.j) : "w"in c && ("W"in c || "U"in c) ? (f.setFullYear(c.y, 0, 1), f.setFullYear(c.y, 0, "W"in c ? (c.w + 6) % 7 + 7 * c.W - (f.getDay() + 5) % 7 : c.w + 7 * c.U - (f.getDay() + 6) % 7)) : f.setFullYear(c.y, c.m, c.d), f.setHours(c.H + Math.floor(c.Z / 100), c.M + c.Z % 100, c.S, c.L), e ? f._ : f
        }, c.toString = function () {
            return a
        }, c
    }

    function ji(a, b, c, d) {
        for (var e, f, g, h = 0, i = b.length, j = c.length; h < i;) {
            if (d >= j)return -1;
            if (e = b.charCodeAt(h++), 37 === e) {
                if (g = b.charAt(h++), f = yi[g in wi ? b.charAt(h++) : g], !f || (d = f(a, c, d)) < 0)return -1
            } else if (e != c.charCodeAt(d++))return -1
        }
        return d
    }

    function ki(b) {
        return new RegExp("^(?:" + b.map(a.requote).join("|") + ")", "i")
    }

    function li(a) {
        for (var b = new r, c = -1, d = a.length; ++c < d;)b.set(a[c].toLowerCase(), c);
        return b
    }

    function mi(a, b, c) {
        var d = a < 0 ? "-" : "", e = (d ? -a : a) + "", f = e.length;
        return d + (f < c ? new Array(c - f + 1).join(b) + e : e)
    }

    function zi(a, b, c) {
        pi.lastIndex = 0;
        var d = pi.exec(b.substring(c));
        return d ? (a.w = qi.get(d[0].toLowerCase()), c + d[0].length) : -1
    }

    function Ai(a, b, c) {
        ni.lastIndex = 0;
        var d = ni.exec(b.substring(c));
        return d ? (a.w = oi.get(d[0].toLowerCase()), c + d[0].length) : -1
    }

    function Bi(a, b, c) {
        Ui.lastIndex = 0;
        var d = Ui.exec(b.substring(c, c + 1));
        return d ? (a.w = +d[0], c + d[0].length) : -1
    }

    function Ci(a, b, c) {
        Ui.lastIndex = 0;
        var d = Ui.exec(b.substring(c));
        return d ? (a.U = +d[0], c + d[0].length) : -1
    }

    function Di(a, b, c) {
        Ui.lastIndex = 0;
        var d = Ui.exec(b.substring(c));
        return d ? (a.W = +d[0], c + d[0].length) : -1
    }

    function Ei(a, b, c) {
        ti.lastIndex = 0;
        var d = ti.exec(b.substring(c));
        return d ? (a.m = ui.get(d[0].toLowerCase()), c + d[0].length) : -1
    }

    function Fi(a, b, c) {
        ri.lastIndex = 0;
        var d = ri.exec(b.substring(c));
        return d ? (a.m = si.get(d[0].toLowerCase()), c + d[0].length) : -1
    }

    function Gi(a, b, c) {
        return ji(a, xi.c.toString(), b, c)
    }

    function Hi(a, b, c) {
        return ji(a, xi.x.toString(), b, c)
    }

    function Ii(a, b, c) {
        return ji(a, xi.X.toString(), b, c)
    }

    function Ji(a, b, c) {
        Ui.lastIndex = 0;
        var d = Ui.exec(b.substring(c, c + 4));
        return d ? (a.y = +d[0], c + d[0].length) : -1
    }

    function Ki(a, b, c) {
        Ui.lastIndex = 0;
        var d = Ui.exec(b.substring(c, c + 2));
        return d ? (a.y = Mi(+d[0]), c + d[0].length) : -1
    }

    function Li(a, b, c) {
        return /^[+-]\d{4}$/.test(b = b.substring(c, c + 5)) ? (a.Z = +b, c + 5) : -1
    }

    function Mi(a) {
        return a + (a > 68 ? 1900 : 2e3)
    }

    function Ni(a, b, c) {
        Ui.lastIndex = 0;
        var d = Ui.exec(b.substring(c, c + 2));
        return d ? (a.m = d[0] - 1, c + d[0].length) : -1
    }

    function Oi(a, b, c) {
        Ui.lastIndex = 0;
        var d = Ui.exec(b.substring(c, c + 2));
        return d ? (a.d = +d[0], c + d[0].length) : -1
    }

    function Pi(a, b, c) {
        Ui.lastIndex = 0;
        var d = Ui.exec(b.substring(c, c + 3));
        return d ? (a.j = +d[0], c + d[0].length) : -1
    }

    function Qi(a, b, c) {
        Ui.lastIndex = 0;
        var d = Ui.exec(b.substring(c, c + 2));
        return d ? (a.H = +d[0], c + d[0].length) : -1
    }

    function Ri(a, b, c) {
        Ui.lastIndex = 0;
        var d = Ui.exec(b.substring(c, c + 2));
        return d ? (a.M = +d[0], c + d[0].length) : -1
    }

    function Si(a, b, c) {
        Ui.lastIndex = 0;
        var d = Ui.exec(b.substring(c, c + 2));
        return d ? (a.S = +d[0], c + d[0].length) : -1
    }

    function Ti(a, b, c) {
        Ui.lastIndex = 0;
        var d = Ui.exec(b.substring(c, c + 3));
        return d ? (a.L = +d[0], c + d[0].length) : -1
    }

    function Vi(a, b, c) {
        var d = Wi.get(b.substring(c, c += 2).toLowerCase());
        return null == d ? -1 : (a.p = d, c)
    }

    function Xi(a) {
        var b = a.getTimezoneOffset(), c = b > 0 ? "-" : "+", d = ~~(o(b) / 60), e = o(b) % 60;
        return c + mi(d, "0", 2) + mi(e, "0", 2)
    }

    function Yi(a, b, c) {
        vi.lastIndex = 0;
        var d = vi.exec(b.substring(c, c + 1));
        return d ? c + d[0].length : -1
    }

    function Zi(a) {
        function c(a) {
            try {
                Xh = Zh;
                var c = new Xh;
                return c._ = a, b(c)
            } finally {
                Xh = Date
            }
        }

        var b = ii(a);
        return c.parse = function (a) {
            try {
                Xh = Zh;
                var c = b.parse(a);
                return c && c._
            } finally {
                Xh = Date
            }
        }, c.toString = b.toString, c
    }

    function _i(a) {
        return a.toISOString()
    }

    function aj(b, c, d) {
        function e(a) {
            return b(a)
        }

        function f(b, d) {
            var e = b[1] - b[0], f = e / d, g = a.bisect(dj, f);
            return g == dj.length ? [c.year, Ag(b.map(function (a) {
                return a / 31536e6
            }), d)[2]] : g ? c[f / dj[g - 1] < dj[g] / f ? g - 1 : g] : [hj, Ag(b, d)[2]]
        }

        return e.invert = function (a) {
            return bj(b.invert(a))
        }, e.domain = function (a) {
            return arguments.length ? (b.domain(a), e) : b.domain().map(bj)
        }, e.nice = function (a, b) {
            function h(c) {
                return !isNaN(c) && !a.range(c, bj(+c + 1), b).length
            }

            var c = e.domain(), d = qg(c), g = null == a ? f(d, 10) : "number" == typeof a && f(d, a);
            return g && (a = g[0], b = g[1]), e.domain(tg(c, b > 1 ? {
                floor: function (b) {
                    for (; h(b = a.floor(b));)b = bj(b - 1);
                    return b
                }, ceil: function (b) {
                    for (; h(b = a.ceil(b));)b = bj(+b + 1);
                    return b
                }
            } : a))
        }, e.ticks = function (a, b) {
            var c = qg(e.domain()), d = null == a ? f(c, 10) : "number" == typeof a ? f(c, a) : !a.range && [{range: a}, b];
            return d && (a = d[0], b = d[1]), a.range(c[0], bj(+c[1] + 1), b < 1 ? 1 : b)
        }, e.tickFormat = function () {
            return d
        }, e.copy = function () {
            return aj(b.copy(), c, d)
        }, yg(e, b)
    }

    function bj(a) {
        return new Date(a)
    }

    function cj(a) {
        return function (b) {
            for (var c = a.length - 1, d = a[c]; !d[1](b);)d = a[--c];
            return d[0](b)
        }
    }

    function lj(a) {
        return JSON.parse(a.responseText)
    }

    function mj(a) {
        var b = d.createRange();
        return b.selectNode(d.body), b.createContextualFragment(a.responseText)
    }

    var a = {version: "3.3.13"};
    Date.now || (Date.now = function () {
        return +new Date
    });
    var b = [].slice, c = function (a) {
        return b.call(a)
    }, d = document, e = d.documentElement, f = window;
    try {
        c(e.childNodes)[0].nodeType
    } catch (a) {
        c = function (a) {
            for (var b = a.length, c = new Array(b); b--;)c[b] = a[b];
            return c
        }
    }
    try {
        d.createElement("div").style.setProperty("opacity", 0, "")
    } catch (a) {
        var g = f.Element.prototype, h = g.setAttribute, i = g.setAttributeNS, j = f.CSSStyleDeclaration.prototype, k = j.setProperty;
        g.setAttribute = function (a, b) {
            h.call(this, a, b + "")
        }, g.setAttributeNS = function (a, b, c) {
            i.call(this, a, b, c + "")
        }, j.setProperty = function (a, b, c) {
            k.call(this, a, b + "", c)
        }
    }
    a.ascending = function (a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN
    }, a.descending = function (a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
    }, a.min = function (a, b) {
        var e, f, c = -1, d = a.length;
        if (1 === arguments.length) {
            for (; ++c < d && !(null != (e = a[c]) && e <= e);)e = void 0;
            for (; ++c < d;)null != (f = a[c]) && e > f && (e = f)
        } else {
            for (; ++c < d && !(null != (e = b.call(a, a[c], c)) && e <= e);)e = void 0;
            for (; ++c < d;)null != (f = b.call(a, a[c], c)) && e > f && (e = f)
        }
        return e
    }, a.max = function (a, b) {
        var e, f, c = -1, d = a.length;
        if (1 === arguments.length) {
            for (; ++c < d && !(null != (e = a[c]) && e <= e);)e = void 0;
            for (; ++c < d;)null != (f = a[c]) && f > e && (e = f)
        } else {
            for (; ++c < d && !(null != (e = b.call(a, a[c], c)) && e <= e);)e = void 0;
            for (; ++c < d;)null != (f = b.call(a, a[c], c)) && f > e && (e = f)
        }
        return e
    }, a.extent = function (a, b) {
        var e, f, g, c = -1, d = a.length;
        if (1 === arguments.length) {
            for (; ++c < d && !(null != (e = g = a[c]) && e <= e);)e = g = void 0;
            for (; ++c < d;)null != (f = a[c]) && (e > f && (e = f), g < f && (g = f))
        } else {
            for (; ++c < d && !(null != (e = g = b.call(a, a[c], c)) && e <= e);)e = void 0;
            for (; ++c < d;)null != (f = b.call(a, a[c], c)) && (e > f && (e = f), g < f && (g = f))
        }
        return [e, g]
    }, a.sum = function (a, b) {
        var e, c = 0, d = a.length, f = -1;
        if (1 === arguments.length)for (; ++f < d;)isNaN(e = +a[f]) || (c += e); else for (; ++f < d;)isNaN(e = +b.call(a, a[f], f)) || (c += e);
        return c
    }, a.mean = function (a, b) {
        var d, c = a.length, e = 0, f = -1, g = 0;
        if (1 === arguments.length)for (; ++f < c;)l(d = a[f]) && (e += (d - e) / ++g); else for (; ++f < c;)l(d = b.call(a, a[f], f)) && (e += (d - e) / ++g);
        return g ? e : void 0
    }, a.quantile = function (a, b) {
        var c = (a.length - 1) * b + 1, d = Math.floor(c), e = +a[d - 1], f = c - d;
        return f ? e + f * (a[d] - e) : e;
    }, a.median = function (b, c) {
        return arguments.length > 1 && (b = b.map(c)), b = b.filter(l), b.length ? a.quantile(b.sort(a.ascending), .5) : void 0
    }, a.bisector = function (a) {
        return {
            left: function (b, c, d, e) {
                for (arguments.length < 3 && (d = 0), arguments.length < 4 && (e = b.length); d < e;) {
                    var f = d + e >>> 1;
                    a.call(b, b[f], f) < c ? d = f + 1 : e = f
                }
                return d
            }, right: function (b, c, d, e) {
                for (arguments.length < 3 && (d = 0), arguments.length < 4 && (e = b.length); d < e;) {
                    var f = d + e >>> 1;
                    c < a.call(b, b[f], f) ? e = f : d = f + 1
                }
                return d
            }
        }
    };
    var m = a.bisector(function (a) {
        return a
    });
    a.bisectLeft = m.left, a.bisect = a.bisectRight = m.right, a.shuffle = function (a) {
        for (var c, d, b = a.length; b;)d = Math.random() * b-- | 0, c = a[b], a[b] = a[d], a[d] = c;
        return a
    }, a.permute = function (a, b) {
        for (var c = b.length, d = new Array(c); c--;)d[c] = a[b[c]];
        return d
    }, a.pairs = function (a) {
        for (var d, b = 0, c = a.length - 1, e = a[0], f = new Array(c < 0 ? 0 : c); b < c;)f[b] = [d = e, e = a[++b]];
        return f
    }, a.zip = function () {
        if (!(f = arguments.length))return [];
        for (var b = -1, c = a.min(arguments, n), d = new Array(c); ++b < c;)for (var f, e = -1, g = d[b] = new Array(f); ++e < f;)g[e] = arguments[e][b];
        return d
    }, a.transpose = function (b) {
        return a.zip.apply(a, b)
    }, a.keys = function (a) {
        var b = [];
        for (var c in a)b.push(c);
        return b
    }, a.values = function (a) {
        var b = [];
        for (var c in a)b.push(a[c]);
        return b
    }, a.entries = function (a) {
        var b = [];
        for (var c in a)b.push({key: c, value: a[c]});
        return b
    }, a.merge = function (a) {
        for (var c, f, g, b = a.length, d = -1, e = 0; ++d < b;)e += a[d].length;
        for (f = new Array(e); --b >= 0;)for (g = a[b], c = g.length; --c >= 0;)f[--e] = g[c];
        return f
    };
    var o = Math.abs;
    a.range = function (a, b, c) {
        if (arguments.length < 3 && (c = 1, arguments.length < 2 && (b = a, a = 0)), (b - a) / c === 1 / 0)throw new Error("infinite range");
        var g, d = [], e = p(o(c)), f = -1;
        if (a *= e, b *= e, c *= e, c < 0)for (; (g = a + c * ++f) > b;)d.push(g / e); else for (; (g = a + c * ++f) < b;)d.push(g / e);
        return d
    }, a.map = function (a) {
        var b = new r;
        if (a instanceof r)a.forEach(function (a, c) {
            b.set(a, c)
        }); else for (var c in a)b.set(c, a[c]);
        return b
    }, q(r, {
        has: function (a) {
            return s + a in this
        }, get: function (a) {
            return this[s + a]
        }, set: function (a, b) {
            return this[s + a] = b
        }, remove: function (a) {
            return a = s + a, a in this && delete this[a]
        }, keys: function () {
            var a = [];
            return this.forEach(function (b) {
                a.push(b)
            }), a
        }, values: function () {
            var a = [];
            return this.forEach(function (b, c) {
                a.push(c)
            }), a
        }, entries: function () {
            var a = [];
            return this.forEach(function (b, c) {
                a.push({key: b, value: c})
            }), a
        }, forEach: function (a) {
            for (var b in this)b.charCodeAt(0) === t && a.call(this, b.substring(1), this[b])
        }
    });
    var s = "\0", t = s.charCodeAt(0);
    a.nest = function () {
        function g(a, d, h) {
            if (h >= c.length)return f ? f.call(b, d) : e ? d.sort(e) : d;
            for (var l, m, n, p, i = -1, j = d.length, k = c[h++], o = new r; ++i < j;)(p = o.get(l = k(m = d[i]))) ? p.push(m) : o.set(l, [m]);
            return a ? (m = a(), n = function (b, c) {
                m.set(b, g(a, c, h))
            }) : (m = {}, n = function (b, c) {
                m[b] = g(a, c, h)
            }), o.forEach(n), m
        }

        function h(a, b) {
            if (b >= c.length)return a;
            var e = [], f = d[b++];
            return a.forEach(function (a, c) {
                e.push({key: a, values: h(c, b)})
            }), f ? e.sort(function (a, b) {
                return f(a.key, b.key)
            }) : e
        }

        var e, f, b = {}, c = [], d = [];
        return b.map = function (a, b) {
            return g(b, a, 0)
        }, b.entries = function (b) {
            return h(g(a.map, b, 0), 0)
        }, b.key = function (a) {
            return c.push(a), b
        }, b.sortKeys = function (a) {
            return d[c.length - 1] = a, b
        }, b.sortValues = function (a) {
            return e = a, b
        }, b.rollup = function (a) {
            return f = a, b
        }, b
    }, a.set = function (a) {
        var b = new u;
        if (a)for (var c = 0, d = a.length; c < d; ++c)b.add(a[c]);
        return b
    }, q(u, {
        has: function (a) {
            return s + a in this
        }, add: function (a) {
            return this[s + a] = !0, a
        }, remove: function (a) {
            return a = s + a, a in this && delete this[a]
        }, values: function () {
            var a = [];
            return this.forEach(function (b) {
                a.push(b)
            }), a
        }, forEach: function (a) {
            for (var b in this)b.charCodeAt(0) === t && a.call(this, b.substring(1))
        }
    }), a.behavior = {}, a.rebind = function (a, b) {
        for (var e, c = 1, d = arguments.length; ++c < d;)a[e = arguments[c]] = v(a, b, b[e]);
        return a
    };
    var x = ["webkit", "ms", "moz", "Moz", "o", "O"];
    a.dispatch = function () {
        for (var a = new z, b = -1, c = arguments.length; ++b < c;)a[arguments[b]] = A(a);
        return a
    }, z.prototype.on = function (a, b) {
        var c = a.indexOf("."), d = "";
        if (c >= 0 && (d = a.substring(c + 1), a = a.substring(0, c)), a)return arguments.length < 2 ? this[a].on(d) : this[a].on(d, b);
        if (2 === arguments.length) {
            if (null == b)for (a in this)this.hasOwnProperty(a) && this[a].on(d, null);
            return this
        }
    }, a.event = null, a.requote = function (a) {
        return a.replace(E, "\\$&")
    };
    var E = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g, F = {}.__proto__ ? function (a, b) {
        a.__proto__ = b
    } : function (a, b) {
        for (var c in b)a[c] = b[c]
    }, H = function (a, b) {
        return b.querySelector(a)
    }, I = function (a, b) {
        return b.querySelectorAll(a)
    }, J = e[w(e, "matchesSelector")], K = function (a, b) {
        return J.call(a, b)
    };
    "function" == typeof Sizzle && (H = function (a, b) {
        return Sizzle(a, b)[0] || null
    }, I = function (a, b) {
        return Sizzle.uniqueSort(Sizzle(a, b))
    }, K = Sizzle.matchesSelector), a.selection = function () {
        return ea
    };
    var L = a.selection.prototype = [];
    L.select = function (a) {
        var c, d, e, f, b = [];
        a = M(a);
        for (var g = -1, h = this.length; ++g < h;) {
            b.push(c = []), c.parentNode = (e = this[g]).parentNode;
            for (var i = -1, j = e.length; ++i < j;)(f = e[i]) ? (c.push(d = a.call(f, f.__data__, i, g)), d && "__data__"in f && (d.__data__ = f.__data__)) : c.push(null)
        }
        return G(b)
    }, L.selectAll = function (a) {
        var d, e, b = [];
        a = N(a);
        for (var f = -1, g = this.length; ++f < g;)for (var h = this[f], i = -1, j = h.length; ++i < j;)(e = h[i]) && (b.push(d = c(a.call(e, e.__data__, i, f))), d.parentNode = e);
        return G(b)
    };
    var O = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    a.ns = {
        prefix: O, qualify: function (a) {
            var b = a.indexOf(":"), c = a;
            return b >= 0 && (c = a.substring(0, b), a = a.substring(b + 1)), O.hasOwnProperty(c) ? {
                space: O[c],
                local: a
            } : a
        }
    }, L.attr = function (b, c) {
        if (arguments.length < 2) {
            if ("string" == typeof b) {
                var d = this.node();
                return b = a.ns.qualify(b), b.local ? d.getAttributeNS(b.space, b.local) : d.getAttribute(b)
            }
            for (c in b)this.each(P(c, b[c]));
            return this
        }
        return this.each(P(b, c))
    }, L.classed = function (a, b) {
        if (arguments.length < 2) {
            if ("string" == typeof a) {
                var c = this.node(), d = (a = S(a)).length, e = -1;
                if (b = c.classList) {
                    for (; ++e < d;)if (!b.contains(a[e]))return !1
                } else for (b = c.getAttribute("class"); ++e < d;)if (!R(a[e]).test(b))return !1;
                return !0
            }
            for (b in a)this.each(T(b, a[b]));
            return this
        }
        return this.each(T(a, b))
    }, L.style = function (a, b, c) {
        var d = arguments.length;
        if (d < 3) {
            if ("string" != typeof a) {
                d < 2 && (b = "");
                for (c in a)this.each(V(c, a[c], b));
                return this
            }
            if (d < 2)return f.getComputedStyle(this.node(), null).getPropertyValue(a);
            c = ""
        }
        return this.each(V(a, b, c))
    }, L.property = function (a, b) {
        if (arguments.length < 2) {
            if ("string" == typeof a)return this.node()[a];
            for (b in a)this.each(W(b, a[b]));
            return this
        }
        return this.each(W(a, b))
    }, L.text = function (a) {
        return arguments.length ? this.each("function" == typeof a ? function () {
            var b = a.apply(this, arguments);
            this.textContent = null == b ? "" : b
        } : null == a ? function () {
            this.textContent = ""
        } : function () {
            this.textContent = a
        }) : this.node().textContent
    }, L.html = function (a) {
        return arguments.length ? this.each("function" == typeof a ? function () {
            var b = a.apply(this, arguments);
            this.innerHTML = null == b ? "" : b
        } : null == a ? function () {
            this.innerHTML = ""
        } : function () {
            this.innerHTML = a
        }) : this.node().innerHTML
    }, L.append = function (a) {
        return a = X(a), this.select(function () {
            return this.appendChild(a.apply(this, arguments))
        })
    }, L.insert = function (a, b) {
        return a = X(a), b = M(b), this.select(function () {
            return this.insertBefore(a.apply(this, arguments), b.apply(this, arguments) || null)
        })
    }, L.remove = function () {
        return this.each(function () {
            var a = this.parentNode;
            a && a.removeChild(this)
        })
    }, L.data = function (a, b) {
        function g(a, c) {
            var d, n, o, e = a.length, f = c.length, g = Math.min(e, f), k = new Array(f), l = new Array(f), m = new Array(e);
            if (b) {
                var t, p = new r, q = new r, s = [];
                for (d = -1; ++d < e;)t = b.call(n = a[d], n.__data__, d), p.has(t) ? m[d] = n : p.set(t, n), s.push(t);
                for (d = -1; ++d < f;)t = b.call(c, o = c[d], d), (n = p.get(t)) ? (k[d] = n, n.__data__ = o) : q.has(t) || (l[d] = Y(o)), q.set(t, o), p.remove(t);
                for (d = -1; ++d < e;)p.has(s[d]) && (m[d] = a[d])
            } else {
                for (d = -1; ++d < g;)n = a[d], o = c[d], n ? (n.__data__ = o, k[d] = n) : l[d] = Y(o);
                for (; d < f; ++d)l[d] = Y(c[d]);
                for (; d < e; ++d)m[d] = a[d]
            }
            l.update = k, l.parentNode = k.parentNode = m.parentNode = a.parentNode, h.push(l), i.push(k), j.push(m)
        }

        var e, f, c = -1, d = this.length;
        if (!arguments.length) {
            for (a = new Array(d = (e = this[0]).length); ++c < d;)(f = e[c]) && (a[c] = f.__data__);
            return a
        }
        var h = aa([]), i = G([]), j = G([]);
        if ("function" == typeof a)for (; ++c < d;)g(e = this[c], a.call(e, e.parentNode.__data__, c)); else for (; ++c < d;)g(e = this[c], a);
        return i.enter = function () {
            return h
        }, i.exit = function () {
            return j
        }, i
    }, L.datum = function (a) {
        return arguments.length ? this.property("__data__", a) : this.property("__data__")
    }, L.filter = function (a) {
        var c, d, e, b = [];
        "function" != typeof a && (a = Z(a));
        for (var f = 0, g = this.length; f < g; f++) {
            b.push(c = []), c.parentNode = (d = this[f]).parentNode;
            for (var h = 0, i = d.length; h < i; h++)(e = d[h]) && a.call(e, e.__data__, h, f) && c.push(e)
        }
        return G(b)
    }, L.order = function () {
        for (var a = -1, b = this.length; ++a < b;)for (var f, c = this[a], d = c.length - 1, e = c[d]; --d >= 0;)(f = c[d]) && (e && e !== f.nextSibling && e.parentNode.insertBefore(f, e), e = f);
        return this
    }, L.sort = function (a) {
        a = $.apply(this, arguments);
        for (var b = -1, c = this.length; ++b < c;)this[b].sort(a);
        return this.order()
    }, L.each = function (a) {
        return _(this, function (b, c, d) {
            a.call(b, b.__data__, c, d)
        })
    }, L.call = function (a) {
        var b = c(arguments);
        return a.apply(b[0] = this, b), this
    }, L.empty = function () {
        return !this.node()
    }, L.node = function () {
        for (var a = 0, b = this.length; a < b; a++)for (var c = this[a], d = 0, e = c.length; d < e; d++) {
            var f = c[d];
            if (f)return f
        }
        return null
    }, L.size = function () {
        var a = 0;
        return this.each(function () {
            ++a
        }), a
    };
    var ba = [];
    a.selection.enter = aa, a.selection.enter.prototype = ba, ba.append = L.append, ba.empty = L.empty, ba.node = L.node, ba.call = L.call, ba.size = L.size, ba.select = function (a) {
        for (var c, d, e, f, g, b = [], h = -1, i = this.length; ++h < i;) {
            e = (f = this[h]).update, b.push(c = []), c.parentNode = f.parentNode;
            for (var j = -1, k = f.length; ++j < k;)(g = f[j]) ? (c.push(e[j] = d = a.call(f.parentNode, g.__data__, j, h)), d.__data__ = g.__data__) : c.push(null)
        }
        return G(b)
    }, ba.insert = function (a, b) {
        return arguments.length < 2 && (b = ca(this)), L.insert.call(this, a, b)
    }, L.transition = function () {
        for (var c, d, a = Lh || ++Kh, b = [], e = Mh || {
                time: Date.now(),
                ease: We,
                delay: 0,
                duration: 250
            }, f = -1, g = this.length; ++f < g;) {
            b.push(c = []);
            for (var h = this[f], i = -1, j = h.length; ++i < j;)(d = h[i]) && Ph(d, i, a, e), c.push(d)
        }
        return Ih(b, a)
    }, L.interrupt = function () {
        return this.each(da)
    }, a.select = function (a) {
        var b = ["string" == typeof a ? H(a, d) : a];
        return b.parentNode = e, G([b])
    }, a.selectAll = function (a) {
        var b = c("string" == typeof a ? I(a, d) : a);
        return b.parentNode = e, G([b])
    };
    var ea = a.select(e);
    L.on = function (a, b, c) {
        var d = arguments.length;
        if (d < 3) {
            if ("string" != typeof a) {
                d < 2 && (b = !1);
                for (c in a)this.each(fa(c, a[c], b));
                return this
            }
            if (d < 2)return (d = this.node()["__on" + a]) && d._;
            c = !1
        }
        return this.each(fa(a, b, c))
    };
    var ga = a.map({mouseenter: "mouseover", mouseleave: "mouseout"});
    ga.forEach(function (a) {
        "on" + a in d && ga.remove(a)
    });
    var ja = "onselectstart"in d ? null : w(e.style, "userSelect"), ka = 0;
    a.mouse = function (a) {
        return na(a, C())
    };
    var ma = /WebKit/.test(f.navigator.userAgent) ? -1 : 0;
    a.touches = function (a, b) {
        return arguments.length < 2 && (b = C().touches), b ? c(b).map(function (b) {
            var c = na(a, b);
            return c.identifier = b.identifier, c
        }) : []
    }, a.behavior.drag = function () {
        function g() {
            this.on("mousedown.drag", d).on("touchstart.drag", e)
        }

        function h() {
            return a.event.changedTouches[0].identifier
        }

        function i(b, c) {
            return a.touches(b).filter(function (a) {
                return a.identifier === c
            })[0]
        }

        function j(d, e, g, h) {
            return function () {
                function t() {
                    var a = e(j, m), b = a[0] - o[0], c = a[1] - o[1];
                    p |= b | c, o = a, k({type: "drag", x: a[0] + q[0], y: a[1] + q[1], dx: b, dy: c})
                }

                function u() {
                    r.on(g + "." + n, null).on(h + "." + n, null), s(p && a.event.target === l), k({type: "dragend"})
                }

                var q, i = this, j = i.parentNode, k = b.of(i, arguments), l = a.event.target, m = d(), n = null == m ? "drag" : "drag-" + m, o = e(j, m), p = 0, r = a.select(f).on(g + "." + n, t).on(h + "." + n, u), s = la();
                c ? (q = c.apply(i, arguments), q = [q.x - o[0], q.y - o[1]]) : q = [0, 0], k({type: "dragstart"})
            }
        }

        var b = D(g, "drag", "dragstart", "dragend"), c = null, d = j(y, a.mouse, "mousemove", "mouseup"), e = j(h, i, "touchmove", "touchend");
        return g.origin = function (a) {
            return arguments.length ? (c = a, g) : c
        }, a.rebind(g, b, "on")
    };
    var oa = Math.PI, pa = 2 * oa, qa = oa / 2, ra = 1e-6, sa = ra * ra, ta = oa / 180, ua = 180 / oa, Ca = Math.SQRT2, Da = 2, Ea = 4;
    a.interpolateZoom = function (a, b) {
        function s(a) {
            var b = a * r;
            if (q) {
                var f = za(o), g = e / (Da * l) * (f * Aa(Ca * b + o) - ya(o));
                return [c + g * i, d + g * j, e * f / za(Ca * b + o)]
            }
            return [c + a * i, d + a * j, e * Math.exp(Ca * b)]
        }

        var c = a[0], d = a[1], e = a[2], f = b[0], g = b[1], h = b[2], i = f - c, j = g - d, k = i * i + j * j, l = Math.sqrt(k), m = (h * h - e * e + Ea * k) / (2 * e * Da * l), n = (h * h - e * e - Ea * k) / (2 * h * Da * l), o = Math.log(Math.sqrt(m * m + 1) - m), p = Math.log(Math.sqrt(n * n + 1) - n), q = p - o, r = (q || Math.log(h / e)) / Ca;
        return s.duration = 1e3 * r, s
    }, a.behavior.zoom = function () {
        function s(a) {
            a.on(h, C).on(Ha + ".zoom", F).on(i, G).on("dblclick.zoom", H).on(l, E)
        }

        function t(a) {
            return [(a[0] - b.x) / b.k, (a[1] - b.y) / b.k]
        }

        function u(a) {
            return [a[0] * b.k + b.x, a[1] * b.k + b.y]
        }

        function v(a) {
            b.k = Math.max(g[0], Math.min(g[1], a))
        }

        function w(a, c) {
            c = u(c), b.x += a[0] - c[0], b.y += a[1] - c[1]
        }

        function x() {
            p && p.domain(o.range().map(function (a) {
                return (a - b.x) / b.k
            }).map(o.invert)), r && r.domain(q.range().map(function (a) {
                return (a - b.y) / b.k
            }).map(q.invert))
        }

        function y(a) {
            a({type: "zoomstart"})
        }

        function z(a) {
            x(), a({type: "zoom", scale: b.k, translate: [b.x, b.y]})
        }

        function A(a) {
            a({type: "zoomend"})
        }

        function C() {
            function l() {
                e = 1, w(a.mouse(b), h), z(c)
            }

            function m() {
                g.on(i, f === b ? G : null).on(j, null), k(e && a.event.target === d), A(c)
            }

            var b = this, c = n.of(b, arguments), d = a.event.target, e = 0, g = a.select(f).on(i, l).on(j, m), h = t(a.mouse(b)), k = la();
            da.call(b), y(c)
        }

        function E() {
            function s() {
                var d = a.touches(c);
                return i = b.k, d.forEach(function (a) {
                    a.identifier in e && (e[a.identifier] = t(a))
                }), d
            }

            function u() {
                for (var c = a.event.changedTouches, f = 0, h = c.length; f < h; ++f)e[c[f].identifier] = null;
                var i = s(), j = Date.now();
                if (1 === i.length) {
                    if (j - m < 500) {
                        var k = i[0], l = e[k.identifier];
                        v(2 * b.k), w(k, l), B(), z(d)
                    }
                    m = j
                } else if (i.length > 1) {
                    var k = i[0], n = i[1], o = k[0] - n[0], p = k[1] - n[1];
                    g = o * o + p * p
                }
            }

            function x() {
                for (var f, h, j, k, b = a.touches(c), l = 0, n = b.length; l < n; ++l, k = null)if (j = b[l], k = e[j.identifier]) {
                    if (h)break;
                    f = j, h = k
                }
                if (k) {
                    var o = (o = j[0] - f[0]) * o + (o = j[1] - f[1]) * o, p = g && Math.sqrt(o / g);
                    f = [(f[0] + j[0]) / 2, (f[1] + j[1]) / 2], h = [(h[0] + k[0]) / 2, (h[1] + k[1]) / 2], v(p * i)
                }
                m = null, w(f, h), z(d)
            }

            function D() {
                if (a.event.touches.length) {
                    for (var b = a.event.changedTouches, c = 0, f = b.length; c < f; ++c)delete e[b[c].identifier];
                    for (var g in e)return void s()
                }
                p.on(k, null).on(o, null), q.on(h, C).on(l, E), r(), A(d)
            }

            var i, c = this, d = n.of(c, arguments), e = {}, g = 0, j = a.event.changedTouches[0].identifier, k = "touchmove.zoom-" + j, o = "touchend.zoom-" + j, p = a.select(f).on(k, x).on(o, D), q = a.select(c).on(h, null).on(l, u), r = la();
            da.call(c), u(), y(d)
        }

        function F() {
            var e = n.of(this, arguments);
            k ? clearTimeout(k) : (da.call(this), y(e)), k = setTimeout(function () {
                k = null, A(e)
            }, 50), B();
            var f = d || a.mouse(this);
            c || (c = t(f)), v(Math.pow(2, .002 * Ga()) * b.k), w(f, c), z(e)
        }

        function G() {
            c = null
        }

        function H() {
            var c = n.of(this, arguments), d = a.mouse(this), e = t(d), f = Math.log(b.k) / Math.LN2;
            y(c), v(Math.pow(2, a.event.shiftKey ? Math.ceil(f) - 1 : Math.floor(f) + 1)), w(d, e), z(c), A(c)
        }

        var c, d, k, m, o, p, q, r, b = {
            x: 0,
            y: 0,
            k: 1
        }, e = [960, 500], g = Fa, h = "mousedown.zoom", i = "mousemove.zoom", j = "mouseup.zoom", l = "touchstart.zoom", n = D(s, "zoomstart", "zoom", "zoomend");
        return s.event = function (c) {
            c.each(function () {
                var c = n.of(this, arguments), d = b;
                Lh ? a.select(this).transition().each("start.zoom", function () {
                    b = this.__chart__ || {x: 0, y: 0, k: 1}, y(c)
                }).tween("zoom:zoom", function () {
                    var f = e[0], g = e[1], h = f / 2, i = g / 2, j = a.interpolateZoom([(h - b.x) / b.k, (i - b.y) / b.k, f / b.k], [(h - d.x) / d.k, (i - d.y) / d.k, f / d.k]);
                    return function (a) {
                        var d = j(a), e = f / d[2];
                        this.__chart__ = b = {x: h - d[0] * e, y: i - d[1] * e, k: e}, z(c)
                    }
                }).each("end.zoom", function () {
                    A(c)
                }) : (this.__chart__ = b, y(c), z(c), A(c))
            })
        }, s.translate = function (a) {
            return arguments.length ? (b = {x: +a[0], y: +a[1], k: b.k}, x(), s) : [b.x, b.y]
        }, s.scale = function (a) {
            return arguments.length ? (b = {x: b.x, y: b.y, k: +a}, x(), s) : b.k
        }, s.scaleExtent = function (a) {
            return arguments.length ? (g = null == a ? Fa : [+a[0], +a[1]], s) : g
        }, s.center = function (a) {
            return arguments.length ? (d = a && [+a[0], +a[1]], s) : d
        }, s.size = function (a) {
            return arguments.length ? (e = a && [+a[0], +a[1]], s) : e
        }, s.x = function (a) {
            return arguments.length ? (p = a, o = a.copy(), b = {x: 0, y: 0, k: 1}, s) : p
        }, s.y = function (a) {
            return arguments.length ? (r = a, q = a.copy(), b = {x: 0, y: 0, k: 1}, s) : r
        }, a.rebind(s, n, "on")
    };
    var Ga, Fa = [0, 1 / 0], Ha = "onwheel"in d ? (Ga = function () {
        return -a.event.deltaY * (a.event.deltaMode ? 120 : 1)
    }, "wheel") : "onmousewheel"in d ? (Ga = function () {
        return a.event.wheelDelta
    }, "mousewheel") : (Ga = function () {
        return -a.event.detail
    }, "MozMousePixelScroll");
    Ia.prototype.toString = function () {
        return this.rgb() + ""
    }, a.hsl = function (a, b, c) {
        return 1 === arguments.length ? a instanceof Ka ? Ja(a.h, a.s, a.l) : hb("" + a, ib, Ja) : Ja(+a, +b, +c)
    };
    var La = Ka.prototype = new Ia;
    La.brighter = function (a) {
        return a = Math.pow(.7, arguments.length ? a : 1), Ja(this.h, this.s, this.l / a)
    }, La.darker = function (a) {
        return a = Math.pow(.7, arguments.length ? a : 1), Ja(this.h, this.s, a * this.l)
    }, La.rgb = function () {
        return Ma(this.h, this.s, this.l)
    }, a.hcl = function (b, c, d) {
        return 1 === arguments.length ? b instanceof Oa ? Na(b.h, b.c, b.l) : b instanceof Sa ? Za(b.l, b.a, b.b) : Za((b = jb((b = a.rgb(b)).r, b.g, b.b)).l, b.a, b.b) : Na(+b, +c, +d)
    };
    var Pa = Oa.prototype = new Ia;
    Pa.brighter = function (a) {
        return Na(this.h, this.c, Math.min(100, this.l + Ta * (arguments.length ? a : 1)))
    }, Pa.darker = function (a) {
        return Na(this.h, this.c, Math.max(0, this.l - Ta * (arguments.length ? a : 1)))
    }, Pa.rgb = function () {
        return Qa(this.h, this.c, this.l).rgb()
    }, a.lab = function (b, c, d) {
        return 1 === arguments.length ? b instanceof Sa ? Ra(b.l, b.a, b.b) : b instanceof Oa ? Qa(b.l, b.c, b.h) : jb((b = a.rgb(b)).r, b.g, b.b) : Ra(+b, +c, +d)
    };
    var Ta = 18, Ua = .95047, Va = 1, Wa = 1.08883, Xa = Sa.prototype = new Ia;
    Xa.brighter = function (a) {
        return Ra(Math.min(100, this.l + Ta * (arguments.length ? a : 1)), this.a, this.b)
    }, Xa.darker = function (a) {
        return Ra(Math.max(0, this.l - Ta * (arguments.length ? a : 1)), this.a, this.b)
    }, Xa.rgb = function () {
        return Ya(this.l, this.a, this.b)
    }, a.rgb = function (a, b, c) {
        return 1 === arguments.length ? a instanceof eb ? db(a.r, a.g, a.b) : hb("" + a, db, Ma) : db(~~a, ~~b, ~~c)
    };
    var fb = eb.prototype = new Ia;
    fb.brighter = function (a) {
        a = Math.pow(.7, arguments.length ? a : 1);
        var b = this.r, c = this.g, d = this.b, e = 30;
        return b || c || d ? (b && b < e && (b = e), c && c < e && (c = e), d && d < e && (d = e), db(Math.min(255, ~~(b / a)), Math.min(255, ~~(c / a)), Math.min(255, ~~(d / a)))) : db(e, e, e)
    }, fb.darker = function (a) {
        return a = Math.pow(.7, arguments.length ? a : 1), db(~~(a * this.r), ~~(a * this.g), ~~(a * this.b))
    }, fb.hsl = function () {
        return ib(this.r, this.g, this.b)
    }, fb.toString = function () {
        return "#" + gb(this.r) + gb(this.g) + gb(this.b)
    };
    var mb = a.map({
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    });
    mb.forEach(function (a, b) {
        mb.set(a, bb(b))
    }), a.functor = nb, a.xhr = pb(ob), a.dsv = function (a, b) {
        function e(a, c, d) {
            arguments.length < 3 && (d = c, c = null);
            var e = qb(a, b, null == c ? f : g(c), d);
            return e.row = function (a) {
                return arguments.length ? e.response(null == (c = a) ? f : g(a)) : c
            }, e
        }

        function f(a) {
            return e.parse(a.responseText)
        }

        function g(a) {
            return function (b) {
                return e.parse(b.responseText, a)
            }
        }

        function h(b) {
            return b.map(i).join(a)
        }

        function i(a) {
            return c.test(a) ? '"' + a.replace(/\"/g, '""') + '"' : a
        }

        var c = new RegExp('["' + a + "\n]"), d = a.charCodeAt(0);
        return e.parse = function (a, b) {
            var c;
            return e.parseRows(a, function (a, d) {
                if (c)return c(a, d - 1);
                var e = new Function("d", "return {" + a.map(function (a, b) {
                    return JSON.stringify(a) + ": d[" + b + "]"
                }).join(",") + "}");
                c = b ? function (a, c) {
                    return b(e(a), c)
                } : e
            })
        }, e.parseRows = function (a, b) {
            function l() {
                if (h >= g)return e;
                if (k)return k = !1, c;
                var b = h;
                if (34 === a.charCodeAt(b)) {
                    for (var f = b; f++ < g;)if (34 === a.charCodeAt(f)) {
                        if (34 !== a.charCodeAt(f + 1))break;
                        ++f
                    }
                    h = f + 2;
                    var i = a.charCodeAt(f + 1);
                    return 13 === i ? (k = !0, 10 === a.charCodeAt(f + 2) && ++h) : 10 === i && (k = !0), a.substring(b + 1, f).replace(/""/g, '"')
                }
                for (; h < g;) {
                    var i = a.charCodeAt(h++), j = 1;
                    if (10 === i)k = !0; else if (13 === i)k = !0, 10 === a.charCodeAt(h) && (++h, ++j); else if (i !== d)continue;
                    return a.substring(b, h - j)
                }
                return a.substring(b)
            }

            for (var j, k, c = {}, e = {}, f = [], g = a.length, h = 0, i = 0; (j = l()) !== e;) {
                for (var m = []; j !== c && j !== e;)m.push(j), j = l();
                b && !(m = b(m, i++)) || f.push(m)
            }
            return f
        }, e.format = function (b) {
            if (Array.isArray(b[0]))return e.formatRows(b);
            var c = new u, d = [];
            return b.forEach(function (a) {
                for (var b in a)c.has(b) || d.push(c.add(b))
            }), [d.map(i).join(a)].concat(b.map(function (b) {
                return d.map(function (a) {
                    return i(b[a])
                }).join(a)
            })).join("\n")
        }, e.formatRows = function (a) {
            return a.map(h).join("\n")
        }, e
    }, a.csv = a.dsv(",", "text/csv"), a.tsv = a.dsv("\t", "text/tab-separated-values");
    var sb, tb, ub, vb, wb, xb = f[w(f, "requestAnimationFrame")] || function (a) {
            setTimeout(a, 17)
        };
    a.timer = function (a, b, c) {
        var d = arguments.length;
        d < 2 && (b = 0), d < 3 && (c = Date.now());
        var e = c + b, f = {c: a, t: e, f: !1, n: null};
        tb ? tb.n = f : sb = f, tb = f, ub || (vb = clearTimeout(vb), ub = 1, xb(yb))
    }, a.timer.flush = function () {
        zb(), Ab()
    };
    var Bb = ".", Cb = ",", Db = [3, 3], Eb = "$", Fb = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(Gb);
    a.formatPrefix = function (b, c) {
        var d = 0;
        return b && (b < 0 && (b *= -1), c && (b = a.round(b, Jb(b, c))), d = 1 + Math.floor(1e-12 + Math.log(b) / Math.LN10), d = Math.max(-24, Math.min(24, 3 * Math.floor((d <= 0 ? d + 1 : d - 1) / 3)))), Fb[8 + d / 3]
    }, a.round = function (a, b) {
        return b ? Math.round(a * (b = Math.pow(10, b))) / b : Math.round(a)
    }, a.format = function (b) {
        var c = Hb.exec(b), d = c[1] || " ", e = c[2] || ">", f = c[3] || "", g = c[4] || "", h = c[5], i = +c[6], j = c[7], k = c[8], l = c[9], m = 1, n = "", o = !1;
        switch (k && (k = +k.substring(1)), (h || "0" === d && "=" === e) && (h = d = "0", e = "=", j && (i -= Math.floor((i - 1) / 4))), l) {
            case"n":
                j = !0, l = "g";
                break;
            case"%":
                m = 100, n = "%", l = "f";
                break;
            case"p":
                m = 100, n = "%", l = "r";
                break;
            case"b":
            case"o":
            case"x":
            case"X":
                "#" === g && (g = "0" + l.toLowerCase());
            case"c":
            case"d":
                o = !0, k = 0;
                break;
            case"s":
                m = -1, l = "r"
        }
        "#" === g ? g = "" : "$" === g && (g = Eb), "r" != l || k || (l = "g"), null != k && ("g" == l ? k = Math.max(1, Math.min(21, k)) : "e" != l && "f" != l || (k = Math.max(0, Math.min(20, k)))), l = Ib.get(l) || Kb;
        var p = h && j;
        return function (b) {
            if (o && b % 1)return "";
            var c = b < 0 || 0 === b && 1 / b < 0 ? (b = -b, "-") : f;
            if (m < 0) {
                var q = a.formatPrefix(b, k);
                b = q.scale(b), n = q.symbol
            } else b *= m;
            b = l(b, k);
            var r = b.lastIndexOf("."), s = r < 0 ? b : b.substring(0, r), t = r < 0 ? "" : Bb + b.substring(r + 1);
            !h && j && (s = Lb(s));
            var u = g.length + s.length + t.length + (p ? 0 : c.length), v = u < i ? new Array(u = i - u + 1).join(d) : "";
            return p && (s = Lb(v + s)), c += g, b = s + t, ("<" === e ? c + b + v : ">" === e ? v + c + b : "^" === e ? v.substring(0, u >>= 1) + c + b + v.substring(u) : c + (p ? b : v + b)) + n
        }
    };
    var Hb = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i, Ib = a.map({
        b: function (a) {
            return a.toString(2)
        }, c: function (a) {
            return String.fromCharCode(a)
        }, o: function (a) {
            return a.toString(8)
        }, x: function (a) {
            return a.toString(16)
        }, X: function (a) {
            return a.toString(16).toUpperCase()
        }, g: function (a, b) {
            return a.toPrecision(b)
        }, e: function (a, b) {
            return a.toExponential(b)
        }, f: function (a, b) {
            return a.toFixed(b)
        }, r: function (b, c) {
            return (b = a.round(b, Jb(b, c))).toFixed(Math.max(0, Math.min(20, Jb(b * (1 + 1e-15), c))))
        }
    }), Lb = ob;
    if (Db) {
        var Mb = Db.length;
        Lb = function (a) {
            for (var b = a.length, c = [], d = 0, e = Db[0]; b > 0 && e > 0;)c.push(a.substring(b -= e, b + e)), e = Db[d = (d + 1) % Mb];
            return c.reverse().join(Cb)
        }
    }
    a.geo = {}, Nb.prototype = {
        s: 0, t: 0, add: function (a) {
            Pb(a, this.t, Ob), Pb(Ob.s, this.s, this), this.s ? this.t += Ob.t : this.s = Ob.t
        }, reset: function () {
            this.s = this.t = 0
        }, valueOf: function () {
            return this.s
        }
    };
    var Ob = new Nb;
    a.geo.stream = function (a, b) {
        a && Rb.hasOwnProperty(a.type) ? Rb[a.type](a, b) : Qb(a, b)
    };
    var Rb = {
        Feature: function (a, b) {
            Qb(a.geometry, b)
        }, FeatureCollection: function (a, b) {
            for (var c = a.features, d = -1, e = c.length; ++d < e;)Qb(c[d].geometry, b)
        }
    }, Sb = {
        Sphere: function (a, b) {
            b.sphere()
        }, Point: function (a, b) {
            a = a.coordinates, b.point(a[0], a[1], a[2])
        }, MultiPoint: function (a, b) {
            for (var c = a.coordinates, d = -1, e = c.length; ++d < e;)a = c[d], b.point(a[0], a[1], a[2])
        }, LineString: function (a, b) {
            Tb(a.coordinates, b, 0)
        }, MultiLineString: function (a, b) {
            for (var c = a.coordinates, d = -1, e = c.length; ++d < e;)Tb(c[d], b, 0)
        }, Polygon: function (a, b) {
            Ub(a.coordinates, b)
        }, MultiPolygon: function (a, b) {
            for (var c = a.coordinates, d = -1, e = c.length; ++d < e;)Ub(c[d], b)
        }, GeometryCollection: function (a, b) {
            for (var c = a.geometries, d = -1, e = c.length; ++d < e;)Qb(c[d], b)
        }
    };
    a.geo.area = function (b) {
        return Vb = 0, a.geo.stream(b, Xb), Vb
    };
    var Vb, Wb = new Nb, Xb = {
        sphere: function () {
            Vb += 4 * oa
        }, point: y, lineStart: y, lineEnd: y, polygonStart: function () {
            Wb.reset(), Xb.lineStart = Yb
        }, polygonEnd: function () {
            var a = 2 * Wb;
            Vb += a < 0 ? 4 * oa + a : a, Xb.lineStart = Xb.lineEnd = Xb.point = y
        }
    };
    a.geo.bounds = function () {
        function n(a, f) {
            k.push(l = [b = a, d = a]), f < c && (c = f), f > e && (e = f)
        }

        function p(a, g) {
            var h = Zb([a * ta, g * ta]);
            if (i) {
                var j = _b(i, h), k = [j[1], -j[0], 0], l = _b(k, j);
                cc(l), l = dc(l);
                var m = a - f, p = m > 0 ? 1 : -1, q = l[0] * ua * p, r = o(m) > 180;
                if (r ^ (p * f < q && q < p * a)) {
                    var s = l[1] * ua;
                    s > e && (e = s)
                } else if (q = (q + 360) % 360 - 180, r ^ (p * f < q && q < p * a)) {
                    var s = -l[1] * ua;
                    s < c && (c = s)
                } else g < c && (c = g), g > e && (e = g);
                r ? a < f ? v(b, a) > v(b, d) && (d = a) : v(a, d) > v(b, d) && (b = a) : d >= b ? (a < b && (b = a), a > d && (d = a)) : a > f ? v(b, a) > v(b, d) && (d = a) : v(a, d) > v(b, d) && (b = a)
            } else n(a, g);
            i = h, f = a
        }

        function q() {
            m.point = p
        }

        function r() {
            l[0] = b, l[1] = d, m.point = n, i = null
        }

        function s(a, b) {
            if (i) {
                var c = a - f;
                j += o(c) > 180 ? c + (c > 0 ? 360 : -360) : c
            } else g = a, h = b;
            Xb.point(a, b), p(a, b)
        }

        function t() {
            Xb.lineStart()
        }

        function u() {
            s(g, h), Xb.lineEnd(), o(j) > ra && (b = -(d = 180)), l[0] = b, l[1] = d, i = null
        }

        function v(a, b) {
            return (b -= a) < 0 ? b + 360 : b
        }

        function w(a, b) {
            return a[0] - b[0]
        }

        function x(a, b) {
            return b[0] <= b[1] ? b[0] <= a && a <= b[1] : a < b[0] || b[1] < a
        }

        var b, c, d, e, f, g, h, i, j, k, l, m = {
            point: n, lineStart: q, lineEnd: r, polygonStart: function () {
                m.point = s, m.lineStart = t, m.lineEnd = u, j = 0, Xb.polygonStart()
            }, polygonEnd: function () {
                Xb.polygonEnd(), m.point = n, m.lineStart = q, m.lineEnd = r, Wb < 0 ? (b = -(d = 180), c = -(e = 90)) : j > ra ? e = 90 : j < -ra && (c = -90), l[0] = b, l[1] = d
            }
        };
        return function (f) {
            e = d = -(b = c = 1 / 0), k = [], a.geo.stream(f, m);
            var g = k.length;
            if (g) {
                k.sort(w);
                for (var j, h = 1, i = k[0], n = [i]; h < g; ++h)j = k[h], x(j[0], i) || x(j[1], i) ? (v(i[0], j[1]) > v(i[0], i[1]) && (i[1] = j[1]), v(j[0], i[1]) > v(i[0], i[1]) && (i[0] = j[0])) : n.push(i = j);
                for (var p, j, o = -(1 / 0), g = n.length - 1, h = 0, i = n[g]; h <= g; i = j, ++h)j = n[h], (p = v(i[1], j[0])) > o && (o = p, b = j[0], d = i[1])
            }
            return k = l = null, b === 1 / 0 || c === 1 / 0 ? [[NaN, NaN], [NaN, NaN]] : [[b, c], [d, e]]
        }
    }(), a.geo.centroid = function (b) {
        fc = gc = hc = ic = jc = kc = lc = mc = nc = oc = pc = 0, a.geo.stream(b, qc);
        var c = nc, d = oc, e = pc, f = c * c + d * d + e * e;
        return f < sa && (c = kc, d = lc, e = mc, gc < ra && (c = hc, d = ic, e = jc), f = c * c + d * d + e * e, f < sa) ? [NaN, NaN] : [Math.atan2(d, c) * ua, xa(e / Math.sqrt(f)) * ua]
    };
    var fc, gc, hc, ic, jc, kc, lc, mc, nc, oc, pc, qc = {
        sphere: y,
        point: rc,
        lineStart: tc,
        lineEnd: uc,
        polygonStart: function () {
            qc.lineStart = vc
        },
        polygonEnd: function () {
            qc.lineStart = tc
        }
    }, Fc = Ac(wc, Gc, Ic, [-oa, -oa / 2]), Lc = 1e9;
    a.geo.clipExtent = function () {
        var a, b, c, d, e, f, g = {
            stream: function (a) {
                return e && (e.valid = !1), e = f(a), e.valid = !0, e
            }, extent: function (h) {
                return arguments.length ? (f = Mc(a = +h[0][0], b = +h[0][1], c = +h[1][0], d = +h[1][1]), e && (e.valid = !1, e = null), g) : [[a, b], [c, d]]
            }
        };
        return g.extent([[0, 0], [960, 500]])
    }, (a.geo.conicEqualArea = function () {
        return Oc(Pc)
    }).raw = Pc, a.geo.albers = function () {
        return a.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
    }, a.geo.albersUsa = function () {
        function j(a) {
            var b = a[0], c = a[1];
            return e = null, g(b, c), e || (h(b, c), e) || i(b, c), e
        }

        var e, g, h, i, b = a.geo.albers(), c = a.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), d = a.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), f = {
            point: function (a, b) {
                e = [a, b]
            }
        };
        return j.invert = function (a) {
            var e = b.scale(), f = b.translate(), g = (a[0] - f[0]) / e, h = (a[1] - f[1]) / e;
            return (h >= .12 && h < .234 && g >= -.425 && g < -.214 ? c : h >= .166 && h < .234 && g >= -.214 && g < -.115 ? d : b).invert(a)
        }, j.stream = function (a) {
            var e = b.stream(a), f = c.stream(a), g = d.stream(a);
            return {
                point: function (a, b) {
                    e.point(a, b), f.point(a, b), g.point(a, b)
                }, sphere: function () {
                    e.sphere(), f.sphere(), g.sphere()
                }, lineStart: function () {
                    e.lineStart(), f.lineStart(), g.lineStart()
                }, lineEnd: function () {
                    e.lineEnd(), f.lineEnd(), g.lineEnd()
                }, polygonStart: function () {
                    e.polygonStart(), f.polygonStart(), g.polygonStart()
                }, polygonEnd: function () {
                    e.polygonEnd(), f.polygonEnd(), g.polygonEnd()
                }
            }
        }, j.precision = function (a) {
            return arguments.length ? (b.precision(a), c.precision(a), d.precision(a), j) : b.precision()
        }, j.scale = function (a) {
            return arguments.length ? (b.scale(a), c.scale(.35 * a), d.scale(a), j.translate(b.translate())) : b.scale()
        }, j.translate = function (a) {
            if (!arguments.length)return b.translate();
            var e = b.scale(), k = +a[0], l = +a[1];
            return g = b.translate(a).clipExtent([[k - .455 * e, l - .238 * e], [k + .455 * e, l + .238 * e]]).stream(f).point, h = c.translate([k - .307 * e, l + .201 * e]).clipExtent([[k - .425 * e + ra, l + .12 * e + ra], [k - .214 * e - ra, l + .234 * e - ra]]).stream(f).point, i = d.translate([k - .205 * e, l + .212 * e]).clipExtent([[k - .214 * e + ra, l + .166 * e + ra], [k - .115 * e - ra, l + .234 * e - ra]]).stream(f).point, j
        }, j.scale(1070)
    };
    var Qc, Rc, Uc, Vc, Wc, Xc, Sc = {
        point: y, lineStart: y, lineEnd: y, polygonStart: function () {
            Rc = 0, Sc.lineStart = Tc
        }, polygonEnd: function () {
            Sc.lineStart = Sc.lineEnd = Sc.point = y, Qc += o(Rc / 2)
        }
    }, Yc = {point: Zc, lineStart: y, lineEnd: y, polygonStart: y, polygonEnd: y}, ad = {
        point: bd,
        lineStart: cd,
        lineEnd: dd,
        polygonStart: function () {
            ad.lineStart = ed
        },
        polygonEnd: function () {
            ad.point = bd, ad.lineStart = cd, ad.lineEnd = dd
        }
    };
    a.geo.path = function () {
        function h(c) {
            return c && ("function" == typeof b && f.pointRadius(+b.apply(this, arguments)), g && g.valid || (g = e(f)), a.geo.stream(c, g)), f.result()
        }

        function i() {
            return g = null, h
        }

        var c, d, e, f, g, b = 4.5;
        return h.area = function (b) {
            return Qc = 0, a.geo.stream(b, e(Sc)), Qc
        }, h.centroid = function (b) {
            return hc = ic = jc = kc = lc = mc = nc = oc = pc = 0, a.geo.stream(b, e(ad)), pc ? [nc / pc, oc / pc] : mc ? [kc / mc, lc / mc] : jc ? [hc / jc, ic / jc] : [NaN, NaN]
        }, h.bounds = function (b) {
            return Wc = Xc = -(Uc = Vc = 1 / 0), a.geo.stream(b, e(Yc)), [[Uc, Vc], [Wc, Xc]]
        }, h.projection = function (a) {
            return arguments.length ? (e = (c = a) ? a.stream || hd(a) : ob, i()) : c
        }, h.context = function (a) {
            return arguments.length ? (f = null == (d = a) ? new $c : new fd(a), "function" != typeof b && f.pointRadius(b), i()) : d
        }, h.pointRadius = function (a) {
            return arguments.length ? (b = "function" == typeof a ? a : (f.pointRadius(+a), +a), h) : b
        }, h.projection(a.geo.albersUsa()).context(null)
    }, a.geo.transform = function (a) {
        return {
            stream: function (b) {
                var c = new id(b);
                for (var d in a)c[d] = a[d];
                return c
            }
        }
    }, id.prototype = {
        point: function (a, b) {
            this.stream.point(a, b)
        }, sphere: function () {
            this.stream.sphere()
        }, lineStart: function () {
            this.stream.lineStart()
        }, lineEnd: function () {
            this.stream.lineEnd()
        }, polygonStart: function () {
            this.stream.polygonStart()
        }, polygonEnd: function () {
            this.stream.polygonEnd()
        }
    }, a.geo.projection = kd, a.geo.projectionMutator = ld,
        (a.geo.equirectangular = function () {
            return kd(nd)
        }).raw = nd.invert = nd, a.geo.rotation = function (a) {
        function b(b) {
            return b = a(b[0] * ta, b[1] * ta), b[0] *= ua, b[1] *= ua, b
        }

        return a = pd(a[0] % 360 * ta, a[1] * ta, a.length > 2 ? a[2] * ta : 0), b.invert = function (b) {
            return b = a.invert(b[0] * ta, b[1] * ta), b[0] *= ua, b[1] *= ua, b
        }, b
    }, od.invert = nd, a.geo.circle = function () {
        function e() {
            var b = "function" == typeof a ? a.apply(this, arguments) : a, c = pd(-b[0] * ta, -b[1] * ta, 0).invert, e = [];
            return d(null, null, 1, {
                point: function (a, b) {
                    e.push(a = c(a, b)), a[0] *= ua, a[1] *= ua
                }
            }), {type: "Polygon", coordinates: [e]}
        }

        var b, d, a = [0, 0], c = 6;
        return e.origin = function (b) {
            return arguments.length ? (a = b, e) : a
        }, e.angle = function (a) {
            return arguments.length ? (d = td((b = +a) * ta, c * ta), e) : b
        }, e.precision = function (a) {
            return arguments.length ? (d = td(b * ta, (c = +a) * ta), e) : c
        }, e.angle(90)
    }, a.geo.distance = function (a, b) {
        var l, c = (b[0] - a[0]) * ta, d = a[1] * ta, e = b[1] * ta, f = Math.sin(c), g = Math.cos(c), h = Math.sin(d), i = Math.cos(d), j = Math.sin(e), k = Math.cos(e);
        return Math.atan2(Math.sqrt((l = k * f) * l + (l = i * j - h * k * g) * l), h * j + i * k * g)
    }, a.geo.graticule = function () {
        function t() {
            return {type: "MultiLineString", coordinates: u()}
        }

        function u() {
            return a.range(Math.ceil(e / l) * l, d, l).map(q).concat(a.range(Math.ceil(i / m) * m, h, m).map(r)).concat(a.range(Math.ceil(c / j) * j, b, j).filter(function (a) {
                return o(a % l) > ra
            }).map(n)).concat(a.range(Math.ceil(g / k) * k, f, k).filter(function (a) {
                return o(a % m) > ra
            }).map(p))
        }

        var b, c, d, e, f, g, h, i, n, p, q, r, j = 10, k = j, l = 90, m = 360, s = 2.5;
        return t.lines = function () {
            return u().map(function (a) {
                return {type: "LineString", coordinates: a}
            })
        }, t.outline = function () {
            return {
                type: "Polygon",
                coordinates: [q(e).concat(r(h).slice(1), q(d).reverse().slice(1), r(i).reverse().slice(1))]
            }
        }, t.extent = function (a) {
            return arguments.length ? t.majorExtent(a).minorExtent(a) : t.minorExtent()
        }, t.majorExtent = function (a) {
            return arguments.length ? (e = +a[0][0], d = +a[1][0], i = +a[0][1], h = +a[1][1], e > d && (a = e, e = d, d = a), i > h && (a = i, i = h, h = a), t.precision(s)) : [[e, i], [d, h]]
        }, t.minorExtent = function (a) {
            return arguments.length ? (c = +a[0][0], b = +a[1][0], g = +a[0][1], f = +a[1][1], c > b && (a = c, c = b, b = a), g > f && (a = g, g = f, f = a), t.precision(s)) : [[c, g], [b, f]]
        }, t.step = function (a) {
            return arguments.length ? t.majorStep(a).minorStep(a) : t.minorStep()
        }, t.majorStep = function (a) {
            return arguments.length ? (l = +a[0], m = +a[1], t) : [l, m]
        }, t.minorStep = function (a) {
            return arguments.length ? (j = +a[0], k = +a[1], t) : [j, k]
        }, t.precision = function (a) {
            return arguments.length ? (s = +a, n = vd(g, f, 90), p = wd(c, b, s), q = vd(i, h, 90), r = wd(e, d, s), t) : s
        }, t.majorExtent([[-180, -90 + ra], [180, 90 - ra]]).minorExtent([[-180, -80 - ra], [180, 80 + ra]])
    }, a.geo.greatArc = function () {
        function f() {
            return {type: "LineString", coordinates: [c || b.apply(this, arguments), e || d.apply(this, arguments)]}
        }

        var c, e, b = xd, d = yd;
        return f.distance = function () {
            return a.geo.distance(c || b.apply(this, arguments), e || d.apply(this, arguments))
        }, f.source = function (a) {
            return arguments.length ? (b = a, c = "function" == typeof a ? null : a, f) : b
        }, f.target = function (a) {
            return arguments.length ? (d = a, e = "function" == typeof a ? null : a, f) : d
        }, f.precision = function () {
            return arguments.length ? f : 0
        }, f
    }, a.geo.interpolate = function (a, b) {
        return zd(a[0] * ta, a[1] * ta, b[0] * ta, b[1] * ta)
    }, a.geo.length = function (b) {
        return Ad = 0, a.geo.stream(b, Bd), Ad
    };
    var Ad, Bd = {
        sphere: y,
        point: y,
        lineStart: Cd,
        lineEnd: y,
        polygonStart: y,
        polygonEnd: y
    }, Ed = Dd(function (a) {
        return Math.sqrt(2 / (1 + a))
    }, function (a) {
        return 2 * Math.asin(a / 2)
    });
    (a.geo.azimuthalEqualArea = function () {
        return kd(Ed)
    }).raw = Ed;
    var Fd = Dd(function (a) {
        var b = Math.acos(a);
        return b && b / Math.sin(b)
    }, ob);
    (a.geo.azimuthalEquidistant = function () {
        return kd(Fd)
    }).raw = Fd, (a.geo.conicConformal = function () {
        return Oc(Gd)
    }).raw = Gd, (a.geo.conicEquidistant = function () {
        return Oc(Hd)
    }).raw = Hd;
    var Id = Dd(function (a) {
        return 1 / a
    }, Math.atan);
    (a.geo.gnomonic = function () {
        return kd(Id)
    }).raw = Id, Jd.invert = function (a, b) {
        return [a, 2 * Math.atan(Math.exp(b)) - qa]
    }, (a.geo.mercator = function () {
        return Kd(Jd)
    }).raw = Jd;
    var Ld = Dd(function () {
        return 1
    }, Math.asin);
    (a.geo.orthographic = function () {
        return kd(Ld)
    }).raw = Ld;
    var Md = Dd(function (a) {
        return 1 / (1 + a)
    }, function (a) {
        return 2 * Math.atan(a)
    });
    (a.geo.stereographic = function () {
        return kd(Md)
    }).raw = Md, Nd.invert = function (a, b) {
        return [-b, 2 * Math.atan(Math.exp(a)) - qa]
    }, (a.geo.transverseMercator = function () {
        var a = Kd(Nd), b = a.center, c = a.rotate;
        return a.center = function (a) {
            return a ? b([-a[1], a[0]]) : (a = b(), [-a[1], a[0]])
        }, a.rotate = function (a) {
            return a ? c([a[0], a[1], a.length > 2 ? a[2] + 90 : 90]) : (a = c(), [a[0], a[1], a[2] - 90])
        }, a.rotate([0, 0])
    }).raw = Nd, a.geom = {}, a.geom.hull = function (a) {
        function d(a) {
            if (a.length < 3)return [];
            var g, k, l, m, o, p, q, r, s, t, u, v, d = nb(b), e = nb(c), f = a.length, h = f - 1, i = [], j = [], n = 0;
            if (d === Od && c === Pd)g = a; else for (l = 0, g = []; l < f; ++l)g.push([+d.call(this, k = a[l], l), +e.call(this, k, l)]);
            for (l = 1; l < f; ++l)(g[l][1] < g[n][1] || g[l][1] == g[n][1] && g[l][0] < g[n][0]) && (n = l);
            for (l = 0; l < f; ++l)l !== n && (p = g[l][1] - g[n][1], o = g[l][0] - g[n][0], i.push({
                angle: Math.atan2(p, o),
                index: l
            }));
            for (i.sort(function (a, b) {
                return a.angle - b.angle
            }), u = i[0].angle, t = i[0].index, s = 0, l = 1; l < h; ++l) {
                if (m = i[l].index, u == i[l].angle) {
                    if (o = g[t][0] - g[n][0], p = g[t][1] - g[n][1], q = g[m][0] - g[n][0], r = g[m][1] - g[n][1], o * o + p * p >= q * q + r * r) {
                        i[l].index = -1;
                        continue
                    }
                    i[s].index = -1
                }
                u = i[l].angle, s = l, t = m
            }
            for (j.push(n), l = 0, m = 0; l < 2; ++m)i[m].index > -1 && (j.push(i[m].index), l++);
            for (v = j.length; m < h; ++m)if (!(i[m].index < 0)) {
                for (; !Qd(j[v - 2], j[v - 1], i[m].index, g);)--v;
                j[v++] = i[m].index
            }
            var w = [];
            for (l = v - 1; l >= 0; --l)w.push(a[j[l]]);
            return w
        }

        var b = Od, c = Pd;
        return arguments.length ? d(a) : (d.x = function (a) {
            return arguments.length ? (b = a, d) : b
        }, d.y = function (a) {
            return arguments.length ? (c = a, d) : c
        }, d)
    }, a.geom.polygon = function (a) {
        return F(a, Rd), a
    };
    var Rd = a.geom.polygon.prototype = [];
    Rd.area = function () {
        for (var c, a = -1, b = this.length, d = this[b - 1], e = 0; ++a < b;)c = d, d = this[a], e += c[1] * d[0] - c[0] * d[1];
        return .5 * e
    }, Rd.centroid = function (a) {
        var f, h, b = -1, c = this.length, d = 0, e = 0, g = this[c - 1];
        for (arguments.length || (a = -1 / (6 * this.area())); ++b < c;)f = g, g = this[b], h = f[0] * g[1] - g[0] * f[1], d += (f[0] + g[0]) * h, e += (f[1] + g[1]) * h;
        return [d * a, e * a]
    }, Rd.clip = function (a) {
        for (var b, f, g, i, j, k, c = Ud(a), d = -1, e = this.length - Ud(this), h = this[e - 1]; ++d < e;) {
            for (b = a.slice(), a.length = 0, i = this[d], j = b[(g = b.length - c) - 1], f = -1; ++f < g;)k = b[f], Sd(k, h, i) ? (Sd(j, h, i) || a.push(Td(j, k, h, i)), a.push(k)) : Sd(j, h, i) && a.push(Td(j, k, h, i)), j = k;
            c && a.push(a[0]), h = i
        }
        return a
    };
    var Vd, Wd, Xd, Zd, $d, Yd = [], _d = [];
    he.prototype.prepare = function () {
        for (var c, a = this.edges, b = a.length; b--;)c = a[b].edge, c.b && c.a || a.splice(b, 1);
        return a.sort(je), a.length
    }, te.prototype = {
        start: function () {
            return this.edge.l === this.site ? this.edge.a : this.edge.b
        }, end: function () {
            return this.edge.l === this.site ? this.edge.b : this.edge.a
        }
    }, ue.prototype = {
        insert: function (a, b) {
            var c, d, e;
            if (a) {
                if (b.P = a, b.N = a.N, a.N && (a.N.P = b), a.N = b, a.R) {
                    for (a = a.R; a.L;)a = a.L;
                    a.L = b
                } else a.R = b;
                c = a
            } else this._ ? (a = ye(this._), b.P = null, b.N = a, a.P = a.L = b, c = a) : (b.P = b.N = null, this._ = b, c = null);
            for (b.L = b.R = null, b.U = c, b.C = !0, a = b; c && c.C;)d = c.U, c === d.L ? (e = d.R, e && e.C ? (c.C = e.C = !1, d.C = !0, a = d) : (a === c.R && (we(this, c), a = c, c = a.U), c.C = !1, d.C = !0, xe(this, d))) : (e = d.L, e && e.C ? (c.C = e.C = !1, d.C = !0, a = d) : (a === c.L && (xe(this, c), a = c, c = a.U), c.C = !1, d.C = !0, we(this, d))), c = a.U;
            this._.C = !1
        }, remove: function (a) {
            a.N && (a.N.P = a.P), a.P && (a.P.N = a.N), a.N = a.P = null;
            var c, f, g, b = a.U, d = a.L, e = a.R;
            if (f = d ? e ? ye(e) : d : e, b ? b.L === a ? b.L = f : b.R = f : this._ = f, d && e ? (g = f.C, f.C = a.C, f.L = d, d.U = f, f !== e ? (b = f.U, f.U = a.U, a = f.R, b.L = a, f.R = e, e.U = f) : (f.U = b, b = f, a = f.R)) : (g = a.C, a = f), a && (a.U = b), !g) {
                if (a && a.C)return void(a.C = !1);
                do {
                    if (a === this._)break;
                    if (a === b.L) {
                        if (c = b.R, c.C && (c.C = !1, b.C = !0, we(this, b), c = b.R), c.L && c.L.C || c.R && c.R.C) {
                            c.R && c.R.C || (c.L.C = !1, c.C = !0, xe(this, c), c = b.R), c.C = b.C, b.C = c.R.C = !1, we(this, b), a = this._;
                            break
                        }
                    } else if (c = b.L, c.C && (c.C = !1, b.C = !0, xe(this, b), c = b.L), c.L && c.L.C || c.R && c.R.C) {
                        c.L && c.L.C || (c.R.C = !1, c.C = !0, we(this, c), c = b.L), c.C = b.C, b.C = c.L.C = !1, xe(this, b), a = this._;
                        break
                    }
                    c.C = !0, a = b, b = b.U
                } while (!a.C);
                a && (a.C = !1)
            }
        }
    }, a.geom.voronoi = function (a) {
        function g(a) {
            var b = new Array(a.length), c = f[0][0], d = f[0][1], e = f[1][0], g = f[1][1];
            return ze(h(a), f).cells.forEach(function (f, h) {
                var i = f.edges, j = f.site, k = b[h] = i.length ? i.map(function (a) {
                    var b = a.start();
                    return [b.x, b.y]
                }) : j.x >= c && j.x <= e && j.y >= d && j.y <= g ? [[c, g], [e, g], [e, d], [c, d]] : [];
                k.point = a[h]
            }), b
        }

        function h(a) {
            return a.map(function (a, b) {
                return {x: Math.round(d(a, b) / ra) * ra, y: Math.round(e(a, b) / ra) * ra, i: b}
            })
        }

        var b = Od, c = Pd, d = b, e = c, f = Be;
        return a ? g(a) : (g.links = function (a) {
            return ze(h(a)).edges.filter(function (a) {
                return a.l && a.r
            }).map(function (b) {
                return {source: a[b.l.i], target: a[b.r.i]}
            })
        }, g.triangles = function (a) {
            var b = [];
            return ze(h(a)).cells.forEach(function (c, d) {
                for (var i, j, e = c.site, f = c.edges.sort(je), g = -1, h = f.length, k = f[h - 1].edge, l = k.l === e ? k.r : k.l; ++g < h;)i = k, j = l, k = f[g].edge, l = k.l === e ? k.r : k.l, d < j.i && d < l.i && Ce(e, j, l) < 0 && b.push([a[d], a[j.i], a[l.i]])
            }), b
        }, g.x = function (a) {
            return arguments.length ? (d = nb(b = a), g) : b
        }, g.y = function (a) {
            return arguments.length ? (e = nb(c = a), g) : c
        }, g.clipExtent = function (a) {
            return arguments.length ? (f = null == a ? Be : a, g) : f === Be ? null : f
        }, g.size = function (a) {
            return arguments.length ? g.clipExtent(a && [[0, 0], a]) : f === Be ? null : f && f[1]
        }, g)
    };
    var Be = [[-1e6, -1e6], [1e6, 1e6]];
    a.geom.delaunay = function (b) {
        return a.geom.voronoi().triangles(b)
    }, a.geom.quadtree = function (a, b, c, d, e) {
        function i(a) {
            function y(a, b, c, d, e, f, g, h) {
                if (!isNaN(c) && !isNaN(d))if (a.leaf) {
                    var i = a.x, j = a.y;
                    if (null != i)if (o(i - c) + o(j - d) < .01)z(a, b, c, d, e, f, g, h); else {
                        var k = a.point;
                        a.x = a.y = a.point = null, z(a, k, i, j, e, f, g, h), z(a, b, c, d, e, f, g, h)
                    } else a.x = c, a.y = d, a.point = b
                } else z(a, b, c, d, e, f, g, h)
            }

            function z(a, b, c, d, e, f, g, h) {
                var i = .5 * (e + g), j = .5 * (f + h), k = c >= i, l = d >= j, m = (l << 1) + k;
                a.leaf = !1, a = a.nodes[m] || (a.nodes[m] = Fe()), k ? e = i : g = i, l ? f = j : h = j, y(a, b, c, d, e, f, g, h)
            }

            var i, l, m, n, p, q, r, s, t, j = nb(f), k = nb(g);
            if (null != b)q = b, r = c, s = d, t = e; else if (s = t = -(q = r = 1 / 0), l = [], m = [], p = a.length, h)for (n = 0; n < p; ++n)i = a[n], i.x < q && (q = i.x), i.y < r && (r = i.y), i.x > s && (s = i.x), i.y > t && (t = i.y), l.push(i.x), m.push(i.y); else for (n = 0; n < p; ++n) {
                var u = +j(i = a[n], n), v = +k(i, n);
                u < q && (q = u), v < r && (r = v), u > s && (s = u), v > t && (t = v), l.push(u), m.push(v)
            }
            var w = s - q, x = t - r;
            w > x ? t = r + w : s = q + x;
            var A = Fe();
            if (A.add = function (a) {
                    y(A, a, +j(a, ++n), +k(a, n), q, r, s, t)
                }, A.visit = function (a) {
                    Ge(a, A, q, r, s, t)
                }, n = -1, null == b) {
                for (; ++n < p;)y(A, a[n], l[n], m[n], q, r, s, t);
                --n
            } else a.forEach(A.add);
            return l = m = a = i = null, A
        }

        var h, f = Od, g = Pd;
        return (h = arguments.length) ? (f = De, g = Ee, 3 === h && (e = c, d = b, c = b = 0), i(a)) : (i.x = function (a) {
            return arguments.length ? (f = a, i) : f
        }, i.y = function (a) {
            return arguments.length ? (g = a, i) : g
        }, i.extent = function (a) {
            return arguments.length ? (null == a ? b = c = d = e = null : (b = +a[0][0], c = +a[0][1], d = +a[1][0], e = +a[1][1]), i) : null == b ? null : [[b, c], [d, e]]
        }, i.size = function (a) {
            return arguments.length ? (null == a ? b = c = d = e = null : (b = c = 0, d = +a[0], e = +a[1]), i) : null == b ? null : [d - b, e - c]
        }, i)
    }, a.interpolateRgb = He, a.interpolateObject = Ie, a.interpolateNumber = Je, a.interpolateString = Ke;
    var Le = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    a.interpolate = Me, a.interpolators = [function (a, b) {
        var c = typeof b;
        return ("string" === c ? mb.has(b) || /^(#|rgb\(|hsl\()/.test(b) ? He : Ke : b instanceof Ia ? He : "object" === c ? Array.isArray(b) ? Ne : Ie : Je)(a, b)
    }], a.interpolateArray = Ne;
    var Oe = function () {
        return ob
    }, Pe = a.map({
        linear: Oe, poly: Xe, quad: function () {
            return Ue
        }, cubic: function () {
            return Ve
        }, sin: function () {
            return Ye
        }, exp: function () {
            return Ze
        }, circle: function () {
            return $e
        }, elastic: _e, back: af, bounce: function () {
            return bf
        }
    }), Qe = a.map({
        in: ob, out: Se, "in-out": Te, "out-in": function (a) {
            return Te(Se(a))
        }
    });
    a.ease = function (a) {
        var c = a.indexOf("-"), d = c >= 0 ? a.substring(0, c) : a, e = c >= 0 ? a.substring(c + 1) : "in";
        return d = Pe.get(d) || Oe, e = Qe.get(e) || ob, Re(e(d.apply(null, b.call(arguments, 1))))
    }, a.interpolateHcl = cf, a.interpolateHsl = df, a.interpolateLab = ef, a.interpolateRound = ff, a.transform = function (b) {
        var c = d.createElementNS(a.ns.prefix.svg, "g");
        return (a.transform = function (a) {
            if (null != a) {
                c.setAttribute("transform", a);
                var b = c.transform.baseVal.consolidate()
            }
            return new gf(b ? b.matrix : lf)
        })(b)
    }, gf.prototype.toString = function () {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var lf = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
    a.interpolateTransform = mf, a.layout = {}, a.layout.bundle = function () {
        return function (a) {
            for (var b = [], c = -1, d = a.length; ++c < d;)b.push(pf(a[c]));
            return b
        }
    }, a.layout.chord = function () {
        function k() {
            var o, p, q, r, s, b = {}, k = [], m = a.range(f), n = [];
            for (c = [], d = [], o = 0, r = -1; ++r < f;) {
                for (p = 0, s = -1; ++s < f;)p += e[r][s];
                k.push(p), n.push(a.range(f)), o += p
            }
            for (h && m.sort(function (a, b) {
                return h(k[a], k[b])
            }), i && n.forEach(function (a, b) {
                a.sort(function (a, c) {
                    return i(e[b][a], e[b][c])
                })
            }), o = (pa - g * f) / o, p = 0, r = -1; ++r < f;) {
                for (q = p, s = -1; ++s < f;) {
                    var t = m[r], u = n[t][s], v = e[t][u], w = p, x = p += v * o;
                    b[t + "-" + u] = {index: t, subindex: u, startAngle: w, endAngle: x, value: v}
                }
                d[t] = {index: t, startAngle: q, endAngle: p, value: (p - q) / o}, p += g
            }
            for (r = -1; ++r < f;)for (s = r - 1; ++s < f;) {
                var y = b[r + "-" + s], z = b[s + "-" + r];
                (y.value || z.value) && c.push(y.value < z.value ? {source: z, target: y} : {source: y, target: z})
            }
            j && l()
        }

        function l() {
            c.sort(function (a, b) {
                return j((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2)
            })
        }

        var c, d, e, f, h, i, j, b = {}, g = 0;
        return b.matrix = function (a) {
            return arguments.length ? (f = (e = a) && e.length, c = d = null, b) : e
        }, b.padding = function (a) {
            return arguments.length ? (g = a, c = d = null, b) : g
        }, b.sortGroups = function (a) {
            return arguments.length ? (h = a, c = d = null, b) : h
        }, b.sortSubgroups = function (a) {
            return arguments.length ? (i = a, c = null, b) : i
        }, b.sortChords = function (a) {
            return arguments.length ? (j = a, c && l(), b) : j
        }, b.chords = function () {
            return c || k(), c
        }, b.groups = function () {
            return d || k(), d
        }, b
    }, a.layout.force = function () {
        function r(a) {
            return function (b, c, d, e) {
                if (b.point !== a) {
                    var f = b.cx - a.x, g = b.cy - a.y, h = 1 / Math.sqrt(f * f + g * g);
                    if ((e - c) * h < l) {
                        var i = b.charge * h * h;
                        return a.px -= f * i, a.py -= g * i, !0
                    }
                    if (b.point && isFinite(h)) {
                        var i = b.pointCharge * h * h;
                        a.px -= f * i, a.py -= g * i
                    }
                }
                return !b.charge
            }
        }

        function s(c) {
            c.px = a.event.x, c.py = a.event.y, b.resume()
        }

        var e, f, o, p, q, b = {}, c = a.dispatch("start", "tick", "end"), d = [1, 1], g = .9, h = xf, i = yf, j = -30, k = .1, l = .8, m = [], n = [];
        return b.tick = function () {
            if ((f *= .99) < .005)return c.end({type: "end", alpha: f = 0}), !0;
            var h, i, l, s, t, u, v, w, x, b = m.length, e = n.length;
            for (i = 0; i < e; ++i)l = n[i], s = l.source, t = l.target, w = t.x - s.x, x = t.y - s.y, (u = w * w + x * x) && (u = f * p[i] * ((u = Math.sqrt(u)) - o[i]) / u, w *= u, x *= u, t.x -= w * (v = s.weight / (t.weight + s.weight)), t.y -= x * v, s.x += w * (v = 1 - v), s.y += x * v);
            if ((v = f * k) && (w = d[0] / 2, x = d[1] / 2, i = -1, v))for (; ++i < b;)l = m[i], l.x += (w - l.x) * v, l.y += (x - l.y) * v;
            if (j)for (wf(h = a.geom.quadtree(m), f, q), i = -1; ++i < b;)(l = m[i]).fixed || h.visit(r(l));
            for (i = -1; ++i < b;)l = m[i], l.fixed ? (l.x = l.px, l.y = l.py) : (l.x -= (l.px - (l.px = l.x)) * g, l.y -= (l.py - (l.py = l.y)) * g);
            c.tick({type: "tick", alpha: f})
        }, b.nodes = function (a) {
            return arguments.length ? (m = a, b) : m
        }, b.links = function (a) {
            return arguments.length ? (n = a, b) : n
        }, b.size = function (a) {
            return arguments.length ? (d = a, b) : d
        }, b.linkDistance = function (a) {
            return arguments.length ? (h = "function" == typeof a ? a : +a, b) : h
        }, b.distance = b.linkDistance, b.linkStrength = function (a) {
            return arguments.length ? (i = "function" == typeof a ? a : +a, b) : i
        }, b.friction = function (a) {
            return arguments.length ? (g = +a, b) : g
        }, b.charge = function (a) {
            return arguments.length ? (j = "function" == typeof a ? a : +a, b) : j
        }, b.gravity = function (a) {
            return arguments.length ? (k = +a, b) : k
        }, b.theta = function (a) {
            return arguments.length ? (l = +a, b) : l
        }, b.alpha = function (d) {
            return arguments.length ? (d = +d, f ? f = d > 0 ? d : 0 : d > 0 && (c.start({
                type: "start",
                alpha: f = d
            }), a.timer(b.tick)), b) : f
        }, b.start = function () {
            function r(b, d) {
                if (!k) {
                    for (k = new Array(c), g = 0; g < c; ++g)k[g] = [];
                    for (g = 0; g < h; ++g) {
                        var e = n[g];
                        k[e.source.index].push(e.target), k[e.target.index].push(e.source)
                    }
                }
                for (var i, f = k[a], g = -1, h = f.length; ++g < h;)if (!isNaN(i = f[g][b]))return i;
                return Math.random() * d
            }

            var a, k, l, c = m.length, e = n.length, f = d[0], g = d[1];
            for (a = 0; a < c; ++a)(l = m[a]).index = a, l.weight = 0;
            for (a = 0; a < e; ++a)l = n[a], "number" == typeof l.source && (l.source = m[l.source]), "number" == typeof l.target && (l.target = m[l.target]), ++l.source.weight, ++l.target.weight;
            for (a = 0; a < c; ++a)l = m[a], isNaN(l.x) && (l.x = r("x", f)), isNaN(l.y) && (l.y = r("y", g)), isNaN(l.px) && (l.px = l.x), isNaN(l.py) && (l.py = l.y);
            if (o = [], "function" == typeof h)for (a = 0; a < e; ++a)o[a] = +h.call(this, n[a], a); else for (a = 0; a < e; ++a)o[a] = h;
            if (p = [], "function" == typeof i)for (a = 0; a < e; ++a)p[a] = +i.call(this, n[a], a); else for (a = 0; a < e; ++a)p[a] = i;
            if (q = [], "function" == typeof j)for (a = 0; a < c; ++a)q[a] = +j.call(this, m[a], a); else for (a = 0; a < c; ++a)q[a] = j;
            return b.resume()
        }, b.resume = function () {
            return b.alpha(.1)
        }, b.stop = function () {
            return b.alpha(0)
        }, b.drag = function () {
            return e || (e = a.behavior.drag().origin(ob).on("dragstart.force", sf).on("drag.force", s).on("dragend.force", tf)), arguments.length ? void this.on("mouseover.force", uf).on("mouseout.force", vf).call(e) : e
        }, a.rebind(b, c, "on")
    };
    var xf = 20, yf = 1;
    a.layout.hierarchy = function () {
        function d(e, g, h) {
            var i = b.call(f, e, g);
            if (e.depth = g, h.push(e), i && (k = i.length)) {
                for (var k, o, j = -1, l = e.children = new Array(k), m = 0, n = g + 1; ++j < k;)o = l[j] = d(i[j], n, h), o.parent = e, m += o.value;
                a && l.sort(a), c && (e.value = m)
            } else delete e.children, c && (e.value = +c.call(f, e, g) || 0);
            return e
        }

        function e(a, b) {
            var d = a.children, g = 0;
            if (d && (i = d.length))for (var i, h = -1, j = b + 1; ++h < i;)g += e(d[h], j); else c && (g = +c.call(f, a, b) || 0);
            return c && (a.value = g), g
        }

        function f(a) {
            var b = [];
            return d(a, 0, b), b
        }

        var a = Cf, b = Af, c = Bf;
        return f.sort = function (b) {
            return arguments.length ? (a = b, f) : a
        }, f.children = function (a) {
            return arguments.length ? (b = a, f) : b
        }, f.value = function (a) {
            return arguments.length ? (c = a, f) : c
        }, f.revalue = function (a) {
            return e(a, 0), a
        }, f
    }, a.layout.partition = function () {
        function d(a, b, c, e) {
            var f = a.children;
            if (a.x = b, a.y = a.depth * e, a.dx = c, a.dy = e, f && (h = f.length)) {
                var h, i, j, g = -1;
                for (c = a.value ? c / a.value : 0; ++g < h;)d(i = f[g], b, j = i.value * c, e), b += j
            }
        }

        function e(a) {
            var b = a.children, c = 0;
            if (b && (f = b.length))for (var f, d = -1; ++d < f;)c = Math.max(c, e(b[d]));
            return 1 + c
        }

        function f(a, f) {
            var g = b.call(this, a, f);
            return d(g[0], 0, c[0], c[1] / e(g[0])), g
        }

        var b = a.layout.hierarchy(), c = [1, 1];
        return f.size = function (a) {
            return arguments.length ? (c = a, f) : c
        }, zf(f, b)
    }, a.layout.pie = function () {
        function f(g) {
            var h = g.map(function (a, c) {
                return +b.call(f, a, c)
            }), i = +("function" == typeof d ? d.apply(this, arguments) : d), j = (("function" == typeof e ? e.apply(this, arguments) : e) - i) / a.sum(h), k = a.range(g.length);
            null != c && k.sort(c === Ef ? function (a, b) {
                return h[b] - h[a]
            } : function (a, b) {
                return c(g[a], g[b])
            });
            var l = [];
            return k.forEach(function (a) {
                var b;
                l[a] = {data: g[a], value: b = h[a], startAngle: i, endAngle: i += b * j}
            }), l
        }

        var b = Number, c = Ef, d = 0, e = pa;
        return f.value = function (a) {
            return arguments.length ? (b = a, f) : b
        }, f.sort = function (a) {
            return arguments.length ? (c = a, f) : c
        }, f.startAngle = function (a) {
            return arguments.length ? (d = a, f) : d
        }, f.endAngle = function (a) {
            return arguments.length ? (e = a, f) : e
        }, f
    };
    var Ef = {};
    a.layout.stack = function () {
        function h(i, j) {
            var k = i.map(function (a, c) {
                return b.call(h, a, c)
            }), l = k.map(function (a) {
                return a.map(function (a, b) {
                    return [f.call(h, a, b), g.call(h, a, b)]
                })
            }), m = c.call(h, l, j);
            k = a.permute(k, m), l = a.permute(l, m);
            var q, r, s, n = d.call(h, l, j), o = k.length, p = k[0].length;
            for (r = 0; r < p; ++r)for (e.call(h, k[0][r], s = n[r], l[0][r][1]), q = 1; q < o; ++q)e.call(h, k[q][r], s += l[q - 1][r][1], l[q][r][1]);
            return i
        }

        var b = ob, c = Kf, d = Lf, e = Hf, f = Ff, g = Gf;
        return h.values = function (a) {
            return arguments.length ? (b = a, h) : b
        }, h.order = function (a) {
            return arguments.length ? (c = "function" == typeof a ? a : If.get(a) || Kf, h) : c
        }, h.offset = function (a) {
            return arguments.length ? (d = "function" == typeof a ? a : Jf.get(a) || Lf, h) : d
        }, h.x = function (a) {
            return arguments.length ? (f = a, h) : f
        }, h.y = function (a) {
            return arguments.length ? (g = a, h) : g
        }, h.out = function (a) {
            return arguments.length ? (e = a, h) : e
        }, h
    };
    var If = a.map({
        "inside-out": function (b) {
            var d, e, c = b.length, f = b.map(Mf), g = b.map(Nf), h = a.range(c).sort(function (a, b) {
                return f[a] - f[b]
            }), i = 0, j = 0, k = [], l = [];
            for (d = 0; d < c; ++d)e = h[d], i < j ? (i += g[e], k.push(e)) : (j += g[e], l.push(e));
            return l.reverse().concat(k)
        }, reverse: function (b) {
            return a.range(b.length).reverse()
        }, default: Kf
    }), Jf = a.map({
        silhouette: function (a) {
            var f, g, h, b = a.length, c = a[0].length, d = [], e = 0, i = [];
            for (g = 0; g < c; ++g) {
                for (f = 0, h = 0; f < b; f++)h += a[f][g][1];
                h > e && (e = h), d.push(h)
            }
            for (g = 0; g < c; ++g)i[g] = (e - d[g]) / 2;
            return i
        }, wiggle: function (a) {
            var e, f, g, h, i, j, k, l, m, b = a.length, c = a[0], d = c.length, n = [];
            for (n[0] = l = m = 0, f = 1; f < d; ++f) {
                for (e = 0, h = 0; e < b; ++e)h += a[e][f][1];
                for (e = 0, i = 0, k = c[f][0] - c[f - 1][0]; e < b; ++e) {
                    for (g = 0, j = (a[e][f][1] - a[e][f - 1][1]) / (2 * k); g < e; ++g)j += (a[g][f][1] - a[g][f - 1][1]) / k;
                    i += j * a[e][f][1]
                }
                n[f] = l -= h ? i / h * k : 0, l < m && (m = l)
            }
            for (f = 0; f < d; ++f)n[f] -= m;
            return n
        }, expand: function (a) {
            var e, f, g, b = a.length, c = a[0].length, d = 1 / b, h = [];
            for (f = 0; f < c; ++f) {
                for (e = 0, g = 0; e < b; e++)g += a[e][f][1];
                if (g)for (e = 0; e < b; e++)a[e][f][1] /= g; else for (e = 0; e < b; e++)a[e][f][1] = d
            }
            for (f = 0; f < c; ++f)h[f] = 0;
            return h
        }, zero: Lf
    });
    a.layout.histogram = function () {
        function f(f, g) {
            for (var l, p, h = [], i = f.map(c, this), j = d.call(this, i, g), k = e.call(this, j, i, g), g = -1, m = i.length, n = k.length - 1, o = b ? 1 : 1 / m; ++g < n;)l = h[g] = [], l.dx = k[g + 1] - (l.x = k[g]), l.y = 0;
            if (n > 0)for (g = -1; ++g < m;)p = i[g], p >= j[0] && p <= j[1] && (l = h[a.bisect(k, p, 1, n) - 1], l.y += o, l.push(f[g]));
            return h
        }

        var b = !0, c = Number, d = Rf, e = Pf;
        return f.value = function (a) {
            return arguments.length ? (c = a, f) : c
        }, f.range = function (a) {
            return arguments.length ? (d = nb(a), f) : d
        }, f.bins = function (a) {
            return arguments.length ? (e = "number" == typeof a ? function (b) {
                return Qf(b, a)
            } : nb(a), f) : e
        }, f.frequency = function (a) {
            return arguments.length ? (b = !!a, f) : b
        }, f
    }, a.layout.tree = function () {
        function f(a, f) {
            function i(a, b) {
                var d = a.children, e = a._tree;
                if (d && (f = d.length)) {
                    for (var f, h, l, g = d[0], j = g, m = -1; ++m < f;)l = d[m], i(l, h), j = k(l, h, j), h = l;
                    $f(a);
                    var n = .5 * (g._tree.prelim + l._tree.prelim);
                    b ? (e.prelim = b._tree.prelim + c(a, b), e.mod = e.prelim - n) : e.prelim = n
                } else b && (e.prelim = b._tree.prelim + c(a, b))
            }

            function j(a, b) {
                a.x = a._tree.prelim + b;
                var c = a.children;
                if (c && (e = c.length)) {
                    var e, d = -1;
                    for (b += a._tree.mod; ++d < e;)j(c[d], b)
                }
            }

            function k(a, b, d) {
                if (b) {
                    for (var m, e = a, f = a, g = b, h = a.parent.children[0], i = e._tree.mod, j = f._tree.mod, k = g._tree.mod, l = h._tree.mod; g = Uf(g), e = Tf(e), g && e;)h = Tf(h), f = Uf(f), f._tree.ancestor = a, m = g._tree.prelim + k - e._tree.prelim - i + c(g, e), m > 0 && (_f(ag(g, a, d), a, m), i += m, j += m), k += g._tree.mod, i += e._tree.mod, l += h._tree.mod, j += f._tree.mod;
                    g && !Uf(f) && (f._tree.thread = g, f._tree.mod += k - j), e && !Tf(h) && (h._tree.thread = e, h._tree.mod += i - l, d = a)
                }
                return d
            }

            var g = b.call(this, a, f), h = g[0];
            Zf(h, function (a, b) {
                a._tree = {ancestor: a, prelim: 0, mod: 0, change: 0, shift: 0, number: b ? b._tree.number + 1 : 0}
            }), i(h), j(h, -h._tree.prelim);
            var l = Vf(h, Xf), m = Vf(h, Wf), n = Vf(h, Yf), o = l.x - c(l, m) / 2, p = m.x + c(m, l) / 2, q = n.depth || 1;
            return Zf(h, e ? function (a) {
                a.x *= d[0], a.y = a.depth * d[1], delete a._tree
            } : function (a) {
                a.x = (a.x - o) / (p - o) * d[0], a.y = a.depth / q * d[1], delete a._tree
            }), g
        }

        var b = a.layout.hierarchy().sort(null).value(null), c = Sf, d = [1, 1], e = !1;
        return f.separation = function (a) {
            return arguments.length ? (c = a, f) : c
        }, f.size = function (a) {
            return arguments.length ? (e = null == (d = a), f) : e ? null : d
        }, f.nodeSize = function (a) {
            return arguments.length ? (e = null != (d = a), f) : e ? d : null
        }, zf(f, b)
    }, a.layout.pack = function () {
        function f(a, f) {
            var g = b.call(this, a, f), h = g[0], i = d[0], j = d[1], k = null == e ? Math.sqrt : "function" == typeof e ? e : function () {
                return e
            };
            if (h.x = h.y = 0, Zf(h, function (a) {
                    a.r = +k(a.value)
                }), Zf(h, fg), c) {
                var l = c * (e ? 1 : Math.max(2 * h.r / i, 2 * h.r / j)) / 2;
                Zf(h, function (a) {
                    a.r += l
                }), Zf(h, fg), Zf(h, function (a) {
                    a.r -= l
                })
            }
            return ig(h, i / 2, j / 2, e ? 1 : 1 / Math.max(2 * h.r / i, 2 * h.r / j)), g
        }

        var e, b = a.layout.hierarchy().sort(bg), c = 0, d = [1, 1];
        return f.size = function (a) {
            return arguments.length ? (d = a, f) : d
        }, f.radius = function (a) {
            return arguments.length ? (e = null == a || "function" == typeof a ? a : +a, f) : e
        }, f.padding = function (a) {
            return arguments.length ? (c = +a, f) : c
        }, zf(f, b)
    }, a.layout.cluster = function () {
        function f(a, f) {
            var i, g = b.call(this, a, f), h = g[0], j = 0;
            Zf(h, function (a) {
                var b = a.children;
                b && b.length ? (a.x = lg(b), a.y = kg(b)) : (a.x = i ? j += c(a, i) : 0, a.y = 0, i = a)
            });
            var k = mg(h), l = ng(h), m = k.x - c(k, l) / 2, n = l.x + c(l, k) / 2;
            return Zf(h, e ? function (a) {
                a.x = (a.x - h.x) * d[0], a.y = (h.y - a.y) * d[1]
            } : function (a) {
                a.x = (a.x - m) / (n - m) * d[0], a.y = (1 - (h.y ? a.y / h.y : 1)) * d[1]
            }), g
        }

        var b = a.layout.hierarchy().sort(null).value(null), c = Sf, d = [1, 1], e = !1;
        return f.separation = function (a) {
            return arguments.length ? (c = a, f) : c
        }, f.size = function (a) {
            return arguments.length ? (e = null == (d = a), f) : e ? null : d
        }, f.nodeSize = function (a) {
            return arguments.length ? (e = null != (d = a), f) : e ? d : null
        }, zf(f, b)
    }, a.layout.treemap = function () {
        function k(a, b) {
            for (var e, f, c = -1, d = a.length; ++c < d;)f = (e = a[c]).value * (b < 0 ? 0 : b), e.area = isNaN(f) || f <= 0 ? 0 : f
        }

        function l(a) {
            var b = a.children;
            if (b && b.length) {
                var g, j, p, c = f(a), d = [], e = b.slice(), h = 1 / 0, m = "slice" === i ? c.dx : "dice" === i ? c.dy : "slice-dice" === i ? 1 & a.depth ? c.dy : c.dx : Math.min(c.dx, c.dy);
                for (k(e, c.dx * c.dy / a.value), d.area = 0; (p = e.length) > 0;)d.push(g = e[p - 1]), d.area += g.area, "squarify" !== i || (j = n(d, m)) <= h ? (e.pop(), h = j) : (d.area -= d.pop().area, o(d, m, c, !1), m = Math.min(c.dx, c.dy), d.length = d.area = 0, h = 1 / 0);
                d.length && (o(d, m, c, !0), d.length = d.area = 0), b.forEach(l)
            }
        }

        function m(a) {
            var b = a.children;
            if (b && b.length) {
                var e, c = f(a), d = b.slice(), g = [];
                for (k(d, c.dx * c.dy / a.value), g.area = 0; e = d.pop();)g.push(e), g.area += e.area, null != e.z && (o(g, e.z ? c.dx : c.dy, c, !d.length), g.length = g.area = 0);
                b.forEach(m)
            }
        }

        function n(a, b) {
            for (var d, c = a.area, e = 0, f = 1 / 0, g = -1, h = a.length; ++g < h;)(d = a[g].area) && (d < f && (f = d), d > e && (e = d));
            return c *= c, b *= b, c ? Math.max(b * e * j / c, c / (b * f * j)) : 1 / 0
        }

        function o(a, b, d, e) {
            var k, f = -1, g = a.length, h = d.x, i = d.y, j = b ? c(a.area / b) : 0;
            if (b == d.dx) {
                for ((e || j > d.dy) && (j = d.dy); ++f < g;)k = a[f], k.x = h, k.y = i, k.dy = j, h += k.dx = Math.min(d.x + d.dx - h, j ? c(k.area / j) : 0);
                k.z = !0, k.dx += d.x + d.dx - h, d.y += j, d.dy -= j
            } else {
                for ((e || j > d.dx) && (j = d.dx); ++f < g;)k = a[f], k.x = h, k.y = i, k.dx = j, i += k.dy = Math.min(d.y + d.dy - i, j ? c(k.area / j) : 0);
                k.z = !1, k.dy += d.y + d.dy - i, d.x += j, d.dx -= j
            }
        }

        function p(a) {
            var c = h || b(a), e = c[0];
            return e.x = 0, e.y = 0, e.dx = d[0], e.dy = d[1], h && b.revalue(e), k([e], e.dx * e.dy / e.value), (h ? m : l)(e), g && (h = c), c
        }

        var h, b = a.layout.hierarchy(), c = Math.round, d = [1, 1], e = null, f = og, g = !1, i = "squarify", j = .5 * (1 + Math.sqrt(5));
        return p.size = function (a) {
            return arguments.length ? (d = a, p) : d
        }, p.padding = function (a) {
            function b(b) {
                var c = a.call(p, b, b.depth);
                return null == c ? og(b) : pg(b, "number" == typeof c ? [c, c, c, c] : c)
            }

            function c(b) {
                return pg(b, a)
            }

            if (!arguments.length)return e;
            var d;
            return f = null == (e = a) ? og : "function" == (d = typeof a) ? b : "number" === d ? (a = [a, a, a, a], c) : c, p
        }, p.round = function (a) {
            return arguments.length ? (c = a ? Math.round : Number, p) : c != Number
        }, p.sticky = function (a) {
            return arguments.length ? (g = a, h = null, p) : g
        }, p.ratio = function (a) {
            return arguments.length ? (j = a, p) : j
        }, p.mode = function (a) {
            return arguments.length ? (i = a + "", p) : i
        }, zf(p, b)
    }, a.random = {
        normal: function (a, b) {
            var c = arguments.length;
            return c < 2 && (b = 1), c < 1 && (a = 0), function () {
                var c, d, e;
                do c = 2 * Math.random() - 1, d = 2 * Math.random() - 1, e = c * c + d * d; while (!e || e > 1);
                return a + b * c * Math.sqrt(-2 * Math.log(e) / e)
            }
        }, logNormal: function () {
            var b = a.random.normal.apply(a, arguments);
            return function () {
                return Math.exp(b())
            }
        }, bates: function (b) {
            var c = a.random.irwinHall(b);
            return function () {
                return c() / b
            }
        }, irwinHall: function (a) {
            return function () {
                for (var b = 0, c = 0; c < a; c++)b += Math.random();
                return b
            }
        }
    }, a.scale = {};
    var vg = {floor: ob, ceil: ob};
    a.scale.linear = function () {
        return xg([0, 1], [0, 1], Me, !1)
    };
    var Dg = {s: 1, g: 1, p: 1, r: 1, e: 1};
    a.scale.log = function () {
        return Gg(a.scale.linear().domain([0, 1]), 10, !0, [1, 10])
    };
    var Hg = a.format(".0e"), Ig = {
        floor: function (a) {
            return -Math.ceil(-a)
        }, ceil: function (a) {
            return -Math.floor(-a)
        }
    };
    a.scale.pow = function () {
        return Jg(a.scale.linear(), 1, [0, 1])
    }, a.scale.sqrt = function () {
        return a.scale.pow().exponent(.5)
    }, a.scale.ordinal = function () {
        return Lg([], {t: "range", a: [[]]})
    }, a.scale.category10 = function () {
        return a.scale.ordinal().range(Mg)
    }, a.scale.category20 = function () {
        return a.scale.ordinal().range(Ng)
    }, a.scale.category20b = function () {
        return a.scale.ordinal().range(Og)
    }, a.scale.category20c = function () {
        return a.scale.ordinal().range(Pg)
    };
    var Mg = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(cb), Ng = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(cb), Og = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(cb), Pg = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(cb);
    a.scale.quantile = function () {
        return Qg([], [])
    }, a.scale.quantize = function () {
        return Rg(0, 1, [0, 1])
    }, a.scale.threshold = function () {
        return Sg([.5], [0, 1])
    }, a.scale.identity = function () {
        return Tg([0, 1])
    }, a.svg = {}, a.svg.arc = function () {
        function e() {
            var e = a.apply(this, arguments), f = b.apply(this, arguments), g = c.apply(this, arguments) + Ug, h = d.apply(this, arguments) + Ug, i = (h < g && (i = g, g = h, h = i), h - g), j = i < oa ? "0" : "1", k = Math.cos(g), l = Math.sin(g), m = Math.cos(h), n = Math.sin(h);
            return i >= Vg ? e ? "M0," + f + "A" + f + "," + f + " 0 1,1 0," + -f + "A" + f + "," + f + " 0 1,1 0," + f + "M0," + e + "A" + e + "," + e + " 0 1,0 0," + -e + "A" + e + "," + e + " 0 1,0 0," + e + "Z" : "M0," + f + "A" + f + "," + f + " 0 1,1 0," + -f + "A" + f + "," + f + " 0 1,1 0," + f + "Z" : e ? "M" + f * k + "," + f * l + "A" + f + "," + f + " 0 " + j + ",1 " + f * m + "," + f * n + "L" + e * m + "," + e * n + "A" + e + "," + e + " 0 " + j + ",0 " + e * k + "," + e * l + "Z" : "M" + f * k + "," + f * l + "A" + f + "," + f + " 0 " + j + ",1 " + f * m + "," + f * n + "L0,0Z"
        }

        var a = Wg, b = Xg, c = Yg, d = Zg;
        return e.innerRadius = function (b) {
            return arguments.length ? (a = nb(b), e) : a
        }, e.outerRadius = function (a) {
            return arguments.length ? (b = nb(a), e) : b
        }, e.startAngle = function (a) {
            return arguments.length ? (c = nb(a), e) : c
        }, e.endAngle = function (a) {
            return arguments.length ? (d = nb(a), e) : d
        }, e.centroid = function () {
            var e = (a.apply(this, arguments) + b.apply(this, arguments)) / 2, f = (c.apply(this, arguments) + d.apply(this, arguments)) / 2 + Ug;
            return [Math.cos(f) * e, Math.sin(f) * e]
        }, e
    };
    var Ug = -qa, Vg = pa - ra;
    a.svg.line = function () {
        return $g(ob)
    };
    var _g = a.map({
        linear: ah,
        "linear-closed": bh,
        step: ch,
        "step-before": dh,
        "step-after": eh,
        basis: kh,
        "basis-open": lh,
        "basis-closed": mh,
        bundle: nh,
        cardinal: hh,
        "cardinal-open": fh,
        "cardinal-closed": gh,
        monotone: wh
    });
    _g.forEach(function (a, b) {
        b.key = a, b.closed = /-closed$/.test(a)
    });
    var ph = [0, 2 / 3, 1 / 3, 0], qh = [0, 1 / 3, 2 / 3, 0], rh = [0, 1 / 6, 2 / 3, 1 / 6];
    a.svg.line.radial = function () {
        var a = $g(xh);
        return a.radius = a.x, delete a.x, a.angle = a.y, delete a.y, a
    }, dh.reverse = eh, eh.reverse = dh, a.svg.area = function () {
        return yh(ob)
    }, a.svg.area.radial = function () {
        var a = yh(xh);
        return a.radius = a.x, delete a.x, a.innerRadius = a.x0, delete a.x0, a.outerRadius = a.x1, delete a.x1, a.angle = a.y, delete a.y, a.startAngle = a.y0, delete a.y0, a.endAngle = a.y1, delete a.y1, a
    }, a.svg.chord = function () {
        function f(c, d) {
            var e = g(this, a, c, d), f = g(this, b, c, d);
            return "M" + e.p0 + i(e.r, e.p1, e.a1 - e.a0) + (h(e, f) ? j(e.r, e.p1, e.r, e.p0) : j(e.r, e.p1, f.r, f.p0) + i(f.r, f.p1, f.a1 - f.a0) + j(f.r, f.p1, e.r, e.p0)) + "Z"
        }

        function g(a, b, f, g) {
            var h = b.call(a, f, g), i = c.call(a, h, g), j = d.call(a, h, g) + Ug, k = e.call(a, h, g) + Ug;
            return {r: i, a0: j, a1: k, p0: [i * Math.cos(j), i * Math.sin(j)], p1: [i * Math.cos(k), i * Math.sin(k)]}
        }

        function h(a, b) {
            return a.a0 == b.a0 && a.a1 == b.a1
        }

        function i(a, b, c) {
            return "A" + a + "," + a + " 0 " + +(c > oa) + ",1 " + b
        }

        function j(a, b, c, d) {
            return "Q 0,0 " + d
        }

        var a = xd, b = yd, c = zh, d = Yg, e = Zg;
        return f.radius = function (a) {
            return arguments.length ? (c = nb(a), f) : c
        }, f.source = function (b) {
            return arguments.length ? (a = nb(b), f) : a
        }, f.target = function (a) {
            return arguments.length ? (b = nb(a), f) : b
        }, f.startAngle = function (a) {
            return arguments.length ? (d = nb(a), f) : d
        }, f.endAngle = function (a) {
            return arguments.length ? (e = nb(a), f) : e
        }, f
    }, a.svg.diagonal = function () {
        function d(d, e) {
            var f = a.call(this, d, e), g = b.call(this, d, e), h = (f.y + g.y) / 2, i = [f, {x: f.x, y: h}, {
                x: g.x,
                y: h
            }, g];
            return i = i.map(c), "M" + i[0] + "C" + i[1] + " " + i[2] + " " + i[3]
        }

        var a = xd, b = yd, c = Ah;
        return d.source = function (b) {
            return arguments.length ? (a = nb(b), d) : a
        }, d.target = function (a) {
            return arguments.length ? (b = nb(a), d) : b
        }, d.projection = function (a) {
            return arguments.length ? (c = a, d) : c
        }, d
    }, a.svg.diagonal.radial = function () {
        var b = a.svg.diagonal(), c = Ah, d = b.projection;
        return b.projection = function (a) {
            return arguments.length ? d(Bh(c = a)) : c
        }, b
    }, a.svg.symbol = function () {
        function c(c, d) {
            return (Fh.get(a.call(this, c, d)) || Eh)(b.call(this, c, d))
        }

        var a = Dh, b = Ch;
        return c.type = function (b) {
            return arguments.length ? (a = nb(b), c) : a
        }, c.size = function (a) {
            return arguments.length ? (b = nb(a), c) : b
        }, c
    };
    var Fh = a.map({
        circle: Eh, cross: function (a) {
            var b = Math.sqrt(a / 5) / 2;
            return "M" + -3 * b + "," + -b + "H" + -b + "V" + -3 * b + "H" + b + "V" + -b + "H" + 3 * b + "V" + b + "H" + b + "V" + 3 * b + "H" + -b + "V" + b + "H" + -3 * b + "Z"
        }, diamond: function (a) {
            var b = Math.sqrt(a / (2 * Hh)), c = b * Hh;
            return "M0," + -b + "L" + c + ",0 0," + b + " " + -c + ",0Z"
        }, square: function (a) {
            var b = Math.sqrt(a) / 2;
            return "M" + -b + "," + -b + "L" + b + "," + -b + " " + b + "," + b + " " + -b + "," + b + "Z"
        }, "triangle-down": function (a) {
            var b = Math.sqrt(a / Gh), c = b * Gh / 2;
            return "M0," + c + "L" + b + "," + -c + " " + -b + "," + -c + "Z"
        }, "triangle-up": function (a) {
            var b = Math.sqrt(a / Gh), c = b * Gh / 2;
            return "M0," + -c + "L" + b + "," + c + " " + -b + "," + c + "Z"
        }
    });
    a.svg.symbolTypes = Fh.keys();
    var Lh, Mh, Gh = Math.sqrt(3), Hh = Math.tan(30 * ta), Jh = [], Kh = 0;
    Jh.call = L.call, Jh.empty = L.empty,
        Jh.node = L.node, Jh.size = L.size, a.transition = function (a) {
        return arguments.length ? Lh ? a.transition() : a : ea.transition()
    }, a.transition.prototype = Jh, Jh.select = function (a) {
        var d, e, f, b = this.id, c = [];
        a = M(a);
        for (var g = -1, h = this.length; ++g < h;) {
            c.push(d = []);
            for (var i = this[g], j = -1, k = i.length; ++j < k;)(f = i[j]) && (e = a.call(f, f.__data__, j, g)) ? ("__data__"in f && (e.__data__ = f.__data__), Ph(e, j, b, f.__transition__[b]), d.push(e)) : d.push(null)
        }
        return Ih(c, b)
    }, Jh.selectAll = function (a) {
        var d, e, f, g, h, b = this.id, c = [];
        a = N(a);
        for (var i = -1, j = this.length; ++i < j;)for (var k = this[i], l = -1, m = k.length; ++l < m;)if (f = k[l]) {
            h = f.__transition__[b], e = a.call(f, f.__data__, l, i), c.push(d = []);
            for (var n = -1, o = e.length; ++n < o;)(g = e[n]) && Ph(g, n, b, h), d.push(g)
        }
        return Ih(c, b)
    }, Jh.filter = function (a) {
        var c, d, e, b = [];
        "function" != typeof a && (a = Z(a));
        for (var f = 0, g = this.length; f < g; f++) {
            b.push(c = []);
            for (var d = this[f], h = 0, i = d.length; h < i; h++)(e = d[h]) && a.call(e, e.__data__, h, f) && c.push(e)
        }
        return Ih(b, this.id)
    }, Jh.tween = function (a, b) {
        var c = this.id;
        return arguments.length < 2 ? this.node().__transition__[c].tween.get(a) : _(this, null == b ? function (b) {
            b.__transition__[c].tween.remove(a)
        } : function (d) {
            d.__transition__[c].tween.set(a, b)
        })
    }, Jh.attr = function (b, c) {
        function f() {
            this.removeAttribute(e)
        }

        function g() {
            this.removeAttributeNS(e.space, e.local)
        }

        function h(a) {
            return null == a ? f : (a += "", function () {
                var c, b = this.getAttribute(e);
                return b !== a && (c = d(b, a), function (a) {
                        this.setAttribute(e, c(a))
                    })
            })
        }

        function i(a) {
            return null == a ? g : (a += "", function () {
                var c, b = this.getAttributeNS(e.space, e.local);
                return b !== a && (c = d(b, a), function (a) {
                        this.setAttributeNS(e.space, e.local, c(a))
                    })
            })
        }

        if (arguments.length < 2) {
            for (c in b)this.attr(c, b[c]);
            return this
        }
        var d = "transform" == b ? mf : Me, e = a.ns.qualify(b);
        return Nh(this, "attr." + b, c, e.local ? i : h)
    }, Jh.attrTween = function (b, c) {
        function e(a, b) {
            var e = c.call(this, a, b, this.getAttribute(d));
            return e && function (a) {
                    this.setAttribute(d, e(a))
                }
        }

        function f(a, b) {
            var e = c.call(this, a, b, this.getAttributeNS(d.space, d.local));
            return e && function (a) {
                    this.setAttributeNS(d.space, d.local, e(a))
                }
        }

        var d = a.ns.qualify(b);
        return this.tween("attr." + b, d.local ? f : e)
    }, Jh.style = function (a, b, c) {
        function e() {
            this.style.removeProperty(a)
        }

        function g(b) {
            return null == b ? e : (b += "", function () {
                var e, d = f.getComputedStyle(this, null).getPropertyValue(a);
                return d !== b && (e = Me(d, b), function (b) {
                        this.style.setProperty(a, e(b), c)
                    })
            })
        }

        var d = arguments.length;
        if (d < 3) {
            if ("string" != typeof a) {
                d < 2 && (b = "");
                for (c in a)this.style(c, a[c], b);
                return this
            }
            c = ""
        }
        return Nh(this, "style." + a, b, g)
    }, Jh.styleTween = function (a, b, c) {
        function d(d, e) {
            var g = b.call(this, d, e, f.getComputedStyle(this, null).getPropertyValue(a));
            return g && function (b) {
                    this.style.setProperty(a, g(b), c)
                }
        }

        return arguments.length < 3 && (c = ""), this.tween("style." + a, d)
    }, Jh.text = function (a) {
        return Nh(this, "text", a, Oh)
    }, Jh.remove = function () {
        return this.each("end.transition", function () {
            var a;
            this.__transition__.count < 2 && (a = this.parentNode) && a.removeChild(this)
        })
    }, Jh.ease = function (b) {
        var c = this.id;
        return arguments.length < 1 ? this.node().__transition__[c].ease : ("function" != typeof b && (b = a.ease.apply(a, arguments)), _(this, function (a) {
            a.__transition__[c].ease = b
        }))
    }, Jh.delay = function (a) {
        var b = this.id;
        return _(this, "function" == typeof a ? function (c, d, e) {
            c.__transition__[b].delay = +a.call(c, c.__data__, d, e)
        } : (a = +a, function (c) {
            c.__transition__[b].delay = a
        }))
    }, Jh.duration = function (a) {
        var b = this.id;
        return _(this, "function" == typeof a ? function (c, d, e) {
            c.__transition__[b].duration = Math.max(1, a.call(c, c.__data__, d, e))
        } : (a = Math.max(1, a), function (c) {
            c.__transition__[b].duration = a
        }))
    }, Jh.each = function (b, c) {
        var d = this.id;
        if (arguments.length < 2) {
            var e = Mh, f = Lh;
            Lh = d, _(this, function (a, c, e) {
                Mh = a.__transition__[d], b.call(a, a.__data__, c, e)
            }), Mh = e, Lh = f
        } else _(this, function (e) {
            var f = e.__transition__[d];
            (f.event || (f.event = a.dispatch("start", "end"))).on(b, c)
        });
        return this
    }, Jh.transition = function () {
        for (var d, e, f, g, a = this.id, b = ++Kh, c = [], h = 0, i = this.length; h < i; h++) {
            c.push(d = []);
            for (var e = this[h], j = 0, k = e.length; j < k; j++)(f = e[j]) && (g = Object.create(f.__transition__[a]), g.delay += g.duration, Ph(f, j, b, g)), d.push(f)
        }
        return Ih(c, b)
    }, a.svg.axis = function () {
        function j(j) {
            j.each(function () {
                var s, j = a.select(this), k = this.__chart__ || b, l = this.__chart__ = b.copy(), m = null == h ? l.ticks ? l.ticks.apply(l, g) : l.domain() : h, n = null == i ? l.tickFormat ? l.tickFormat.apply(l, g) : ob : i, o = j.selectAll(".tick").data(m, l), p = o.enter().insert("g", ".domain").attr("class", "tick").style("opacity", ra), q = a.transition(o.exit()).style("opacity", ra).remove(), r = a.transition(o).style("opacity", 1), t = rg(l), u = j.selectAll(".domain").data([0]), v = (u.enter().append("path").attr("class", "domain"), a.transition(u));
                p.append("line"), p.append("text");
                var w = p.select("line"), x = r.select("line"), y = o.select("text").text(n), z = p.select("text"), A = r.select("text");
                switch (c) {
                    case"bottom":
                        s = Sh, w.attr("y2", d), z.attr("y", Math.max(d, 0) + f), x.attr("x2", 0).attr("y2", d), A.attr("x", 0).attr("y", Math.max(d, 0) + f), y.attr("dy", ".71em").style("text-anchor", "middle"), v.attr("d", "M" + t[0] + "," + e + "V0H" + t[1] + "V" + e);
                        break;
                    case"top":
                        s = Sh, w.attr("y2", -d), z.attr("y", -(Math.max(d, 0) + f)), x.attr("x2", 0).attr("y2", -d), A.attr("x", 0).attr("y", -(Math.max(d, 0) + f)), y.attr("dy", "0em").style("text-anchor", "middle"), v.attr("d", "M" + t[0] + "," + -e + "V0H" + t[1] + "V" + -e);
                        break;
                    case"left":
                        s = Th, w.attr("x2", -d), z.attr("x", -(Math.max(d, 0) + f)), x.attr("x2", -d).attr("y2", 0), A.attr("x", -(Math.max(d, 0) + f)).attr("y", 0), y.attr("dy", ".32em").style("text-anchor", "end"), v.attr("d", "M" + -e + "," + t[0] + "H0V" + t[1] + "H" + -e);
                        break;
                    case"right":
                        s = Th, w.attr("x2", d), z.attr("x", Math.max(d, 0) + f), x.attr("x2", d).attr("y2", 0), A.attr("x", Math.max(d, 0) + f).attr("y", 0), y.attr("dy", ".32em").style("text-anchor", "start"), v.attr("d", "M" + e + "," + t[0] + "H0V" + t[1] + "H" + e)
                }
                if (l.rangeBand) {
                    var B = l, C = B.rangeBand() / 2;
                    k = l = function (a) {
                        return B(a) + C
                    }
                } else k.rangeBand ? k = l : q.call(s, l);
                p.call(s, k), r.call(s, l)
            })
        }

        var i, b = a.scale.linear(), c = Qh, d = 6, e = 6, f = 3, g = [10], h = null;
        return j.scale = function (a) {
            return arguments.length ? (b = a, j) : b
        }, j.orient = function (a) {
            return arguments.length ? (c = a in Rh ? a + "" : Qh, j) : c
        }, j.ticks = function () {
            return arguments.length ? (g = arguments, j) : g
        }, j.tickValues = function (a) {
            return arguments.length ? (h = a, j) : h
        }, j.tickFormat = function (a) {
            return arguments.length ? (i = a, j) : i
        }, j.tickSize = function (a) {
            var b = arguments.length;
            return b ? (d = +a, e = +arguments[b - 1], j) : d
        }, j.innerTickSize = function (a) {
            return arguments.length ? (d = +a, j) : d
        }, j.outerTickSize = function (a) {
            return arguments.length ? (e = +a, j) : e
        }, j.tickPadding = function (a) {
            return arguments.length ? (f = +a, j) : f
        }, j.tickSubdivide = function () {
            return arguments.length && j
        }, j
    };
    var Qh = "bottom", Rh = {top: 1, right: 1, bottom: 1, left: 1};
    a.svg.brush = function () {
        function m(b) {
            b.each(function () {
                var b = a.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", q).on("touchstart.brush", q), e = b.selectAll(".background").data([0]);
                e.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), b.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                var f = b.selectAll(".resize").data(l, ob);
                f.exit().remove(), f.enter().append("g").attr("class", function (a) {
                    return "resize " + a
                }).style("cursor", function (a) {
                    return Uh[a]
                }).append("rect").attr("x", function (a) {
                    return /[ew]$/.test(a) ? -3 : null
                }).attr("y", function (a) {
                    return /^[ns]/.test(a) ? -3 : null
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), f.style("display", m.empty() ? "none" : null);
                var i, g = a.transition(b), h = a.transition(e);
                c && (i = rg(c), h.attr("x", i[0]).attr("width", i[1] - i[0]), o(g)), d && (i = rg(d), h.attr("y", i[0]).attr("height", i[1] - i[0]), p(g)), n(g)
            })
        }

        function n(a) {
            a.selectAll(".resize").attr("transform", function (a) {
                return "translate(" + e[+/e$/.test(a)] + "," + g[+/^s/.test(a)] + ")"
            })
        }

        function o(a) {
            a.select(".extent").attr("x", e[0]), a.selectAll(".extent,.n>rect,.s>rect").attr("width", e[1] - e[0])
        }

        function p(a) {
            a.select(".extent").attr("y", g[0]), a.selectAll(".extent,.e>rect,.w>rect").attr("height", g[1] - g[0])
        }

        function q() {
            function F() {
                32 == a.event.keyCode && (w || (y = null, z[0] -= e[1], z[1] -= g[1], w = 2), B())
            }

            function G() {
                32 == a.event.keyCode && 2 == w && (z[0] += e[1], z[1] += g[1], w = 0, B())
            }

            function H() {
                var b = a.mouse(l), f = !1;
                A && (b[0] += A[0], b[1] += A[1]), w || (a.event.altKey ? (y || (y = [(e[0] + e[1]) / 2, (g[0] + g[1]) / 2]), z[0] = e[+(b[0] < y[0])], z[1] = g[+(b[1] < y[1])]) : y = null), u && I(b, c, 0) && (o(s), f = !0), v && I(b, d, 1) && (p(s), f = !0), f && (n(s), r({
                    type: "brush",
                    mode: w ? "move" : "resize"
                }))
            }

            function I(a, b, c) {
                var p, q, d = rg(b), f = d[0], l = d[1], m = z[c], n = c ? g : e, o = n[1] - n[0];
                if (w && (f -= m, l -= o + m), p = (c ? k : j) ? Math.max(f, Math.min(l, a[c])) : a[c], w ? q = (p += m) + o : (y && (m = Math.max(f, Math.min(l, 2 * y[c] - p))), m < p ? (q = p, p = m) : q = m), n[0] != p || n[1] != q)return c ? i = null : h = null, n[0] = p, n[1] = q, !0
            }

            function J() {
                H(), s.style("pointer-events", "all").selectAll(".resize").style("display", m.empty() ? "none" : null), a.select("body").style("cursor", null), C.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), x(), r({type: "brushend"})
            }

            var y, A, l = this, q = a.select(a.event.target), r = b.of(l, arguments), s = a.select(l), t = q.datum(), u = !/^(n|s)$/.test(t) && c, v = !/^(e|w)$/.test(t) && d, w = q.classed("extent"), x = la(), z = a.mouse(l), C = a.select(f).on("keydown.brush", F).on("keyup.brush", G);
            if (a.event.changedTouches ? C.on("touchmove.brush", H).on("touchend.brush", J) : C.on("mousemove.brush", H).on("mouseup.brush", J), s.interrupt().selectAll("*").interrupt(), w)z[0] = e[0] - z[0], z[1] = g[0] - z[1]; else if (t) {
                var D = +/w$/.test(t), E = +/^n/.test(t);
                A = [e[1 - D] - z[0], g[1 - E] - z[1]], z[0] = e[D], z[1] = g[E]
            } else a.event.altKey && (y = z.slice());
            s.style("pointer-events", "none").selectAll(".resize").style("display", null), a.select("body").style("cursor", q.style("cursor")), r({type: "brushstart"}), H()
        }

        var h, i, b = D(m, "brushstart", "brush", "brushend"), c = null, d = null, e = [0, 0], g = [0, 0], j = !0, k = !0, l = Vh[0];
        return m.event = function (c) {
            c.each(function () {
                var c = b.of(this, arguments), d = {x: e, y: g, i: h, j: i}, f = this.__chart__ || d;
                this.__chart__ = d, Lh ? a.select(this).transition().each("start.brush", function () {
                    h = f.i, i = f.j, e = f.x, g = f.y, c({type: "brushstart"})
                }).tween("brush:brush", function () {
                    var a = Ne(e, d.x), b = Ne(g, d.y);
                    return h = i = null, function (f) {
                        e = d.x = a(f), g = d.y = b(f), c({type: "brush", mode: "resize"})
                    }
                }).each("end.brush", function () {
                    h = d.i, i = d.j, c({type: "brush", mode: "resize"}), c({type: "brushend"})
                }) : (c({type: "brushstart"}), c({type: "brush", mode: "resize"}), c({type: "brushend"}))
            })
        }, m.x = function (a) {
            return arguments.length ? (c = a, l = Vh[!c << 1 | !d], m) : c
        }, m.y = function (a) {
            return arguments.length ? (d = a, l = Vh[!c << 1 | !d], m) : d
        }, m.clamp = function (a) {
            return arguments.length ? (c && d ? (j = !!a[0], k = !!a[1]) : c ? j = !!a : d && (k = !!a), m) : c && d ? [j, k] : c ? j : d ? k : null
        }, m.extent = function (a) {
            var b, f, j, k, l;
            return arguments.length ? (c && (b = a[0], f = a[1], d && (b = b[0], f = f[0]), h = [b, f], c.invert && (b = c(b), f = c(f)), f < b && (l = b, b = f, f = l), b == e[0] && f == e[1] || (e = [b, f])), d && (j = a[0], k = a[1], c && (j = j[1], k = k[1]), i = [j, k], d.invert && (j = d(j), k = d(k)), k < j && (l = j, j = k, k = l), j == g[0] && k == g[1] || (g = [j, k])), m) : (c && (h ? (b = h[0], f = h[1]) : (b = e[0], f = e[1], c.invert && (b = c.invert(b), f = c.invert(f)), f < b && (l = b, b = f, f = l))), d && (i ? (j = i[0], k = i[1]) : (j = g[0], k = g[1], d.invert && (j = d.invert(j), k = d.invert(k)), k < j && (l = j, j = k, k = l))), c && d ? [[b, j], [f, k]] : c ? [b, f] : d && [j, k])
        }, m.clear = function () {
            return m.empty() || (e = [0, 0], g = [0, 0], h = i = null), m
        }, m.empty = function () {
            return !!c && e[0] == e[1] || !!d && g[0] == g[1]
        }, a.rebind(m, b, "on")
    };
    var Uh = {
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
    }, Vh = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []], Wh = a.time = {}, Xh = Date, Yh = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    Zh.prototype = {
        getDate: function () {
            return this._.getUTCDate()
        }, getDay: function () {
            return this._.getUTCDay()
        }, getFullYear: function () {
            return this._.getUTCFullYear()
        }, getHours: function () {
            return this._.getUTCHours()
        }, getMilliseconds: function () {
            return this._.getUTCMilliseconds()
        }, getMinutes: function () {
            return this._.getUTCMinutes()
        }, getMonth: function () {
            return this._.getUTCMonth()
        }, getSeconds: function () {
            return this._.getUTCSeconds()
        }, getTime: function () {
            return this._.getTime()
        }, getTimezoneOffset: function () {
            return 0
        }, valueOf: function () {
            return this._.valueOf()
        }, setDate: function () {
            $h.setUTCDate.apply(this._, arguments)
        }, setDay: function () {
            $h.setUTCDay.apply(this._, arguments)
        }, setFullYear: function () {
            $h.setUTCFullYear.apply(this._, arguments)
        }, setHours: function () {
            $h.setUTCHours.apply(this._, arguments)
        }, setMilliseconds: function () {
            $h.setUTCMilliseconds.apply(this._, arguments)
        }, setMinutes: function () {
            $h.setUTCMinutes.apply(this._, arguments)
        }, setMonth: function () {
            $h.setUTCMonth.apply(this._, arguments)
        }, setSeconds: function () {
            $h.setUTCSeconds.apply(this._, arguments)
        }, setTime: function () {
            $h.setTime.apply(this._, arguments)
        }
    };
    var $h = Date.prototype, _h = "%a %b %e %X %Y", ai = "%m/%d/%Y", bi = "%H:%M:%S", ci = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], di = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ei = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], fi = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    Wh.year = gi(function (a) {
        return a = Wh.day(a), a.setMonth(0, 1), a
    }, function (a, b) {
        a.setFullYear(a.getFullYear() + b)
    }, function (a) {
        return a.getFullYear()
    }), Wh.years = Wh.year.range, Wh.years.utc = Wh.year.utc.range, Wh.day = gi(function (a) {
        var b = new Xh(2e3, 0);
        return b.setFullYear(a.getFullYear(), a.getMonth(), a.getDate()), b
    }, function (a, b) {
        a.setDate(a.getDate() + b)
    }, function (a) {
        return a.getDate() - 1
    }), Wh.days = Wh.day.range, Wh.days.utc = Wh.day.utc.range, Wh.dayOfYear = function (a) {
        var b = Wh.year(a);
        return Math.floor((a - b - 6e4 * (a.getTimezoneOffset() - b.getTimezoneOffset())) / 864e5)
    }, Yh.forEach(function (a, b) {
        a = a.toLowerCase(), b = 7 - b;
        var c = Wh[a] = gi(function (a) {
            return (a = Wh.day(a)).setDate(a.getDate() - (a.getDay() + b) % 7), a
        }, function (a, b) {
            a.setDate(a.getDate() + 7 * Math.floor(b))
        }, function (a) {
            var c = Wh.year(a).getDay();
            return Math.floor((Wh.dayOfYear(a) + (c + b) % 7) / 7) - (c !== b)
        });
        Wh[a + "s"] = c.range, Wh[a + "s"].utc = c.utc.range, Wh[a + "OfYear"] = function (a) {
            var c = Wh.year(a).getDay();
            return Math.floor((Wh.dayOfYear(a) + (c + b) % 7) / 7)
        }
    }), Wh.week = Wh.sunday, Wh.weeks = Wh.sunday.range, Wh.weeks.utc = Wh.sunday.utc.range, Wh.weekOfYear = Wh.sundayOfYear, Wh.format = ii;
    var ni = ki(ci), oi = li(ci), pi = ki(di), qi = li(di), ri = ki(ei), si = li(ei), ti = ki(fi), ui = li(fi), vi = /^%/, wi = {
        "-": "",
        _: " ",
        0: "0"
    }, xi = {
        a: function (a) {
            return di[a.getDay()]
        }, A: function (a) {
            return ci[a.getDay()]
        }, b: function (a) {
            return fi[a.getMonth()]
        }, B: function (a) {
            return ei[a.getMonth()]
        }, c: ii(_h), d: function (a, b) {
            return mi(a.getDate(), b, 2)
        }, e: function (a, b) {
            return mi(a.getDate(), b, 2)
        }, H: function (a, b) {
            return mi(a.getHours(), b, 2)
        }, I: function (a, b) {
            return mi(a.getHours() % 12 || 12, b, 2)
        }, j: function (a, b) {
            return mi(1 + Wh.dayOfYear(a), b, 3)
        }, L: function (a, b) {
            return mi(a.getMilliseconds(), b, 3)
        }, m: function (a, b) {
            return mi(a.getMonth() + 1, b, 2)
        }, M: function (a, b) {
            return mi(a.getMinutes(), b, 2)
        }, p: function (a) {
            return a.getHours() >= 12 ? "PM" : "AM"
        }, S: function (a, b) {
            return mi(a.getSeconds(), b, 2)
        }, U: function (a, b) {
            return mi(Wh.sundayOfYear(a), b, 2)
        }, w: function (a) {
            return a.getDay()
        }, W: function (a, b) {
            return mi(Wh.mondayOfYear(a), b, 2)
        }, x: ii(ai), X: ii(bi), y: function (a, b) {
            return mi(a.getFullYear() % 100, b, 2)
        }, Y: function (a, b) {
            return mi(a.getFullYear() % 1e4, b, 4)
        }, Z: Xi, "%": function () {
            return "%"
        }
    }, yi = {
        a: zi,
        A: Ai,
        b: Ei,
        B: Fi,
        c: Gi,
        d: Oi,
        e: Oi,
        H: Qi,
        I: Qi,
        j: Pi,
        L: Ti,
        m: Ni,
        M: Ri,
        p: Vi,
        S: Si,
        U: Ci,
        w: Bi,
        W: Di,
        x: Hi,
        X: Ii,
        y: Ki,
        Y: Ji,
        Z: Li,
        "%": Yi
    }, Ui = /^\s*\d+/, Wi = a.map({am: 0, pm: 1});
    ii.utc = Zi;
    var $i = Zi("%Y-%m-%dT%H:%M:%S.%LZ");
    ii.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? _i : $i, _i.parse = function (a) {
        var b = new Date(a);
        return isNaN(b) ? null : b
    }, _i.toString = $i.toString, Wh.second = gi(function (a) {
        return new Xh(1e3 * Math.floor(a / 1e3))
    }, function (a, b) {
        a.setTime(a.getTime() + 1e3 * Math.floor(b))
    }, function (a) {
        return a.getSeconds()
    }), Wh.seconds = Wh.second.range, Wh.seconds.utc = Wh.second.utc.range, Wh.minute = gi(function (a) {
        return new Xh(6e4 * Math.floor(a / 6e4))
    }, function (a, b) {
        a.setTime(a.getTime() + 6e4 * Math.floor(b))
    }, function (a) {
        return a.getMinutes()
    }), Wh.minutes = Wh.minute.range, Wh.minutes.utc = Wh.minute.utc.range, Wh.hour = gi(function (a) {
        var b = a.getTimezoneOffset() / 60;
        return new Xh(36e5 * (Math.floor(a / 36e5 - b) + b))
    }, function (a, b) {
        a.setTime(a.getTime() + 36e5 * Math.floor(b))
    }, function (a) {
        return a.getHours()
    }), Wh.hours = Wh.hour.range, Wh.hours.utc = Wh.hour.utc.range, Wh.month = gi(function (a) {
        return a = Wh.day(a), a.setDate(1), a
    }, function (a, b) {
        a.setMonth(a.getMonth() + b)
    }, function (a) {
        return a.getMonth()
    }), Wh.months = Wh.month.range, Wh.months.utc = Wh.month.utc.range;
    var dj = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6], ej = [[Wh.second, 1], [Wh.second, 5], [Wh.second, 15], [Wh.second, 30], [Wh.minute, 1], [Wh.minute, 5], [Wh.minute, 15], [Wh.minute, 30], [Wh.hour, 1], [Wh.hour, 3], [Wh.hour, 6], [Wh.hour, 12], [Wh.day, 1], [Wh.day, 2], [Wh.week, 1], [Wh.month, 1], [Wh.month, 3], [Wh.year, 1]], fj = [[ii("%Y"), wc], [ii("%B"), function (a) {
        return a.getMonth()
    }], [ii("%b %d"), function (a) {
        return 1 != a.getDate()
    }], [ii("%a %d"), function (a) {
        return a.getDay() && 1 != a.getDate()
    }], [ii("%I %p"), function (a) {
        return a.getHours()
    }], [ii("%I:%M"), function (a) {
        return a.getMinutes()
    }], [ii(":%S"), function (a) {
        return a.getSeconds()
    }], [ii(".%L"), function (a) {
        return a.getMilliseconds()
    }]], gj = cj(fj);
    ej.year = Wh.year, Wh.scale = function () {
        return aj(a.scale.linear(), ej, gj)
    };
    var hj = {
        range: function (b, c, d) {
            return a.range(+b, +c, d).map(bj)
        }, floor: ob, ceil: ob
    }, ij = ej.map(function (a) {
        return [a[0].utc, a[1]]
    }), jj = [[Zi("%Y"), wc], [Zi("%B"), function (a) {
        return a.getUTCMonth()
    }], [Zi("%b %d"), function (a) {
        return 1 != a.getUTCDate()
    }], [Zi("%a %d"), function (a) {
        return a.getUTCDay() && 1 != a.getUTCDate()
    }], [Zi("%I %p"), function (a) {
        return a.getUTCHours()
    }], [Zi("%I:%M"), function (a) {
        return a.getUTCMinutes()
    }], [Zi(":%S"), function (a) {
        return a.getUTCSeconds()
    }], [Zi(".%L"), function (a) {
        return a.getUTCMilliseconds()
    }]], kj = cj(jj);
    return ij.year = Wh.year.utc, Wh.scale.utc = function () {
        return aj(a.scale.linear(), ij, kj)
    }, a.text = pb(function (a) {
        return a.responseText
    }), a.json = function (a, b) {
        return qb(a, "application/json", lj, b)
    }, a.html = function (a, b) {
        return qb(a, "text/html", mj, b)
    }, a.xml = pb(function (a) {
        return a.responseXML
    }), a
}();
