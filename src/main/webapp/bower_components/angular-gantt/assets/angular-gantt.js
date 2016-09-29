!function () {
    "use strict";
    angular.module("gantt", ["gantt.templates", "angularMoment"]).directive("gantt", ["Gantt", "ganttEnableNgAnimate", "$timeout", "$templateCache", function (t, e, i, n) {
        return {
            restrict: "A",
            transclude: !0,
            templateUrl: function (t, e) {
                var i;
                return i = void 0 === e.templateUrl ? "template/gantt.tmpl.html" : e.templateUrl, void 0 !== e.template && n.put(i, e.template), i
            },
            scope: {
                sortMode: "=?",
                filterTask: "=?",
                filterTaskComparator: "=?",
                filterRow: "=?",
                filterRowComparator: "=?",
                viewScale: "=?",
                columnWidth: "=?",
                expandToFit: "=?",
                shrinkToFit: "=?",
                showSide: "=?",
                allowSideResizing: "=?",
                fromDate: "=?",
                toDate: "=?",
                currentDateValue: "=?",
                currentDate: "=?",
                daily: "=?",
                autoExpand: "=?",
                taskOutOfRange: "=?",
                taskContent: "=?",
                rowContent: "=?",
                maxHeight: "=?",
                sideWidth: "=?",
                headers: "=?",
                headersFormats: "=?",
                timeFrames: "=?",
                dateFrames: "=?",
                timeFramesWorkingMode: "=?",
                timeFramesNonWorkingMode: "=?",
                timespans: "=?",
                columnMagnet: "=?",
                shiftColumnMagnet: "=?",
                timeFramesMagnet: "=?",
                data: "=?",
                api: "=?",
                options: "=?"
            },
            controller: ["$scope", "$element", function (i, n) {
                for (var s in i.options)i[s] = i.options[s];
                e(n, !1), i.gantt = new t(i, n), this.gantt = i.gantt
            }],
            link: function (t, e) {
                t.gantt.api.directives.raise["new"]("gantt", t, e), t.$on("$destroy", function () {
                    t.gantt.api.directives.raise.destroy("gantt", t, e)
                }), i(function () {
                    t.gantt.initialized()
                })
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttApi", ["$q", "$rootScope", "ganttUtils", function (t, e, i) {
        function n(t, i, n, s) {
            return e.$on(t, function () {
                var t = Array.prototype.slice.call(arguments);
                t.splice(0, 1), i.apply(s ? s : n.api, t)
            })
        }

        var s = function (t) {
            this.gantt = t, this.listeners = [], this.apiId = i.newId()
        };
        return s.prototype.suppressEvents = function (t, e) {
            var i = this, s = angular.isArray(t) ? t : [t], a = [];
            s.forEach(function (t) {
                a = i.listeners.filter(function (e) {
                    return t === e.handler
                })
            }), a.forEach(function (t) {
                t.dereg()
            }), e(), a.forEach(function (t) {
                t.dereg = n(t.eventId, t.handler, i.gantt, t._this)
            })
        }, s.prototype.registerEvent = function (t, i) {
            var s = this;
            s[t] || (s[t] = {});
            var a = s[t];
            a.on || (a.on = {}, a.raise = {});
            var r = "event:gantt:" + this.apiId + ":" + t + ":" + i;
            a.raise[i] = function () {
                e.$emit.apply(e, [r].concat(Array.prototype.slice.call(arguments)))
            }, a.on[i] = function (t, e, i) {
                var a = n(r, e, s.gantt, i), o = {handler: e, dereg: a, eventId: r, scope: t, _this: i};
                s.listeners.push(o);
                var l = function () {
                    o.dereg();
                    var t = s.listeners.indexOf(o);
                    s.listeners.splice(t, 1)
                };
                return t.$on("$destroy", function () {
                    l()
                }), l
            }
        }, s.prototype.registerEventsFromObject = function (t) {
            var e = this, i = [];
            angular.forEach(t, function (t, e) {
                var n = {name: e, events: []};
                angular.forEach(t, function (t, e) {
                    n.events.push(e)
                }), i.push(n)
            }), i.forEach(function (t) {
                t.events.forEach(function (i) {
                    e.registerEvent(t.name, i)
                })
            })
        }, s.prototype.registerMethod = function (t, e, n, s) {
            this[t] || (this[t] = {});
            var a = this[t];
            a[e] = i.createBoundedWrapper(s || this.gantt, n)
        }, s.prototype.registerMethodsFromObject = function (t, e) {
            var i = this, n = [];
            angular.forEach(t, function (t, e) {
                var i = {name: e, methods: []};
                angular.forEach(t, function (t, e) {
                    i.methods.push({name: e, fn: t})
                }), n.push(i)
            }), n.forEach(function (t) {
                t.methods.forEach(function (n) {
                    i.registerMethod(t.name, n.name, n.fn, e)
                })
            })
        }, s
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttOptions", [function () {
        var t = function (t, e) {
            this.defaultValues = e, this.values = t, this.defaultValue = function (t) {
                var e = this.defaultValues[t];
                return angular.isFunction(e) && (e = e()), e
            }, this.sanitize = function (t, e) {
                if (!e) {
                    var i = this.defaultValue(t);
                    if (void 0 !== i)return void 0 !== e && "boolean" == typeof i ? e : i
                }
                return e
            }, this.value = function (t) {
                return this.sanitize(t, this.values[t])
            }, this.set = function (t, e) {
                this.values[t] = e
            }, this.initialize = function () {
                for (var t in this.values) {
                    var e = this.values[t];
                    this.values.hasOwnProperty(t) && (this.values[t] = this.value(t, e))
                }
                return this.values
            }
        };
        return t
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttCalendar", ["$filter", "moment", function (t, e) {
        var i = function (t) {
            void 0 === t && (t = {}), this.start = t.start, this.end = t.end, this.working = t.working, this.magnet = void 0 !== t.magnet ? t.magnet : !0, this["default"] = t["default"], this.color = t.color, this.classes = t.classes, this.internal = t.internal
        };
        i.prototype.updateView = function () {
            if (this.$element) {
                var t = {};
                void 0 !== this.left ? t.left = this.left + "px" : t.left = "", void 0 !== this.width ? t.width = this.width + "px" : t.width = "", void 0 !== this.color ? t["background-color"] = this.color : t["background-color"] = "", this.$element.css(t);
                var e = ["gantt-timeframe" + (this.working ? "" : "-non") + "-working"];
                this.classes && (e = e.concat(this.classes));
                for (var i = 0, n = e.length; n > i; i++)this.$element.toggleClass(e[i], !0)
            }
        }, i.prototype.getDuration = function () {
            return void 0 !== this.end && void 0 !== this.start ? this.end.diff(this.start, "milliseconds") : void 0
        }, i.prototype.clone = function () {
            return new i(this)
        };
        var n = function (t) {
            this.func = t
        };
        n.prototype.getTimeFrames = function (t) {
            var e = this.func(t);
            return e instanceof Array || (e = [e]), e
        }, n.prototype.clone = function () {
            return new n(this.func)
        };
        var s = function (t) {
            this.evaluator = t.evaluator, t.date ? (this.start = e(t.date).startOf("day"), this.end = e(t.date).endOf("day")) : (this.start = t.start, this.end = t.end), t.targets instanceof Array ? this.targets = t.targets : this.targets = [t.targets], this["default"] = t["default"]
        };
        s.prototype.dateMatch = function (t) {
            return this.evaluator ? this.evaluator(t) : this.start && this.end ? t >= this.start && t <= this.end : !1
        }, s.prototype.clone = function () {
            return new s(this)
        };
        var a = function () {
            this.timeFrames = {}, this.timeFrameMappings = {}, this.dateFrames = {}
        };
        a.prototype.clear = function () {
            this.timeFrames = {}, this.timeFrameMappings = {}, this.dateFrames = {}
        }, a.prototype.registerTimeFrames = function (t) {
            angular.forEach(t, function (t, e) {
                this.timeFrames[e] = new i(t)
            }, this)
        }, a.prototype.removeTimeFrames = function (t) {
            angular.forEach(t, function (t) {
                delete this.timeFrames[t]
            }, this)
        }, a.prototype.clearTimeFrames = function () {
            this.timeFrames = {}
        }, a.prototype.registerTimeFrameMappings = function (t) {
            angular.forEach(t, function (t, e) {
                this.timeFrameMappings[e] = new n(t)
            }, this)
        }, a.prototype.removeTimeFrameMappings = function (t) {
            angular.forEach(t, function (t) {
                delete this.timeFrameMappings[t]
            }, this)
        }, a.prototype.clearTimeFrameMappings = function () {
            this.timeFrameMappings = {}
        }, a.prototype.registerDateFrames = function (t) {
            angular.forEach(t, function (t, e) {
                this.dateFrames[e] = new s(t)
            }, this)
        }, a.prototype.removeDateFrames = function (t) {
            angular.forEach(t, function (t) {
                delete this.dateFrames[t]
            }, this)
        }, a.prototype.clearDateFrames = function () {
            this.dateFrames = {}
        };
        var r = function (t, e) {
            var i = [];
            return angular.forEach(t, function (t) {
                t.dateMatch(e) && i.push(t)
            }), 0 === i.length && angular.forEach(t, function (t) {
                t["default"] && i.push(t)
            }), i
        };
        return a.prototype.getTimeFrames = function (t) {
            for (var i = [], n = r(this.dateFrames, t), s = 0; s < n.length; s++)if (void 0 !== n[s])for (var a = n[s].targets, o = 0; o < a.length; o++) {
                var l = this.timeFrameMappings[a[o]];
                if (void 0 !== l)i.push(l.getTimeFrames()); else {
                    var d = this.timeFrames[a[o]];
                    void 0 !== d && i.push(d)
                }
            }
            var h = t.year(), u = t.month(), c = t.date(), g = [];
            for (0 === i.length && angular.forEach(this.timeFrames, function (t) {
                t["default"] && i.push(t)
            }), s = 0; s < i.length; s++) {
                var m = i[s].clone();
                void 0 !== m.start && (m.start.year(h), m.start.month(u), m.start.date(c)), void 0 !== m.end && (m.end.year(h), m.end.month(u), m.end.date(c), e(m.end).startOf("day") === m.end && m.end.add(1, "day")), g.push(m)
            }
            return g
        }, a.prototype.solve = function (n, s, a) {
            for (var r, o, l, d, h = 0; h < n.length; h++) {
                var u = n[h];
                (void 0 === l || l > u.start) && (l = u.start), (void 0 === d || d < u.end) && (d = u.end), void 0 === r && u.color && (r = u.color), void 0 !== u.classes && (void 0 === o && (o = []), o = o.concat(u.classes))
            }
            void 0 === s && (s = l), void 0 === a && (a = d);
            var c = [new i({start: s, end: a, internal: !0})];
            for (n = t("filter")(n, function (t) {
                return (void 0 === t.start || t.start < a) && (void 0 === t.end || t.end > s)
            }), h = 0; h < n.length; h++) {
                var g = n[h];
                g.start || (g.start = s), g.end || (g.end = a)
            }
            var m, p = t("orderBy")(n, function (t) {
                return -t.getDuration()
            });
            for (h = 0; h < p.length; h++) {
                var f = p[h], v = c.slice();
                m = 0;
                for (var w = !1, y = !1, k = 0; k < c.length; k++) {
                    var b = c[k];
                    if (!y) {
                        if (f.end || f.start)if (f.end > b.start && f.start < b.end) {
                            var M = b.clone();
                            b.end = e(f.start), M.start = e(f.end), v.splice(m + 1, 0, f.clone(), M), y = !0, w = !1
                        } else!w && f.start < b.end ? (b.end = e(f.start), v.splice(m + 1, 0, f.clone()), w = !0) : w && f.end > b.start && (b.start = e(f.end), w = !1, y = !0); else v.splice(m, 0, f), y = !0, w = !1;
                        m++
                    }
                }
                c = v
            }
            return c = t("filter")(c, function (t) {
                return !t.internal && (void 0 === t.start || t.start < a) && (void 0 === t.end || t.end > s)
            })
        }, a
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttCurrentDateManager", ["moment", function (t) {
        var e = function (e) {
            var i = this;
            this.gantt = e, this.date = void 0, this.position = void 0, this.currentDateColumn = void 0, this.gantt.$scope.simplifyMoment = function (e) {
                return t.isMoment(e) ? e.unix() : e
            }, this.gantt.$scope.$watchGroup(["currentDate", "simplifyMoment(currentDateValue)"], function (t, e) {
                t !== e && i.setCurrentDate(i.gantt.options.value("currentDateValue"))
            })
        };
        return e.prototype.setCurrentDate = function (t) {
            this.date = t;
            var e, i = this.currentDateColumn;
            void 0 !== this.date && "column" === this.gantt.options.value("currentDate") && (e = this.gantt.columnsManager.getColumnByDate(this.date, !0)), this.currentDateColumn = e, i !== e && (void 0 !== i && (i.currentDate = !1, i.updateView()), void 0 !== e && (e.currentDate = !0, e.updateView())), this.position = this.gantt.getPositionByDate(this.date, !0)
        }, e
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttColumn", ["moment", function (t) {
        var e = function (t, e, i, n, s, a, r) {
            this.date = t, this.endDate = e, this.left = i, this.width = n, this.calendar = s, this.duration = this.endDate.diff(this.date, "milliseconds"), this.timeFramesWorkingMode = a, this.timeFramesNonWorkingMode = r, this.timeFrames = [], this.currentDate = !1, this.visibleTimeFrames = [], this.daysTimeFrames = {}, this.cropped = !1, this.originalSize = {
                left: this.left,
                width: this.width
            }, this.updateTimeFrames()
        }, i = function (t) {
            return t.year() + "-" + t.month() + "-" + t.date()
        };
        return e.prototype.updateView = function () {
            if (this.$element) {
                this.currentDate ? this.$element.addClass("gantt-foreground-col-current-date") : this.$element.removeClass("gantt-foreground-col-current-date"), this.$element.css({
                    left: this.left + "px",
                    width: this.width + "px"
                });
                for (var t = 0, e = this.timeFrames.length; e > t; t++)this.timeFrames[t].updateView()
            }
        }, e.prototype.updateTimeFrames = function () {
            var e = this;
            if (void 0 !== e.calendar && ("hidden" !== e.timeFramesNonWorkingMode || "hidden" !== e.timeFramesWorkingMode)) {
                for (var n, s = e.date, a = t(s).startOf("day"), r = a.add(1, "day"); s < e.endDate;) {
                    var o = e.calendar.getTimeFrames(s), l = t.min(r, e.endDate);
                    o = e.calendar.solve(o, s, l);
                    var d = [];
                    for (n = 0; n < o.length; n++) {
                        var h = o[n], u = h.start;
                        void 0 === u && (u = s);
                        var c = h.end;
                        void 0 === c && (c = l), u < e.date && (u = e.date), c > e.endDate && (c = e.endDate), h = h.clone(), h.start = t(u), h.end = t(c), d.push(h)
                    }
                    e.timeFrames = e.timeFrames.concat(d);
                    var g = i(s);
                    e.daysTimeFrames[g] = d, s = l, a = t(s).startOf("day"), r = a.add(1, "day")
                }
                for (n = 0; n < e.timeFrames.length; n++) {
                    var m = e.timeFrames[n], p = m.start.diff(e.date, "milliseconds"), f = p / e.duration * e.width, v = m.end.diff(m.start, "milliseconds"), w = v / e.duration * e.width, y = !1;
                    m.working && "visible" !== e.timeFramesWorkingMode ? y = !0 : m.working || "visible" === e.timeFramesNonWorkingMode || (y = !0), y || e.visibleTimeFrames.push(m), m.hidden = y, m.left = f, m.width = w, m.originalSize = {
                        left: m.left,
                        width: m.width
                    }
                }
                if ("cropped" === e.timeFramesNonWorkingMode || "cropped" === e.timeFramesWorkingMode) {
                    for (var k = 0, b = 0; b < e.timeFrames.length; b++) {
                        var M = e.timeFrames[b];
                        (!M.working && "cropped" !== e.timeFramesNonWorkingMode || M.working && "cropped" !== e.timeFramesWorkingMode) && (k += M.width)
                    }
                    if (k !== e.width) {
                        var $ = e.width / k, C = 0, F = 0, T = !0;
                        for (b = 0; b < e.timeFrames.length; b++) {
                            var R = e.timeFrames[b];
                            !R.working && "cropped" !== e.timeFramesNonWorkingMode || R.working && "cropped" !== e.timeFramesWorkingMode ? (R.left = (R.left - C) * $, R.width = R.width * $, R.originalSize.left = (R.originalSize.left - F) * $, R.originalSize.width = R.originalSize.width * $, R.cropped = !1, T = !1) : (C += R.width, F += R.originalSize.width, R.left = void 0, R.width = 0, R.originalSize = {
                                left: void 0,
                                width: 0
                            }, R.cropped = !0)
                        }
                        e.cropped = T
                    } else e.cropped = !1
                }
            }
        }, e.prototype.clone = function () {
            return new e(t(this.date), t(this.endDate), this.left, this.width, this.calendar)
        }, e.prototype.containsDate = function (t) {
            return t > this.date && t <= this.endDate
        }, e.prototype.equals = function (t) {
            return this.date === t.date
        }, e.prototype.roundTo = function (t, e, i, n) {
            "day" === e && (e = "date"), i = i || 1;
            var s = t.get(e);
            switch (n) {
                case"up":
                    s = Math.ceil(s / i);
                    break;
                case"down":
                    s = Math.floor(s / i);
                    break;
                default:
                    s = Math.round(s / i)
            }
            var a = ["millisecond", "second", "minute", "hour", "date", "month", "year"];
            t.set(e, s * i);
            for (var r = a.indexOf(e), o = 0; r > o; o++)t.set(a[o], 0);
            return t
        }, e.prototype.getMagnetDate = function (e, i, n, s) {
            if (i > 0 && void 0 !== n) {
                var a = e;
                if (e = t(e), "column" === n) {
                    var r = this.getPositionByDate(e);
                    e = t(r < this.width / 2 ? this.date : this.endDate)
                } else e = this.roundTo(e, n, i), e < this.date ? e = t(this.date) : e > this.endDate && (e = t(this.endDate));
                if (s)for (var o, l = Math.abs(a.diff(e, "milliseconds")), d = 0; d < this.timeFrames.length; d++) {
                    var h = this.timeFrames[d];
                    if (h.magnet) {
                        var u, c = this.timeFrames[d - 1], g = this.timeFrames[d + 1];
                        (void 0 === c || c.working !== h.working) && (u = Math.abs(a.diff(h.start, "milliseconds")), l > u && (void 0 === o || o > u) && (o = u, e = h.start)), (void 0 === g || g.working !== h.working) && (u = Math.abs(a.diff(h.end, "milliseconds")), l > u && (void 0 === o || o > u) && (o = u, e = h.end))
                    }
                }
            }
            return e
        }, e.prototype.getDateByPositionUsingTimeFrames = function (e) {
            for (var i = 0, n = this.timeFrames.length; n > i; i++) {
                var s = this.timeFrames[i];
                if (!s.cropped && e >= s.left && e <= s.left + s.width) {
                    var a = s.getDuration() / s.width * (e - s.left), r = t(s.start).add(a, "milliseconds");
                    return r
                }
            }
        }, e.prototype.getDateByPosition = function (e, i, n, s) {
            var a, r;
            return 0 > e && (e = 0), e > this.width && (e = this.width), ("cropped" === this.timeFramesNonWorkingMode || "cropped" === this.timeFramesWorkingMode) && (r = this.getDateByPositionUsingTimeFrames(e)), void 0 === r && (a = this.duration / this.width * e, r = t(this.date).add(a, "milliseconds")), r = this.getMagnetDate(r, i, n, s)
        }, e.prototype.getDayTimeFrame = function (t) {
            var e = this.daysTimeFrames[i(t)];
            return void 0 === e ? [] : e
        }, e.prototype.getPositionByDate = function (t) {
            var e, i;
            if ("cropped" === this.timeFramesNonWorkingMode || "cropped" === this.timeFramesWorkingMode)for (var n = t, s = this.getDayTimeFrame(n), a = 0; a < s.length; a++) {
                var r = s[a];
                if (n >= r.start && n <= r.end) {
                    if (!r.cropped)return e = n.diff(r.start, "milliseconds"), i = e / r.getDuration() * r.width, this.left + r.left + i;
                    n = s.length > a + 1 ? s[a + 1].start : r.end
                }
            }
            return e = t.diff(this.date, "milliseconds"), i = e / this.duration * this.width, 0 > i && (i = 0), i > this.width && (i = this.width), this.left + i
        }, e
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttColumnBuilder", ["GanttColumn", function (t) {
        var e = function (t) {
            this.columnsManager = t
        };
        return e.prototype.newColumn = function (e, i, n, s) {
            var a = this.columnsManager.gantt.calendar, r = this.columnsManager.gantt.options.value("timeFramesWorkingMode"), o = this.columnsManager.gantt.options.value("timeFramesNonWorkingMode");
            return new t(e, i, n, s, a, r, o)
        }, e
    }])
}(), function () {
    "use strict";
    angular.module("gantt").service("GanttColumnGenerator", ["moment", function (t) {
        var e = function (e, i, n) {
            return t(e).add(i, n).startOf(n) === e
        }, i = function (t) {
            return ["hour", "minute", "second", "millisecond"].indexOf(t) >= 0 ? 0 : void 0
        }, n = function (t, e, n) {
            var s = e.get(t), a = n.get(t), r = i(t);
            void 0 !== r && a !== r && s > a && n.set(t, r)
        };
        this.generate = function (i, s, a, r, o, l, d, h) {
            if (!a && !l)throw"to or maximumWidth must be defined";
            r = r.trim(), "s" === r.charAt(r.length - 1) && (r = r.substring(0, r.length - 1));
            var u, c, g;
            r && (g = r.split(" ")), g && g.length > 1 ? (u = parseFloat(g[0]), c = g[g.length - 1]) : (u = 1, c = r);
            var m = !1;
            s = t(s).startOf(c), a && (m = e(a), a = t(a).startOf(c));
            var p = 0, f = t(s).startOf(c);
            h && (f.add(-u, c), p -= o);
            for (var v = []; ;) {
                if (l && Math.abs(p) > l + o)break;
                var w = t(f), y = t(w).add(u, c);
                n(c, w, y);
                var k = i.newColumn(w, y, d ? p + d : p, o);
                if (k.cropped || (v.push(k), h ? p -= o : p += o), a)if (h) {
                    if (m && a > f || !m && a >= f)break
                } else if (m && f > a || !m && f >= a)break;
                h ? (f.add(-u, c), n(c, f, w)) : (f.add(u, c), n(c, w, f))
            }
            return h && (e(s, u, c) && v.shift(), v.reverse()), v
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttColumnHeader", ["moment", "GanttColumn", function (t, e) {
        var i = function (i, n, s, a, r, o) {
            i = t(i), n = t(n);
            var l = new e(i, n, a, r);
            return l.unit = s, l.label = angular.isFunction(o) ? o(l) : i.format(o), l
        };
        return i
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttColumnsManager", ["GanttColumnGenerator", "GanttColumnBuilder", "GanttHeadersGenerator", "$filter", "$timeout", "ganttLayout", "ganttBinarySearch", "moment", function (t, e, i, n, s, a, r, o) {
        var l = function (t) {
            var i = this;
            this.gantt = t, this.from = void 0, this.to = void 0, this.columns = [], this.visibleColumns = [], this.previousColumns = [], this.nextColumns = [], this.headers = [], this.visibleHeaders = [], this.scrollAnchor = void 0, this.columnBuilder = new e(this), this.gantt.$scope.$watchGroup(["viewScale", "columnWidth", "timeFramesWorkingMode", "timeFramesNonWorkingMode", "fromDate", "toDate", "autoExpand", "taskOutOfRange"], function (t, e) {
                t !== e && i.gantt.rendered && i.generateColumns()
            }), this.gantt.$scope.$watchCollection("headers", function (t, e) {
                t !== e && i.gantt.rendered && i.generateColumns()
            }), this.gantt.$scope.$watchCollection("headersFormats", function (t, e) {
                t !== e && i.gantt.rendered && i.generateColumns()
            }), this.gantt.$scope.$watchGroup(["ganttElementWidth", "showSide", "sideWidth", "maxHeight", "daily"], function (t, e) {
                t !== e && i.gantt.rendered && i.updateColumnsMeta()
            }), this.gantt.api.data.on.load(this.gantt.$scope, function () {
                (void 0 === i.from || void 0 === i.to || i.from > i.gantt.rowsManager.getDefaultFrom() || i.to < i.gantt.rowsManager.getDefaultTo()) && i.gantt.rendered && i.generateColumns(), i.gantt.rowsManager.sortRows()
            }), this.gantt.api.data.on.remove(this.gantt.$scope, function () {
                i.gantt.rowsManager.sortRows()
            }), this.gantt.api.registerMethod("columns", "clear", this.clearColumns, this), this.gantt.api.registerMethod("columns", "generate", this.generateColumns, this), this.gantt.api.registerMethod("columns", "refresh", this.updateColumnsMeta, this), this.gantt.api.registerMethod("columns", "getColumnsWidth", this.getColumnsWidth, this), this.gantt.api.registerMethod("columns", "getColumnsWidthToFit", this.getColumnsWidthToFit, this), this.gantt.api.registerMethod("columns", "getDateRange", this.getDateRange, this), this.gantt.api.registerEvent("columns", "clear"), this.gantt.api.registerEvent("columns", "generate"), this.gantt.api.registerEvent("columns", "refresh")
        };
        l.prototype.setScrollAnchor = function () {
            if (this.gantt.scroll.$element && this.columns.length > 0) {
                var t = this.gantt.scroll.$element[0], e = t.scrollLeft + t.offsetWidth / 2;
                this.scrollAnchor = this.gantt.getDateByPosition(e)
            }
        }, l.prototype.scrollToScrollAnchor = function () {
            var t = this;
            this.columns.length > 0 && void 0 !== this.scrollAnchor && this.gantt.$scope.$$postDigest(function () {
                t.gantt.api.scroll.toDate(t.scrollAnchor)
            })
        }, l.prototype.clearColumns = function () {
            this.setScrollAnchor(), this.from = void 0, this.to = void 0, this.columns = [], this.visibleColumns = [], this.previousColumns = [], this.nextColumns = [], this.headers = [], this.visibleHeaders = [], this.gantt.api.columns.raise.clear()
        }, l.prototype.generateColumns = function (e, n) {
            return e || (e = this.gantt.options.value("fromDate")), n || (n = this.gantt.options.value("toDate")), (e && (!o.isMoment(e) || e.isValid()) || (e = this.gantt.rowsManager.getDefaultFrom())) && (n && (!o.isMoment(n) || n.isValid()) || (n = this.gantt.rowsManager.getDefaultTo())) ? (void 0 === e || o.isMoment(e) || (e = o(e)), void 0 === n || o.isMoment(n) || (n = o(n)), "expand" === this.gantt.options.value("taskOutOfRange") && (e = this.gantt.rowsManager.getExpandedFrom(e), n = this.gantt.rowsManager.getExpandedTo(n)), this.setScrollAnchor(), this.from = e, this.to = n, this.columns = t.generate(this.columnBuilder, e, n, this.gantt.options.value("viewScale"), this.getColumnsWidth()), this.headers = i.generate(this), this.previousColumns = [], this.nextColumns = [], this.updateColumnsMeta(), this.scrollToScrollAnchor(), void this.gantt.api.columns.raise.generate(this.columns, this.headers)) : !1
        }, l.prototype.updateColumnsMeta = function () {
            this.gantt.isRefreshingColumns = !0;
            var t = this.getLastColumn();
            this.gantt.originalWidth = void 0 !== t ? t.originalSize.left + t.originalSize.width : 0;
            var e = this.updateColumnsWidths(this.columns, this.headers, this.previousColumns, this.nextColumns);
            this.gantt.width = void 0 !== t ? t.left + t.width : 0;
            var i = this.gantt.options.value("showSide"), n = this.gantt.side.isShown(), s = i !== n;
            s && !i && this.gantt.side.show(!1), this.gantt.rowsManager.updateTasksPosAndSize(), this.gantt.timespansManager.updateTimespansPosAndSize(), this.updateVisibleColumns(e), this.gantt.rowsManager.updateVisibleObjects();
            var a = this.gantt.options.value("currentDateValue");
            this.gantt.currentDateManager.setCurrentDate(a), s && i && this.gantt.side.show(!0), this.gantt.isRefreshingColumns = !1, this.gantt.api.columns.raise.refresh(this.columns, this.headers)
        }, l.prototype.getLastColumn = function (t) {
            var e = this.columns;
            return t && (e = this.nextColumns), e && e.length > 0 ? e[e.length - 1] : void 0
        }, l.prototype.getFirstColumn = function (t) {
            var e = this.columns;
            return t && (e = this.previousColumns), e && e.length > 0 ? e[0] : void 0
        }, l.prototype.getColumnByDate = function (t, e) {
            e || this.expandExtendedColumnsForDate(t);
            var i = this.previousColumns.concat(this.columns, this.nextColumns), n = r.get(i, t, function (t) {
                return t.date
            }, !0);
            return void 0 === n[0] ? n[1] : n[0]
        }, l.prototype.getColumnByPosition = function (t, e) {
            e || this.expandExtendedColumnsForPosition(t);
            var i = this.previousColumns.concat(this.columns, this.nextColumns), n = r.get(i, t, function (t) {
                return t.left
            }, !0);
            return void 0 === n[0] ? n[1] : n[0]
        }, l.prototype.updateColumnsWidths = function (t, e, i, n) {
            var s = this.gantt.options.value("columnWidth"), r = this.gantt.options.value("expandToFit"), o = this.gantt.options.value("shrinkToFit");
            if (void 0 === s || r || o) {
                var l = this.gantt.getBodyAvailableWidth(), d = this.gantt.columnsManager.getLastColumn(!1);
                if (void 0 !== d) {
                    var h = d.originalSize.left + d.originalSize.width;
                    if (r && l > h || o && h > l || void 0 === s) {
                        var u = l / h;
                        a.setColumnsWidthFactor(t, u);
                        for (var c = 0; c < e.length; c++)a.setColumnsWidthFactor(e[c], u);
                        return i.splice(0, this.previousColumns.length), n.splice(0, this.nextColumns.length), !0
                    }
                }
            }
            return !1
        }, l.prototype.getColumnsWidth = function () {
            var t = this.gantt.options.value("columnWidth");
            return void 0 === t && (t = !this.gantt.width || this.gantt.width <= 0 ? 20 : this.gantt.width / this.columns.length), t
        }, l.prototype.getColumnsWidthToFit = function () {
            return this.gantt.getBodyAvailableWidth() / this.columns.length
        }, l.prototype.expandExtendedColumnsForPosition = function (e) {
            var i;
            if (0 > e) {
                var n = this.getFirstColumn(), s = n.date, a = this.getFirstColumn(!0);
                return (!a || a.left > e) && (i = this.gantt.options.value("viewScale"), this.previousColumns = t.generate(this.columnBuilder, s, void 0, i, this.getColumnsWidth(), -e, 0, !0)), !0
            }
            if (e > this.gantt.width) {
                var r = this.getLastColumn(), o = r.getDateByPosition(r.width), l = this.getLastColumn(!0);
                return (!l || l.left + l.width < e) && (i = this.gantt.options.value("viewScale"), this.nextColumns = t.generate(this.columnBuilder, o, void 0, i, this.getColumnsWidth(), e - this.gantt.width, this.gantt.width, !1)), !0
            }
            return !1
        }, l.prototype.expandExtendedColumnsForDate = function (e) {
            var i, n = this.getFirstColumn();
            n && (i = n.date);
            var s, a = this.getLastColumn();
            a && (s = a.getDateByPosition(a.width));
            var r;
            if (i && i > e) {
                var o = this.getFirstColumn(!0);
                return (!o || o.date > e) && (r = this.gantt.options.value("viewScale"), this.previousColumns = t.generate(this.columnBuilder, i, e, r, this.getColumnsWidth(), void 0, 0, !0)), !0
            }
            if (s && e >= s) {
                var l = this.getLastColumn(!0);
                return (!l || l.date < s) && (r = this.gantt.options.value("viewScale"), this.nextColumns = t.generate(this.columnBuilder, s, e, r, this.getColumnsWidth(), void 0, this.gantt.width, !1)), !0
            }
            return !1
        }, l.prototype.getActiveHeadersCount = function () {
            return this.headers.length
        }, l.prototype.updateVisibleColumns = function (t) {
            this.visibleColumns = n("ganttColumnLimit")(this.columns, this.gantt), this.visibleHeaders = [];
            for (var e = 0; e < this.headers.length; e++)this.visibleHeaders.push(n("ganttColumnLimit")(this.headers[e], this.gantt));
            if (t) {
                for (e = 0; e < this.visibleColumns.length; e++)this.visibleColumns[e].updateView();
                for (e = 0; e < this.visibleHeaders.length; e++)for (var i = this.visibleHeaders[e], s = 0; s < i.length; s++)i[s].updateView()
            }
            var a = this.gantt.options.value("currentDateValue");
            this.gantt.currentDateManager.setCurrentDate(a)
        };
        var d = {
            year: "YYYY",
            quarter: "[Q]Q YYYY",
            month: "MMMM YYYY",
            week: "w",
            day: "D",
            hour: "H",
            minute: "HH:mm"
        }, h = {day: "LL", hour: "H", minute: "HH:mm"}, u = {year: "YYYY", quarter: "[Q]Q", month: "MMMM"};
        return l.prototype.getHeaderFormat = function (t) {
            var e, i = this.gantt.options.value("headersFormats");
            if (void 0 !== i && (e = i[t]), void 0 === e) {
                var n = this.gantt.options.value("viewScale");
                n = n.trim(), "s" === n.charAt(n.length - 1) && (n = n.substring(0, n.length - 1));
                var s, a;
                n && (a = n.split(" ")), s = a && a.length > 1 ? a[a.length - 1] : n, ["millisecond", "second", "minute", "hour"].indexOf(s) > -1 ? e = h[t] : ["month", "quarter", "year"].indexOf(s) > -1 && (e = u[t]), void 0 === e && (e = d[t])
            }
            return e
        }, l.prototype.getDateRange = function (t) {
            var e, i;
            return t ? this.visibleColumns && this.visibleColumns.length > 0 && (e = this.visibleColumns[0], i = this.visibleColumns[this.visibleColumns.length - 1]) : (e = this.getFirstColumn(), i = this.getLastColumn()), e && i ? [e.date, i.endDate] : void 0
        }, l
    }])
}(), function () {
    "use strict";
    angular.module("gantt").service("GanttHeadersGenerator", ["GanttColumnHeader", "moment", function (t, e) {
        var i = function (i, n) {
            var s, a, r, o, l = [];
            n && (o = n.split(" ")), o && o.length > 1 ? (a = parseFloat(o[0]), r = o[o.length - 1]) : (a = 1, r = n);
            for (var d = i.columns[0], h = e(d.date).startOf(r), u = e(i.columns[i.columns.length - 1].endDate); ;) {
                var c = d.getPositionByDate(h), g = e.min(e(h).add(a, r), u), m = i.getColumnByDate(g, !0), p = m.getPositionByDate(g), f = p - c;
                if (f > 0) {
                    var v = i.getHeaderFormat(r);
                    s = new t(h, g, r, c, f, v), l.push(s)
                }
                if (g.isSame(u) || g.isAfter(u))break;
                d = m, h = g
            }
            return l
        };
        this.generate = function (t) {
            var e = [];
            if (void 0 === t.gantt.options.value("headers")) {
                var n = t.gantt.options.value("viewScale");
                n = n.trim(), "s" === n.charAt(n.length - 1) && (n = n.substring(0, n.length - 1));
                var s, a;
                n && (a = n.split(" ")), s = a && a.length > 1 ? a[a.length - 1] : n, ["quarter", "month"].indexOf(s) > -1 && e.push("year"), ["day", "week"].indexOf(s) > -1 && e.push("month"), ["day"].indexOf(s) > -1 && e.push("week"), ["hour"].indexOf(s) > -1 && e.push("day"), ["minute", "second"].indexOf(s) > -1 && e.push("hour"), ["second"].indexOf(s) > -1 && e.push("minute"), e.push(n)
            } else e = t.gantt.options.value("headers");
            for (var r = [], o = 0; o < e.length; o++)r.push(i(t, e[o]));
            return r
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("Gantt", ["GanttApi", "GanttOptions", "GanttCalendar", "GanttScroll", "GanttBody", "GanttRowHeader", "GanttHeader", "GanttSide", "GanttObjectModel", "GanttRowsManager", "GanttColumnsManager", "GanttTimespansManager", "GanttCurrentDateManager", "ganttArrays", "moment", "$document", "$timeout", function (t, e, i, n, s, a, r, o, l, d, h, u, c, g, m, p, f) {
        var v = function (a, f) {
            var v = this;
            this.$scope = a, this.$element = f, this.options = new e(a, {
                api: angular.noop,
                data: [],
                timespans: [],
                viewScale: "day",
                columnMagnet: "15 minutes",
                timeFramesMagnet: !0,
                showSide: !0,
                allowSideResizing: !0,
                currentDate: "line",
                currentDateValue: m,
                autoExpand: "none",
                taskOutOfRange: "truncate",
                taskContent: "{{task.model.name}}",
                rowContent: "{{row.model.name}}",
                maxHeight: 0,
                timeFrames: [],
                dateFrames: [],
                timeFramesWorkingMode: "hidden",
                timeFramesNonWorkingMode: "visible"
            }), this.api = new t(this), this.api.registerEvent("core", "ready"), this.api.registerEvent("core", "rendered"), this.api.registerEvent("directives", "controller"), this.api.registerEvent("directives", "preLink"), this.api.registerEvent("directives", "postLink"), this.api.registerEvent("directives", "new"), this.api.registerEvent("directives", "destroy"), this.api.registerEvent("data", "change"), this.api.registerEvent("data", "load"), this.api.registerEvent("data", "remove"), this.api.registerEvent("data", "clear"), this.api.registerMethod("core", "getDateByPosition", this.getDateByPosition, this), this.api.registerMethod("core", "getPositionByDate", this.getPositionByDate, this), this.api.registerMethod("data", "load", this.loadData, this), this.api.registerMethod("data", "remove", this.removeData, this), this.api.registerMethod("data", "clear", this.clearData, this), this.api.registerMethod("data", "get", this.getData, this), this.calendar = new i(this), this.calendar.registerTimeFrames(this.options.value("timeFrames")), this.calendar.registerDateFrames(this.options.value("dateFrames")), this.api.registerMethod("timeframes", "registerTimeFrames", this.calendar.registerTimeFrames, this.calendar), this.api.registerMethod("timeframes", "clearTimeframes", this.calendar.clearTimeFrames, this.calendar), this.api.registerMethod("timeframes", "registerDateFrames", this.calendar.registerDateFrames, this.calendar), this.api.registerMethod("timeframes", "clearDateFrames", this.calendar.clearDateFrames, this.calendar), this.api.registerMethod("timeframes", "registerTimeFrameMappings", this.calendar.registerTimeFrameMappings, this.calendar), this.api.registerMethod("timeframes", "clearTimeFrameMappings", this.calendar.clearTimeFrameMappings, this.calendar), a.$watchGroup(["timeFrames", "dateFrames"], function (t, e) {
                if (t !== e) {
                    var i = t[0], n = t[1], s = e[0], a = e[1], r = !1;
                    angular.equals(i, s) || (v.calendar.clearTimeFrames(), v.calendar.registerTimeFrames(i), r = !0), angular.equals(n, a) || (v.calendar.clearDateFrames(), v.calendar.registerDateFrames(n), r = !0), r && v.columnsManager.generateColumns()
                }
            }), a.$watch("columnMagnet", function () {
                var t, e = v.options.value("columnMagnet");
                e && (t = e.trim().split(" ")), t && t.length > 1 ? (v.columnMagnetValue = parseFloat(t[0]), v.columnMagnetUnit = m.normalizeUnits(t[t.length - 1])) : (v.columnMagnetValue = 1, v.columnMagnetUnit = m.normalizeUnits(e))
            }), a.$watchGroup(["shiftColumnMagnet", "viewScale"], function () {
                var t, e = v.options.value("shiftColumnMagnet");
                e && (t = e.trim().split(" ")), void 0 !== t && t.length > 1 ? (v.shiftColumnMagnetValue = parseFloat(t[0]), v.shiftColumnMagnetUnit = m.normalizeUnits(t[t.length - 1])) : (v.shiftColumnMagnetValue = 1, v.shiftColumnMagnetUnit = m.normalizeUnits(e))
            });
            var w = function (t) {
                return v.shiftKey = t.shiftKey, !0
            };
            p.on("keyup keydown", w), a.$on("$destroy", function () {
                p.off("keyup keydown", w)
            }), this.scroll = new n(this), this.body = new s(this), this.header = new r(this), this.side = new o(this), this.objectModel = new l(this.api), this.rowsManager = new d(this), this.columnsManager = new h(this), this.timespansManager = new u(this), this.currentDateManager = new c(this), this.originalWidth = 0, this.width = 0, angular.isFunction(this.$scope.api) && this.$scope.api(this.api);
            var y = function (t, e) {
                if (void 0 === e || t.length !== e.length)return !0;
                for (var i = 0, n = t.length; n > i; i++)if (t[i].id !== e[i].id)return !0;
                return !1
            };
            a.$watchCollection("data", function (t, e) {
                if (void 0 !== e) {
                    var i = g.getRemovedIds(t, e);
                    if (i.length === e.length)v.rowsManager.removeAll(), v.api.data.raise.clear(); else {
                        for (var n = 0, s = i.length; s > n; n++) {
                            var a = i[n];
                            v.rowsManager.removeRow(a)
                        }
                        var r = [];
                        for (n = 0, s = e.length; s > n; n++)i.indexOf(e[n].id) > -1 && r.push(e[n]);
                        v.api.data.raise.remove(r)
                    }
                }
                if (void 0 !== t) {
                    var o = y(t, e);
                    o && v.rowsManager.resetNonModelLists();
                    for (var l = 0, d = t.length; d > l; l++) {
                        var h = t[l];
                        v.rowsManager.addRow(h, o)
                    }
                    v.api.data.raise.change(t, e), v.api.data.raise.load(t)
                }
            })
        };
        return v.prototype.getDateByPosition = function (t, e, i) {
            var n = this.columnsManager.getColumnByPosition(t, i);
            if (void 0 !== n) {
                var s, a;
                if (e)if (this.shiftKey)if (void 0 !== this.shiftColumnMagnetValue && void 0 !== this.shiftColumnMagnetUnit)s = this.shiftColumnMagnetValue, a = this.shiftColumnMagnetUnit; else {
                    var r = this.options.value("viewScale");
                    r = r.trim();
                    var o, l, d;
                    r && (d = r.split(" ")), d && d.length > 1 ? (o = parseFloat(d[0]), l = m.normalizeUnits(d[d.length - 1])) : (o = 1, l = m.normalizeUnits(r)), s = .25 * o, a = l
                } else s = this.columnMagnetValue, a = this.columnMagnetUnit;
                return n.getDateByPosition(t - n.left, s, a, this.options.value("timeFramesMagnet"))
            }
            return void 0
        }, v.prototype.getBodyAvailableWidth = function () {
            var t = this.getWidth() - this.side.getWidth(), e = this.scroll.getBordersWidth(), i = t - (void 0 !== e ? this.scroll.getBordersWidth() : 0);
            return i -= 1
        }, v.prototype.getPositionByDate = function (t, e) {
            if (void 0 === t)return void 0;
            m.isMoment(m) || (t = m(t));
            var i = this.columnsManager.getColumnByDate(t, e);
            return void 0 !== i ? i.getPositionByDate(t) : void 0
        }, v.prototype.loadData = function (t) {
            if (angular.isArray(t) || (t = void 0 !== t ? [t] : []), void 0 === this.$scope.data)this.$scope.data = t; else for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e], s = g.indexOfId(this.$scope.data, n.id);
                s > -1 ? this.$scope.data[s] = n : this.$scope.data.push(n)
            }
            var a = this.side.getWidth();
            a > 0 && this.options.set("sideWidth", a)
        }, v.prototype.getData = function () {
            return this.$scope.data
        }, v.prototype.removeData = function (t) {
            if (angular.isArray(t) || (t = void 0 !== t ? [t] : []), void 0 !== this.$scope.data)for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e], s = g.indexOfId(this.$scope.data, n.id);
                if (s > -1)if (void 0 === n.tasks || 0 === n.tasks.length)this.$scope.data.splice(s, 1); else for (var a = this.$scope.data[s], r = 0, o = n.tasks.length; o > r; r++) {
                    var l = n.tasks[r], d = g.indexOfId(a.tasks, l.id);
                    d > -1 && a.tasks.splice(d, 1)
                }
            }
        }, v.prototype.clearData = function () {
            this.$scope.data = void 0
        }, v.prototype.getWidth = function () {
            return this.$scope.ganttElementWidth
        }, v.prototype.initialized = function () {
            this.api.core.raise.ready(this.api), this.rendered = !0, this.columnsManager.generateColumns();
            var t = this, e = function () {
                var e = t.side.getWidth();
                e > 0 && t.options.set("sideWidth", e), t.api.core.raise.rendered(t.api)
            };
            f(e)
        }, v
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttObjectModel", ["ganttUtils", "moment", function (t, e) {
        var i = function (t) {
            this.api = t, this.api.registerEvent("tasks", "clean"), this.api.registerEvent("rows", "clean"), this.api.registerEvent("timespans", "clean")
        };
        return i.prototype.cleanTask = function (i) {
            void 0 === i.id && (i.id = t.randomUuid()), void 0 === i.from || e.isMoment(i.from) || (i.from = e(i.from)), void 0 === i.to || e.isMoment(i.to) || (i.to = e(i.to)), this.api.tasks.raise.clean(i)
        }, i.prototype.cleanRow = function (i) {
            void 0 === i.id && (i.id = t.randomUuid()), void 0 === i.from || e.isMoment(i.from) || (i.from = e(i.from)), void 0 === i.to || e.isMoment(i.to) || (i.to = e(i.to)), this.api.rows.raise.clean(i)
        }, i.prototype.cleanTimespan = function (i) {
            void 0 === i.id && (i.id = t.randomUuid()), void 0 === i.from || e.isMoment(i.from) || (i.from = e(i.from)), void 0 === i.to || e.isMoment(i.to) || (i.to = e(i.to)), this.api.timespans.raise.clean(i)
        }, i
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttRow", ["GanttTask", "moment", "$filter", function (t, e, i) {
        var n = function (t, e) {
            this.rowsManager = t, this.model = e, this.from = void 0, this.to = void 0, this.tasksMap = {}, this.tasks = [], this.filteredTasks = [], this.visibleTasks = []
        };
        return n.prototype.addTaskImpl = function (t, e) {
            this.tasksMap[t.model.id] = t, this.tasks.push(t), e || (void 0 === this.model.tasks && (this.model.tasks = []), -1 === this.model.tasks.indexOf(t.model) && this.model.tasks.push(t.model))
        }, n.prototype.addTask = function (e, i) {
            var n, s = !1;
            if (this.rowsManager.gantt.objectModel.cleanTask(e), e.id in this.tasksMap) {
                if (n = this.tasksMap[e.id], n.model === e)return n;
                n.model = e, s = !0
            } else n = new t(this, e), this.addTaskImpl(n, i);
            return this.sortTasks(), this.setFromToByTask(n), i || (s ? this.rowsManager.gantt.api.tasks.raise.change(n) : this.rowsManager.gantt.api.tasks.raise.add(n)), n
        }, n.prototype.moveTaskToRow = function (t, e) {
            var i = t.row;
            i.removeTask(t.model.id, e, !0), t.row = this, this.addTaskImpl(t, e), this.sortTasks(), this.setFromToByTask(t), t.updatePosAndSize(), this.updateVisibleTasks(), i.$scope.$digest(), t.row.$scope.$digest(), this.rowsManager.gantt.api.tasks.raise.viewRowChange(t, i), e || this.rowsManager.gantt.api.tasks.raise.rowChange(t, i)
        }, n.prototype.updateVisibleTasks = function () {
            var t = this.rowsManager.gantt.options.value("filterTask");
            if (t) {
                "object" == typeof t && (t = {model: t});
                var e = this.rowsManager.gantt.options.value("filterTaskComparator");
                "function" == typeof e && (e = function (t, i) {
                    return e(t.model, i.model)
                }), this.filteredTasks = i("filter")(this.tasks, t, e)
            } else this.filteredTasks = this.tasks.slice(0);
            this.visibleTasks = i("ganttTaskLimit")(this.filteredTasks, this.rowsManager.gantt)
        }, n.prototype.updateTasksPosAndSize = function () {
            for (var t = 0, e = this.tasks.length; e > t; t++)this.tasks[t].updatePosAndSize()
        }, n.prototype.removeTask = function (t, e, i) {
            if (t in this.tasksMap) {
                var n, s, a = this.tasksMap[t];
                for (s = this.tasks.length - 1; s >= 0; s--)if (n = this.tasks[s], n.model.id === t) {
                    this.tasks.splice(s, 1), (this.from - n.model.from === 0 || this.to - n.model.to === 0) && this.setFromTo();
                    break
                }
                for (s = this.filteredTasks.length - 1; s >= 0; s--)if (n = this.filteredTasks[s], n.model.id === t) {
                    this.filteredTasks.splice(s, 1);
                    break
                }
                for (s = this.visibleTasks.length - 1; s >= 0; s--)if (n = this.visibleTasks[s], n.model.id === t) {
                    this.visibleTasks.splice(s, 1);
                    break
                }
                if (!e) {
                    if (delete this.tasksMap[t], void 0 !== this.model.tasks) {
                        var r = this.model.tasks.indexOf(a.model);
                        r > -1 && this.model.tasks.splice(r, 1)
                    }
                    i || this.rowsManager.gantt.api.tasks.raise.remove(a)
                }
                return a
            }
        }, n.prototype.removeAllTasks = function () {
            this.from = void 0, this.to = void 0, this.tasksMap = {}, this.tasks = [], this.filteredTasks = [], this.visibleTasks = []
        }, n.prototype.setFromTo = function () {
            this.from = void 0, this.to = void 0;
            for (var t = 0, e = this.tasks.length; e > t; t++)this.setFromToByTask(this.tasks[t])
        }, n.prototype.setFromToByTask = function (t) {
            this.setFromToByValues(t.model.from, t.model.to)
        }, n.prototype.setFromToByValues = function (t, i) {
            void 0 !== t && (void 0 === this.from ? this.from = e(t) : t < this.from && (this.from = e(t))), void 0 !== i && (void 0 === this.to ? this.to = e(i) : i > this.to && (this.to = e(i)))
        }, n.prototype.sortTasks = function () {
            this.tasks.sort(function (t, e) {
                return t.left - e.left
            })
        }, n.prototype.clone = function () {
            for (var t = new n(this.rowsManager, angular.copy(this)), e = 0, i = this.tasks.length; i > e; e++)t.addTask(this.tasks[e].model);
            return t
        }, n
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttRowHeader", [function () {
        var t = function (t) {
            this.gantt = t
        };
        return t
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttRowsManager", ["GanttRow", "ganttArrays", "$filter", "$timeout", "moment", function (t, e, i, n, s) {
        var a = function (t) {
            var e = this;
            this.gantt = t, this.rowsMap = {}, this.rows = [], this.sortedRows = [], this.filteredRows = [], this.customFilteredRows = [], this.visibleRows = [], this.rowsTaskWatchers = [], this._defaultFilterImpl = function (t, e, n) {
                return i("filter")(t, e, n)
            }, this.filterImpl = this._defaultFilterImpl, this.customRowSorters = [], this.customRowFilters = [], this.gantt.$scope.$watchGroup(["filterTask", "filterTaskComparator"], function (t, i) {
                t !== i && e.updateVisibleTasks()
            }), this.gantt.$scope.$watchGroup(["filterRow", "filterRowComparator"], function (t, i) {
                t !== i && e.updateVisibleRows()
            }), this.gantt.$scope.$watch("sortMode", function (t, i) {
                t !== i && e.sortRows()
            });
            var s = this.gantt.scroll.isVScrollbarVisible();
            this.gantt.$scope.$watchGroup(["maxHeight", "gantt.rowsManager.visibleRows.length"], function (t, i) {
                t !== i && n(function () {
                    var t = e.gantt.scroll.isVScrollbarVisible();
                    t !== s && (s = t, e.gantt.columnsManager.updateColumnsMeta())
                })
            }), this.gantt.api.registerMethod("rows", "sort", a.prototype.sortRows, this), this.gantt.api.registerMethod("rows", "applySort", a.prototype.applySort, this), this.gantt.api.registerMethod("rows", "refresh", a.prototype.updateVisibleObjects, this), this.gantt.api.registerMethod("rows", "removeRowSorter", a.prototype.removeCustomRowSorter, this), this.gantt.api.registerMethod("rows", "addRowSorter", a.prototype.addCustomRowSorter, this), this.gantt.api.registerMethod("rows", "removeRowFilter", a.prototype.removeCustomRowFilter, this), this.gantt.api.registerMethod("rows", "addRowFilter", a.prototype.addCustomRowFilter, this), this.gantt.api.registerMethod("rows", "setFilterImpl", a.prototype.setFilterImpl, this), this.gantt.api.registerEvent("tasks", "add"), this.gantt.api.registerEvent("tasks", "change"), this.gantt.api.registerEvent("tasks", "viewChange"), this.gantt.api.registerEvent("tasks", "rowChange"), this.gantt.api.registerEvent("tasks", "viewRowChange"), this.gantt.api.registerEvent("tasks", "remove"), this.gantt.api.registerEvent("tasks", "filter"), this.gantt.api.registerEvent("tasks", "displayed"), this.gantt.api.registerEvent("rows", "add"), this.gantt.api.registerEvent("rows", "change"), this.gantt.api.registerEvent("rows", "remove"), this.gantt.api.registerEvent("rows", "move"), this.gantt.api.registerEvent("rows", "displayed"), this.gantt.api.registerEvent("rows", "filter"), this.updateVisibleObjects()
        };
        return a.prototype.resetNonModelLists = function () {
            this.rows = [], this.sortedRows = [], this.filteredRows = [], this.customFilteredRows = [], this.visibleRows = []
        }, a.prototype.addRow = function (i, n) {
            var s, a, r, o = !1;
            if (this.gantt.objectModel.cleanRow(i), i.id in this.rowsMap) {
                if (s = this.rowsMap[i.id], n && (this.rows.push(s), this.sortedRows.push(s), this.filteredRows.push(s), this.customFilteredRows.push(s), this.visibleRows.push(s)), s.model === i)return;
                var l = e.getRemovedIds(i.tasks, s.model.tasks);
                for (a = 0, r = l.length; r > a; a++) {
                    var d = l[a];
                    s.removeTask(d)
                }
                s.model = i, o = !0
            } else s = new t(this, i), this.rowsMap[i.id] = s, this.rows.push(s), this.sortedRows.push(s), this.filteredRows.push(s), this.customFilteredRows.push(s), this.visibleRows.push(s);
            if (void 0 !== i.tasks && i.tasks.length > 0) {
                for (a = 0, r = i.tasks.length; r > a; a++) {
                    var h = i.tasks[a];
                    s.addTask(h)
                }
                s.updateVisibleTasks()
            }
            if (o ? this.gantt.api.rows.raise.change(s) : this.gantt.api.rows.raise.add(s), !o) {
                var u = this.gantt.$scope.$watchCollection(function () {
                    return i.tasks
                }, function (t, i) {
                    if (t !== i) {
                        var n, a, r = e.getRemovedIds(t, i);
                        for (n = 0, a = r.length; a > n; n++) {
                            var o = r[n];
                            s.removeTask(o)
                        }
                        if (void 0 !== t) {
                            for (n = 0, a = t.length; a > n; n++) {
                                var l = t[n];
                                s.addTask(l)
                            }
                            s.updateVisibleTasks()
                        }
                    }
                });
                this.rowsTaskWatchers.push(u)
            }
            return o
        }, a.prototype.removeRow = function (t) {
            if (t in this.rowsMap) {
                delete this.rowsMap[t];
                var i, n, s = e.indexOfId(this.rows, t, ["model", "id"]);
                if (s > -1) {
                    i = this.rows.splice(s, 1)[0];
                    var a = this.rowsTaskWatchers.splice(s, 1)[0];
                    a()
                }
                return e.removeId(this.sortedRows, t, ["model", "id"]), e.removeId(this.filteredRows, t, ["model", "id"]), e.removeId(this.customFilteredRows, t, ["model", "id"]), e.removeId(this.visibleRows, t, ["model", "id"]), this.gantt.api.rows.raise.remove(i), n
            }
            return void 0
        }, a.prototype.removeAll = function () {
            this.rowsMap = {}, this.rows = [], this.sortedRows = [], this.filteredRows = [], this.customFilteredRows = [], this.visibleRows = [];
            for (var t = 0, e = this.rowsTaskWatchers.length; e > t; t++) {
                var i = this.rowsTaskWatchers[t];
                i()
            }
            this.rowsTaskWatchers = []
        }, a.prototype.sortRows = function () {
            var t = this.gantt.options.value("sortMode");
            if (void 0 !== t) {
                var e = !1;
                angular.isString(t) && "-" === t.charAt(0) && (e = !0, t = t.substr(1));
                var n = i("orderBy");
                this.sortedRows = n(this.rows, t, e)
            } else this.sortedRows = this.rows.slice();
            this.sortedRows = this.applyCustomRowSorters(this.sortedRows), this.updateVisibleRows()
        }, a.prototype.removeCustomRowSorter = function (t) {
            var e = this.customRowSorters.indexOf(t);
            e > -1 && this.customRowSorters.splice(e, 1)
        }, a.prototype.addCustomRowSorter = function (t) {
            this.customRowSorters.push(t)
        }, a.prototype.applyCustomRowSorters = function (t) {
            for (var e = 0; e < this.customRowSorters.length; e++)t = this.customRowSorters[e](t);
            return t
        }, a.prototype.applySort = function () {
            var t = this.gantt.$scope.data;
            t.splice(0, t.length);
            for (var e = [], i = 0, n = this.sortedRows.length; n > i; i++)t.push(this.sortedRows[i].model), e.push(this.sortedRows[i]);
            this.rows = e
        }, a.prototype.moveRow = function (t, i) {
            var n = this.gantt.options.value("sortMode");
            void 0 !== n && (this.applySort(), this.gantt.options.set("sortMode", void 0));
            var s = this.rows.indexOf(i), a = this.rows.indexOf(t);
            s > -1 && a > -1 && s !== a && (e.moveToIndex(this.rows, a, s), e.moveToIndex(this.rowsTaskWatchers, a, s), e.moveToIndex(this.gantt.$scope.data, a, s), this.gantt.api.rows.raise.change(t), this.gantt.api.rows.raise.move(t, a, s), this.updateVisibleObjects(), this.sortRows())
        }, a.prototype.updateVisibleObjects = function () {
            this.updateVisibleRows(), this.updateVisibleTasks()
        }, a.prototype.updateVisibleRows = function () {
            var t = this.filteredRows, e = this.gantt.options.value("filterRow");
            if (e) {
                "object" == typeof e && (e = {model: e});
                var i = this.gantt.options.value("filterRowComparator");
                if ("function" == typeof i) {
                    var n = this.gantt;
                    i = function (t, e) {
                        return n.options.value("filterRowComparator")(t, e)
                    }
                }
                this.filteredRows = this.filterImpl(this.sortedRows, e, i)
            } else this.filteredRows = this.sortedRows.slice(0);
            var s = !angular.equals(t, this.filteredRows);
            this.customFilteredRows = this.applyCustomRowFilters(this.filteredRows), this.visibleRows = this.customFilteredRows, this.gantt.api.rows.raise.displayed(this.sortedRows, this.filteredRows, this.visibleRows), s && this.gantt.api.rows.raise.filter(this.sortedRows, this.filteredRows)
        }, a.prototype.removeCustomRowFilter = function (t) {
            var e = this.customRowFilters.indexOf(t);
            e > -1 && this.customRowFilters.splice(e, 1)
        }, a.prototype.addCustomRowFilter = function (t) {
            this.customRowFilters.push(t)
        }, a.prototype.applyCustomRowFilters = function (t) {
            for (var e = 0; e < this.customRowFilters.length; e++)t = this.customRowFilters[e](t);
            return t
        }, a.prototype.setFilterImpl = function (t) {
            t ? this.filterImpl = t : this.filterImpl = this._defaultFilterImpl
        }, a.prototype.updateVisibleTasks = function () {
            for (var t = [], e = [], i = [], n = [], s = 0; s < this.rows.length; s++) {
                var a = this.rows[s];
                t = t.concat(a.filteredTasks), a.updateVisibleTasks(), e = e.concat(a.filteredTasks), n = n.concat(a.visibleTasks), i = i.concat(a.tasks)
            }
            this.gantt.api.tasks.raise.displayed(i, e, n);
            var r = !angular.equals(t, e);
            r && this.gantt.api.tasks.raise.filter(i, e, n)
        }, a.prototype.updateTasksPosAndSize = function () {
            for (var t = 0, e = this.rows.length; e > t; t++)this.rows[t].updateTasksPosAndSize()
        }, a.prototype.getExpandedFrom = function (t) {
            t = t ? s(t) : t;
            for (var e = t, i = 0; i < this.rows.length; i++)(void 0 === e || e > this.rows[i].from) && (e = this.rows[i]);
            return e && (!t || t > e) ? e : t
        }, a.prototype.getExpandedTo = function (t) {
            t = t ? s(t) : t;
            for (var e = t, i = 0; i < this.rows.length; i++)(void 0 === e || e < this.rows[i].to) && (e = this.rows[i].to);
            var n = this.gantt.options.value("toDate");
            return e && (!n || e > n) ? e : t
        }, a.prototype.getDefaultFrom = function () {
            for (var t, e = 0; e < this.rows.length; e++)(void 0 === t || this.rows[e].from < t) && (t = this.rows[e].from);
            return t
        }, a.prototype.getDefaultTo = function () {
            for (var t, e = 0; e < this.rows.length; e++)(void 0 === t || this.rows[e].to > t) && (t = this.rows[e].to);
            return t
        }, a
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttTask", ["moment", function (t) {
        var e = function (t, e) {
            this.rowsManager = t.rowsManager, this.row = t, this.model = e, this.truncatedLeft = !1, this.truncatedRight = !1
        };
        return e.prototype.isMilestone = function () {
            return !this.model.to || this.model.from - this.model.to === 0
        }, e.prototype.isOutOfRange = function () {
            var t = this.rowsManager.gantt.columnsManager.getFirstColumn(), e = this.rowsManager.gantt.columnsManager.getLastColumn();
            return void 0 === t || this.model.to < t.date || void 0 === e || this.model.from > e.endDate
        }, e.prototype.updatePosAndSize = function () {
            var e = this.left, i = this.width, n = this.truncatedRight, s = this.truncatedLeft;
            !this.isMoving && this.isOutOfRange() ? (this.modelLeft = void 0, this.modelWidth = void 0) : (this.modelLeft = this.rowsManager.gantt.getPositionByDate(this.model.from), this.modelWidth = this.rowsManager.gantt.getPositionByDate(this.model.to) - this.modelLeft);
            var a = this.rowsManager.gantt.columnsManager.getLastColumn(), r = a ? a.left + a.width : 0, o = this.modelLeft, l = this.modelWidth;
            this.rowsManager.gantt.options.value("daily") && (o = this.rowsManager.gantt.getPositionByDate(t(this.model.from).startOf("day")), l = this.rowsManager.gantt.getPositionByDate(t(this.model.to).endOf("day")) - o), void 0 === o || void 0 === l || 0 > o + l || o > r ? (this.left = void 0, this.width = void 0) : (this.left = Math.min(Math.max(o, 0), this.rowsManager.gantt.width), 0 > o ? (this.truncatedLeft = !0, l + o > this.rowsManager.gantt.width ? (this.truncatedRight = !0, this.width = this.rowsManager.gantt.width) : (this.truncatedRight = !1, this.width = l + o)) : l + o > this.rowsManager.gantt.width ? (this.truncatedRight = !0, this.truncatedLeft = !1, this.width = this.rowsManager.gantt.width - o) : (this.truncatedLeft = !1, this.truncatedRight = !1, this.width = l), this.width < 0 && (this.left = this.left + this.width, this.width = -this.width)), this.updateView(), this.rowsManager.gantt.isRefreshingColumns || e === this.left && i === this.width && n === this.truncatedRight && s === this.truncatedLeft || this.rowsManager.gantt.api.tasks.raise.viewChange(this)
        }, e.prototype.updateView = function () {
            if (this.$element)if (void 0 === this.left || void 0 === this.width)this.$element.css("display", "none"); else {
                if (this.$element.css({
                        left: this.left + "px",
                        width: this.width + "px",
                        display: ""
                    }), this.model.priority > 0)for (var t = this.model.priority, e = this.$element.children(), i = 0; i < e.length; i++)angular.element(e[i]).css("z-index", t);
                this.$element.toggleClass("gantt-task-milestone", this.isMilestone())
            }
        }, e.prototype.getBackgroundElement = function () {
            if (void 0 !== this.$element) {
                var t = this.$element[0].querySelector(".gantt-task-background");
                return void 0 !== t && (t = angular.element(t)), t
            }
        }, e.prototype.getContentElement = function () {
            if (void 0 !== this.$element) {
                var t = this.$element[0].querySelector(".gantt-task-content");
                return void 0 !== t && (t = angular.element(t)), t
            }
        }, e.prototype.getForegroundElement = function () {
            if (void 0 !== this.$element) {
                var t = this.$element[0].querySelector(".gantt-task-foreground");
                return void 0 !== t && (t = angular.element(t)), t
            }
        }, e.prototype.setFrom = function (t, e) {
            this.model.from = this.rowsManager.gantt.getDateByPosition(t, e), this.row.setFromTo(), this.updatePosAndSize()
        }, e.prototype.setTo = function (t, e) {
            this.model.to = this.rowsManager.gantt.getDateByPosition(t, e), this.row.setFromTo(), this.updatePosAndSize()
        }, e.prototype.moveTo = function (t, e) {
            var i, n;
            t > this.modelLeft ? (this.model.to = this.rowsManager.gantt.getDateByPosition(t + this.modelWidth, e), i = this.rowsManager.gantt.getPositionByDate(this.model.to), n = i - this.modelWidth, this.model.from = this.rowsManager.gantt.getDateByPosition(n, !1)) : (this.model.from = this.rowsManager.gantt.getDateByPosition(t, e), n = this.rowsManager.gantt.getPositionByDate(this.model.from), i = n + this.modelWidth, this.model.to = this.rowsManager.gantt.getDateByPosition(i, !1)), this.row.setFromTo(), this.updatePosAndSize()
        }, e.prototype.clone = function () {
            return new e(this.row, angular.copy(this.model))
        }, e
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttBody", ["GanttBodyColumns", "GanttBodyRows", "GanttBodyBackground", "GanttBodyForeground", function (t, e, i, n) {
        var s = function (s) {
            this.gantt = s, this.background = new i(this), this.foreground = new n(this), this.columns = new t(this), this.rows = new e(this)
        };
        return s
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttBodyBackground", [function () {
        var t = function (t) {
            this.body = t
        };
        return t
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttBodyColumns", [function () {
        var t = function (t) {
            this.body = t
        };
        return t
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttBodyForeground", [function () {
        var t = function (t) {
            this.body = t
        };
        return t
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttBodyRows", [function () {
        var t = function (t) {
            this.body = t
        };
        return t
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttHeader", ["GanttHeaderColumns", function (t) {
        var e = function (e) {
            this.gantt = e, this.columns = new t(this), this.getHeight = function () {
                return this.$element[0].offsetHeight
            }
        };
        return e
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttHeaderColumns", [function () {
        var t = function (t) {
            this.$element = t
        };
        return t
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttScroll", [function () {
        var t = function (e) {
            this.gantt = e, this.gantt.api.registerEvent("scroll", "scroll"), this.gantt.api.registerMethod("scroll", "to", t.prototype.scrollTo, this), this.gantt.api.registerMethod("scroll", "toDate", t.prototype.scrollToDate, this), this.gantt.api.registerMethod("scroll", "left", t.prototype.scrollToLeft, this), this.gantt.api.registerMethod("scroll", "right", t.prototype.scrollToRight, this), this.gantt.api.registerMethod("scroll", "setWidth", t.prototype.setWidth, this)
        };
        return t.prototype.getScrollLeft = function () {
            return void 0 === this.$element ? void 0 : (void 0 === this.cachedScrollLeft && (this.cachedScrollLeft = this.$element[0].scrollLeft), this.cachedScrollLeft)
        }, t.prototype.getScrollWidth = function () {
            return void 0 === this.$element ? void 0 : this.$element[0].scrollWidth
        }, t.prototype.getWidth = function () {
            return void 0 === this.$element ? void 0 : this.$element[0].offsetWidth
        }, t.prototype.setWidth = function (t) {
            this.$element[0] && (this.$element[0].offsetWidth = t)
        }, t.prototype.getBordersWidth = function () {
            if (void 0 === this.$element)return void 0;
            if (this.$element[0].clientWidth)return this.$element[0].offsetWidth - this.$element[0].clientWidth;
            var t = window.getComputedStyle(this.$element[0]).getPropertyValue("border-left-width") ? window.getComputedStyle(this.$element[0]).getPropertyValue("border-left-width").match(/\d+/)[0] : 0, e = window.getComputedStyle(this.$element[0]).getPropertyValue("border-right-width") ? window.getComputedStyle(this.$element[0]).getPropertyValue("border-right-width").match(/\d+/)[0] : 0;
            return parseInt(t) + parseInt(e)
        }, t.prototype.getBordersHeight = function () {
            return void 0 === this.$element ? void 0 : this.$element[0].offsetHeight - this.$element[0].clientHeight
        }, t.prototype.isVScrollbarVisible = function () {
            return void 0 !== this.$element ? this.$element[0].scrollHeight > this.$element[0].offsetHeight : void 0
        }, t.prototype.isHScrollbarVisible = function () {
            return void 0 !== this.$element ? this.$element[0].scrollWidth > this.$element[0].offsetWidth : void 0
        }, t.prototype.scrollTo = function (t) {
            this.$element[0].scrollLeft = t, this.$element.triggerHandler("scroll")
        }, t.prototype.scrollToLeft = function (t) {
            this.$element[0].scrollLeft -= t, this.$element.triggerHandler("scroll")
        }, t.prototype.scrollToRight = function (t) {
            this.$element[0].scrollLeft += t, this.$element.triggerHandler("scroll")
        }, t.prototype.scrollToDate = function (t) {
            var e = this.gantt.getPositionByDate(t);
            void 0 !== e && (this.$element[0].scrollLeft = e - this.$element[0].offsetWidth / 2)
        }, t
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttSide", [function () {
        var t = function (t) {
            this.gantt = t
        };
        return t.prototype.getWidth = function () {
            if (this.gantt.options.value("showSide")) {
                var t = this.gantt.options.value("sideWidth");
                if (void 0 === t && void 0 !== this.$element && void 0 !== this.$element.css("width") && this.$element.css("width", ""), void 0 !== this.$element && (t = this.$element[0].offsetWidth), void 0 !== t)return t
            }
            return 0
        }, t.prototype.show = function (t) {
            void 0 !== this.$element && this.$element.toggleClass("ng-hide", !t)
        }, t.prototype.isShown = function () {
            return void 0 !== this.$element ? !this.$element.hasClass("ng-hide") : void 0
        }, t
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttTimespan", [function () {
        var t = function (t, e) {
            this.gantt = t, this.model = e
        };
        return t.prototype.updatePosAndSize = function () {
            this.modelLeft = this.gantt.getPositionByDate(this.model.from), this.modelWidth = this.gantt.getPositionByDate(this.model.to) - this.modelLeft;
            var t = this.gantt.columnsManager.getLastColumn(), e = t ? t.left + t.width : 0;
            this.modelLeft + this.modelWidth < 0 || this.modelLeft > e ? (this.left = void 0, this.width = void 0) : (this.left = Math.min(Math.max(this.modelLeft, 0), this.gantt.width), this.modelLeft < 0 ? (this.truncatedLeft = !0, this.modelWidth + this.modelLeft > this.gantt.width ? (this.truncatedRight = !0, this.width = this.gantt.width) : (this.truncatedRight = !1, this.width = this.modelWidth + this.modelLeft)) : this.modelWidth + this.modelLeft > this.gantt.width ? (this.truncatedRight = !0, this.truncatedLeft = !1, this.width = this.gantt.width - this.modelLeft) : (this.truncatedLeft = !1, this.truncatedRight = !1, this.width = this.modelWidth), this.width < 0 && (this.left = this.left + this.width, this.width = -this.width)), this.updateView()
        }, t.prototype.updateView = function () {
            this.$element && (void 0 === this.left || void 0 === this.width ? this.$element.css("display", "none") : (this.$element.css("display", ""), this.$element.css("left", this.left + "px"), this.$element.css("width", this.width + "px")))
        }, t.prototype.setFrom = function (t) {
            this.from = this.gantt.getDateByPosition(t), this.updatePosAndSize()
        }, t.prototype.setTo = function (t) {
            this.to = this.gantt.getDateByPosition(t), this.updatePosAndSize()
        }, t.prototype.moveTo = function (t) {
            this.from = this.gantt.getDateByPosition(t), this.to = this.gantt.getDateByPosition(t + this.width), this.updatePosAndSize()
        }, t.prototype.clone = function () {
            return new t(this.gantt, angular.copy(this.model))
        }, t
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttTimespansManager", ["GanttTimespan", function (t) {
        var e = function (t) {
            var e = this;
            this.gantt = t, this.timespansMap = {}, this.timespans = [], this.gantt.$scope.$watchCollection("timespans", function (t) {
                e.clearTimespans(), e.loadTimespans(t)
            }), this.gantt.api.registerMethod("timespans", "load", this.loadTimespans, this), this.gantt.api.registerMethod("timespans", "remove", this.removeTimespans, this), this.gantt.api.registerMethod("timespans", "clear", this.clearTimespans, this), this.gantt.api.registerEvent("timespans", "add"), this.gantt.api.registerEvent("timespans", "remove"), this.gantt.api.registerEvent("timespans", "change")
        };
        return e.prototype.loadTimespans = function (t) {
            angular.isArray(t) || (t = void 0 !== t ? [t] : []), this.gantt.$scope.timespans = t;
            for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                this.gantt.objectModel.cleanTimespan(n), this.loadTimespan(n)
            }
        }, e.prototype.loadTimespan = function (e) {
            var i, n = !1;
            return e.id in this.timespansMap ? (i = this.timespansMap[e.id], i.model = e, n = !0, this.gantt.api.timespans.raise.change(i)) : (i = new t(this.gantt, e), this.timespansMap[e.id] = i, this.timespans.push(i), this.gantt.api.timespans.raise.add(i)), i.updatePosAndSize(), n
        }, e.prototype.removeTimespans = function (t) {
            angular.isArray(t) || (t = [t]);
            for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                this.removeTimespan(n.id)
            }
            this.updateVisibleObjects()
        }, e.prototype.removeTimespan = function (t) {
            if (t in this.timespansMap) {
                delete this.timespansMap[t];
                for (var e, i, n = this.timespans.length - 1; n >= 0; n--)if (i = this.timespans[n], i.model.id === t) {
                    e = i, this.timespans.splice(n, 1);
                    break
                }
                return this.gantt.api.timespans.raise.remove(e), e
            }
            return void 0
        }, e.prototype.clearTimespans = function () {
            this.timespansMap = {}, this.timespans = []
        }, e.prototype.updateTimespansPosAndSize = function () {
            for (var t = 0, e = this.timespans.length; e > t; t++)this.timespans[t].updatePosAndSize()
        }, e
    }])
}(), function () {
    "use strict";
    angular.module("gantt").service("ganttArrays", [function () {
        return {
            moveToIndex: function (t, e, i) {
                if (i >= t.length)for (var n = i - t.length; n-- + 1;)t.push(void 0);
                return t.splice(i, 0, t.splice(e, 1)[0]), t
            }, getRemovedIds: function (t, e, i) {
                void 0 === i && (i = "id");
                var n, s, a = [];
                if (void 0 !== e)for (n = 0, s = e.length; s > n; n++)a.push(e[n][i]);
                if (void 0 !== t)for (n = 0, s = t.length; s > n; n++) {
                    var r = t[n];
                    if (void 0 !== r[i]) {
                        var o = a.indexOf(r[i]);
                        o > -1 && a.splice(o, 1)
                    }
                }
                return a
            }, indexOfId: function (t, e, i) {
                var n;
                if (void 0 === i)i = "id"; else if (i instanceof Array) {
                    for (n = t.length - 1; n >= 0; n--) {
                        for (var s = t[n], a = 0, r = i.length; r > a; a++)s = s[i[a]];
                        if (s === e)return n
                    }
                    return -1
                }
                for (n = t.length - 1; n >= 0; n--)if (t[n][i] === e)return n;
                return -1
            }, removeId: function (t, e, i) {
                var n = this.indexOfId(t, e, i);
                return n > -1 ? t.splice(n, 1)[0] : void 0
            }, remove: function (t, e) {
                var i = t.indexOf(e);
                return i > -1 ? (t.splice(i, 1), !0) : !1
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").service("ganttBinarySearch", [function () {
        return {
            getIndicesOnly: function (t, e, i, n) {
                for (var s = -1, a = t.length; a - s > 1;) {
                    var r = Math.floor((s + a) / 2);
                    (n ? i(t[r]) < e : i(t[r]) <= e) ? s = r : a = r
                }
                return n || void 0 === t[s] || i(t[s]) !== e || (a = s), [s, a]
            }, get: function (t, e, i, n) {
                var s = this.getIndicesOnly(t, e, i, n);
                return [t[s[0]], t[s[1]]]
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("GanttHierarchy", [function () {
        var t = function () {
            var t = this, e = {}, i = {}, n = {}, s = {}, a = {}, r = {}, o = function (t, e) {
                if (void 0 !== e) {
                    var i = n[t.model.name];
                    void 0 === i && (i = [], n[t.model.name] = i), i.push(e);
                    var o = s[t.model.id];
                    void 0 === o && (o = [], s[t.model.id] = o), o.push(e), a[e.model.name] = t, r[e.model.id] = t
                }
            };
            this.refresh = function (l) {
                e = {}, i = {}, n = {}, s = {}, a = {}, r = {};
                for (var d, h = 0; h < l.length; h++)d = l[h], e[d.model.name] = d, i[d.model.id] = d;
                for (h = 0; h < l.length; h++) {
                    if (d = l[h], void 0 !== d.model.parent) {
                        var u = e[d.model.parent];
                        void 0 === u && (u = i[d.model.parent]), void 0 !== u && o(u, d)
                    }
                    if (void 0 !== d.model.children)for (var c = d.model.children, g = 0; g < c.length; g++) {
                        var m = c[g], p = e[m];
                        void 0 === p && (p = i[m]), void 0 !== p && o(d, p)
                    }
                }
                var f = [];
                for (h = 0; h < l.length; h++)d = l[h], void 0 === t.parent(d) && f.push(d);
                return f
            }, this.children = function (t) {
                var e = s[t.model.id];
                return e
            }, this.descendants = function (e) {
                var i = [], n = t.children(e);
                if (i.push.apply(i, n), void 0 !== n)for (var s = 0; s < n.length; s++) {
                    var a = t.descendants(n[s]);
                    i.push.apply(i, a)
                }
                return i
            }, this.parent = function (t) {
                var e = r[t.model.id];
                return e
            }, this.ancestors = function (e) {
                for (var i = [], n = t.parent(e); void 0 !== n;)i.push(n), n = t.parent(n);
                return i
            }
        };
        return t
    }])
}(), function () {
    "use strict";
    angular.module("gantt").service("ganttUtils", [function () {
        return {
            createBoundedWrapper: function (t, e) {
                return function () {
                    return e.apply(t, arguments)
                }
            }, firstProperty: function (t, e, i) {
                for (var n = 0, s = t.length; s > n; n++) {
                    var a = t[n];
                    if (void 0 !== a && e in a && void 0 !== a[e])return a[e]
                }
                return i
            }, angularIndexOf: function (t, e) {
                for (var i = 0; i < t.length; i++)if (angular.equals(t[i], e))return i;
                return -1
            }, random4: function () {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }, randomUuid: function () {
                return this.random4() + this.random4() + "-" + this.random4() + "-" + this.random4() + "-" + this.random4() + "-" + this.random4() + this.random4() + this.random4()
            }, newId: function () {
                var t = (new Date).getTime();
                return function () {
                    return t += 1
                }
            }()
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").filter("ganttColumnLimit", ["ganttBinarySearch", function (t) {
        var e = function (t) {
            return t.left
        };
        return function (i, n) {
            var s = n.scroll.getScrollLeft(), a = n.getWidth() - n.side.getWidth();
            if (a > 0) {
                var r = t.getIndicesOnly(i, s, e)[0], o = t.getIndicesOnly(i, s + a, e)[1];
                return i.slice(r, o)
            }
            return i.slice()
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").filter("ganttTaskLimit", [function () {
        return function (t, e) {
            var i = e.columnsManager.getFirstColumn(), n = e.columnsManager.getLastColumn();
            if (void 0 !== i && void 0 !== n) {
                for (var s = i.date, a = n.endDate, r = [], o = e.scroll.getScrollLeft(), l = e.getWidth() - e.side.getWidth(), d = 0, h = t.length; h > d; d++) {
                    var u = t[d];
                    u.active ? r.push(u) : u.model.to >= s && u.model.from <= a && (void 0 === u.left && u.updatePosAndSize(), (!l || u.left >= o && u.left <= o + l || u.left + u.width >= o && u.left + u.width <= o + l || u.left < o && u.left + u.width > o + l) && r.push(u))
                }
                return r
            }
            return t.splice()
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttResizer", ["$document", "$parse", "$timeout", "ganttMouseOffset", function (t, e, i, n) {
        return {
            restrict: "A",
            require: "^gantt",
            scope: {targetElement: "=ganttResizer", enabled: "@?ganttResizerEnabled"},
            link: function (s, a, r, o) {
                function l() {
                    return o.gantt.options.value(r.resizerWidth)
                }

                function d(t) {
                    t !== l() && (o.gantt.options.set(r.resizerWidth, t), void 0 !== p && m[p].raise.resize(t), i(function () {
                        o.gantt.columnsManager.updateColumnsMeta()
                    }))
                }

                function h(t) {
                    t.preventDefault(), d(void 0)
                }

                function u(t) {
                    s.$evalAsync(function () {
                        var e = n.getOffsetForElement(s.targetElement[0], t), i = o.gantt.getWidth() - o.gantt.scroll.getBordersWidth(), a = Math.min(Math.max(e.x, 0), i);
                        d(a)
                    })
                }

                function c() {
                    void 0 !== p && m[p].raise.resizeEnd(l()), t.unbind("mousemove", u), t.unbind("mouseup", c)
                }

                function g(e) {
                    e.preventDefault(), void 0 !== p && m[p].raise.resizeBegin(l()), t.on("mousemove", u), t.on("mouseup", c)
                }

                var m = o.gantt.api, p = r.ganttResizerEventTopic;
                void 0 === s.enabled && (s.enabled = !0), r.$observe("ganttResizerEnabled", function (t) {
                    s.enabled = e(t)()
                }), s.$watch("enabled", function (t) {
                    void 0 === t && (t = !0), a.toggleClass("gantt-resizer-enabled", t), t ? (a.on("dblclick", h), a.on("mousedown", g)) : (a.off("dblclick", h), a.off("mousedown", g))
                }), s.$watch(function () {
                    return l()
                }, function (t, e) {
                    t !== e && (s.targetElement.css("width", t + "px"), s.targetElement[0].offsetWidth > 0 && d(s.targetElement[0].offsetWidth))
                }), p && (m.registerEvent(p, "resize"), m.registerEvent(p, "resizeBegin"), m.registerEvent(p, "resizeEnd"), m.registerMethod(p, "setWidth", d, this), m.registerMethod(p, "getWidth", l, this))
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttHorizontalScrollReceiver", function () {
        return {
            restrict: "A", require: "^ganttScrollManager", link: function (t, e, i, n) {
                n.registerHorizontalReceiver(e)
            }
        }
    })
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttScrollManager", function () {
        return {
            restrict: "A", scope: {}, controller: ["$scope", function (t) {
                t.horizontal = [], t.vertical = [], this.registerVerticalReceiver = function (e) {
                    e.css("position", "relative"), t.vertical.push(e[0])
                }, this.registerHorizontalReceiver = function (e) {
                    e.css("position", "relative"), t.horizontal.push(e[0])
                }, this.getHorizontalRecievers = function () {
                    return t.horizontal
                }, this.getVerticalRecievers = function () {
                    return t.vertical
                }
            }]
        }
    })
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttScrollSender", [function () {
        return {
            restrict: "A", require: ["^gantt", "^ganttScrollManager"], link: function (t, e, i, n) {
                var s = e[0], a = function () {
                    var t, e, i = n[1].getVerticalRecievers();
                    for (t = 0, e = i.length; e > t; t++) {
                        var a = i[t];
                        a.parentNode.scrollTop !== s.scrollTop && (a.parentNode.scrollTop = s.scrollTop)
                    }
                    var r = n[1].getHorizontalRecievers();
                    for (t = 0, e = r.length; e > t; t++) {
                        var o = r[t];
                        o.parentNode.scrollLeft !== s.scrollLeft && (o.parentNode.scrollLeft = s.scrollLeft)
                    }
                };
                e.bind("scroll", a), t.$watch(function () {
                    return n[0].gantt.width
                }, function (t, e) {
                    if (t !== e)for (var i = n[1].getHorizontalRecievers(), s = 0, a = i.length; a > s; s++) {
                        var r = i[s];
                        r.style.width = t + "px"
                    }
                })
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttScrollable", ["GanttDirectiveBuilder", "$timeout", "ganttDebounce", "moment", function (t, e, i, n) {
        var s = new t("ganttScrollable");
        return s.controller = function (t, s) {
            t.gantt.scroll.$element = s;
            var a, r, o = function (e, i, s) {
                var a = t.gantt.options.value("autoExpand");
                if ("both" === a || a === !0 || a === s) {
                    var r, o, l = t.gantt.options.value("viewScale");
                    l = l.trim(), "s" === l.charAt(l.length - 1) && (l = l.substring(0, l.length - 1));
                    var d, h, u;
                    l && (u = l.split(" ")), u && u.length > 1 ? (d = parseFloat(u[0]), h = u[u.length - 1]) : (d = 1, h = l), "left" === s ? (r = n(i).add(-5 * d, h), t.fromDate = r) : (o = n(i).add(5 * d, h), t.toDate = o), t.gantt.api.scroll.raise.scroll(e.scrollLeft, i, s)
                }
            };
            s.bind("scroll", i(function () {
                var i, n, l = s[0], d = l.scrollLeft;
                t.gantt.scroll.cachedScrollLeft = d, t.gantt.columnsManager.updateVisibleColumns(), t.gantt.rowsManager.updateVisibleObjects(), a > d && 0 === d ? (i = "left", n = t.gantt.columnsManager.from) : d > a && l.offsetWidth + d >= l.scrollWidth - 1 && (i = "right", n = t.gantt.columnsManager.to), a = d, void 0 !== n ? (r && e.cancel(r), r = e(function () {
                    o(l, n, i)
                }, 300)) : t.gantt.api.scroll.raise.scroll(d)
            }, 5)), t.getScrollableCss = function () {
                var e = {}, i = t.gantt.options.value("maxHeight");
                i > 0 && (e["max-height"] = i - t.gantt.header.getHeight() + "px", e["overflow-y"] = "auto", t.gantt.scroll.isVScrollbarVisible() && (e["border-right"] = "none"));
                var n = this.gantt.options.value("columnWidth"), s = 0 === t.gantt.width ? !1 : t.gantt.width < t.gantt.getWidth() - t.gantt.side.getWidth();
                return void 0 !== n && s && (e.width = t.gantt.width + this.gantt.scroll.getBordersWidth() + "px"), e
            }
        }, s.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttVerticalScrollReceiver", function () {
        return {
            restrict: "A", require: "^ganttScrollManager", link: function (t, e, i, n) {
                n.registerVerticalReceiver(e)
            }
        }
    })
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttElementHeightListener", [function () {
        return {
            restrict: "A", controller: ["$scope", "$element", "$attrs", function (t, e, i) {
                var n = i.ganttElementHeightListener;
                "" === n && (n = "ganttElementHeight");
                for (var s = t; 0 === n.indexOf("$parent.");)n = n.substring("$parent.".length), s = s.$parent;
                s.$watch(function () {
                    return e[0].offsetHeight
                }, function (t) {
                    t > 0 && (s[n] = t)
                })
            }]
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttElementWidthListener", [function () {
        return {
            restrict: "A", controller: ["$scope", "$element", "$attrs", function (t, e, i) {
                var n = i.ganttElementWidthListener;
                "" === n && (n = "ganttElementWidth");
                for (var s = t; 0 === n.indexOf("$parent.");)n = n.substring("$parent.".length), s = s.$parent;
                s.$watch(function () {
                    return e[0].offsetWidth
                }, function (t) {
                    t > 0 && (s[n] = t)
                })
            }]
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttBody", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttBody");
        return e.controller = function (t, e) {
            t.gantt.body.$element = e, t.gantt.body.$scope = t
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttBodyBackground", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttBodyBackground");
        return e.controller = function (t, e) {
            t.gantt.body.background.$element = e, t.gantt.body.background.$scope = t
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttBodyColumns", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttBodyColumns");
        return e.controller = function (t, e) {
            t.gantt.body.columns.$element = e, t.gantt.body.background.$scope = t
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttBodyForeground", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttBodyForeground");
        return e.controller = function (t, e) {
            t.gantt.body.foreground.$element = e, t.gantt.body.foreground.$scope = t
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttBodyRows", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttBodyRows");
        return e.controller = function (t, e) {
            t.gantt.body.rows.$element = e, t.gantt.body.rows.$scope = t
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttColumn", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttColumn");
        return e.controller = function (t, e) {
            t.column.$element = e, t.column.$scope = t, t.column.updateView()
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttColumnHeader", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttColumnHeader");
        return e.controller = function (t, e) {
            t.column.$element = e, t.column.$scope = t, t.column.updateView()
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttHeader", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttHeader");
        return e.controller = function (t, e) {
            t.gantt.header.$element = e, t.gantt.header.$scope = t
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttHeaderColumns", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttHeaderColumns");
        return e.controller = function (t, e) {
            t.gantt.header.columns.$element = e, t.gantt.header.columns.$scope = t
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttRow", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttRow");
        return e.controller = function (t, e) {
            t.row.$element = e, t.row.$scope = t
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttRowBackground", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttRowBackground");
        return e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttRowLabel", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttRowLabel");
        return e.restrict = "A", e.templateUrl = void 0, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttScrollableHeader", ["GanttDirectiveBuilder", "ganttLayout", function (t, e) {
        var i = new t("ganttScrollableHeader");
        return i.controller = function (t) {
            var i = e.getScrollBarWidth();
            t.getScrollableHeaderCss = function () {
                var e = {}, n = t.gantt.scroll.isVScrollbarVisible(), s = n ? i : 0, a = this.gantt.options.value("columnWidth"), r = 0 === t.gantt.width ? !1 : t.gantt.width < t.gantt.getWidth() - t.gantt.side.getWidth();
                return void 0 !== a && r ? e.width = t.gantt.width - s + this.gantt.scroll.getBordersWidth() + "px" : n && (e.width = t.gantt.getWidth() - t.gantt.side.getWidth() - s + "px"), e
            }
        }, i.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttSide", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttSide");
        return e.controller = function (t, e) {
            t.gantt.side.$element = e, t.gantt.side.$scope = t
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttSideBackground", ["GanttDirectiveBuilder", "ganttLayout", function (t, e) {
        var i = new t("ganttSideBackground");
        return i.controller = function (t) {
            var i = e.getScrollBarHeight();
            t.getMaxHeightCss = function () {
                var e = {};
                if (t.maxHeight) {
                    var n = t.gantt.scroll.isHScrollbarVisible() ? i : 0;
                    e["max-height"] = t.maxHeight - n - t.gantt.header.getHeight() + "px"
                }
                return e
            }
        }, i.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttSideContent", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttSideContent");
        return e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttTask", ["GanttDirectiveBuilder", "moment", function (t, e) {
        var i = new t("ganttTask");
        return i.controller = function (t, i) {
            t.task.$element = i, t.task.$scope = t, t.getTaskContent = function () {
                return void 0 !== t.task.model.content ? t.task.model.content : t.task.rowsManager.gantt.options.value("taskContent")
            }, t.simplifyMoment = function (t) {
                return e.isMoment(t) ? t.unix() : t
            }, t.$watchGroup(["simplifyMoment(task.model.from)", "simplifyMoment(task.model.to)"], function () {
                t.task.updatePosAndSize()
            })
        }, i.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttTaskBackground", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttTaskBackground");
        return e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttTaskContent", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttTaskContent");
        return e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttTaskForeground", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttTaskForeground");
        return e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttTimeFrame", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttTimeFrame");
        return e.controller = function (t, e) {
            t.timeFrame.$element = e, t.timeFrame.$scope = t, t.timeFrame.updateView()
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttTimespan", ["GanttDirectiveBuilder", function (t) {
        var e = new t("ganttTimespan");
        return e.controller = function (t, e) {
            t.timespan.$element = e, t.timespan.$scope = t, t.timespan.updateView()
        }, e.build()
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("ganttDebounce", ["$timeout", function (t) {
        function e(e, i, n) {
            var s = 0;
            return function () {
                var a = this, r = arguments;
                s++;
                var o = function (t) {
                    return function () {
                        return t === s ? e.apply(a, r) : void 0
                    }
                }(s);
                return t(o, i, void 0 === n ? !0 : n)
            }
        }

        return e
    }])
}(), function () {
    "use strict";
    angular.module("gantt").service("GanttDirectiveBuilder", ["$templateCache", function (t) {
        var e = function (e, i, n, s) {
            var a = this;
            this.directiveName = e, this.templateUrl = void 0 === i ? "template/" + e + ".tmpl.html" : i, this.require = void 0 === n ? "^gantt" : n, this.restrict = void 0 === s ? "E" : s, this.scope = !1, this.transclude = !0, this.replace = !0, this.build = function () {
                var e = a.directiveName, i = a.templateUrl, n = a.controller, s = {
                    restrict: a.restrict,
                    require: a.require,
                    transclude: a.transclude,
                    replace: a.replace,
                    scope: a.scope,
                    templateUrl: function (e, n) {
                        return void 0 !== n.templateUrl && (i = n.templateUrl), void 0 !== n.template && t.put(i, n.template), i
                    },
                    compile: function () {
                        return {
                            pre: function (t, i, n, s) {
                                t.gantt.api.directives.raise.preLink(e, t, i, n, s)
                            }, post: function (t, i, n, s) {
                                t.gantt.api.directives.raise.postLink(e, t, i, n, s)
                            }
                        }
                    },
                    controller: ["$scope", "$element", "$attrs", function (t, i, s) {
                        var a = this;
                        void 0 !== n && n(t, i, s, a), t.gantt.api.directives.raise.controller(e, t, i, s, a), t.$on("$destroy", function () {
                            t.gantt.api.directives.raise.destroy(e, t, i, s, a)
                        }), t.$applyAsync(function () {
                            t.gantt.api.directives.raise["new"](e, t, i, s, a)
                        })
                    }]
                };
                return i || (delete s.templateUrl, delete s.replace, delete s.transclude), s
            }
        };
        return e
    }])
}(), function () {
    "use strict";
    angular.module("gantt").service("ganttDom", ["$document", function (t) {
        return {
            elementFromPoint: function (e, i) {
                return t[0].elementFromPoint(e, i)
            }, elementsFromPoint: function (t, e, i) {
                for (var n, s, a, r, o = [], l = [], d = 0; (n = this.elementFromPoint(t, e)) && -1 === o.indexOf(n) && null !== n && (void 0 === i || i > d);)o.push(n), l.push({
                    value: n.style.getPropertyValue("visibility"),
                    priority: n.style.getPropertyPriority("visibility")
                }), n.style.setProperty("visibility", "hidden", "important"), d++;
                for (s = 0, a = l.length; a > s; s++)r = l[s], o[s].style.setProperty("visibility", r.value ? r.value : "", r.priority);
                return o
            }, findElementFromPoint: function (t, e, i) {
                for (var n, s, a, r, o, l = [], d = [], h = 0; (n = this.elementFromPoint(t, e)) && -1 === l.indexOf(n) && null !== n;)if (l.push(n), d.push({
                        value: n.style.getPropertyValue("visibility"),
                        priority: n.style.getPropertyPriority("visibility")
                    }), n.style.setProperty("visibility", "hidden", "important"), h++, i(n)) {
                    s = n;
                    break
                }
                for (a = 0, r = d.length; r > a; a++)o = d[a], l[a].style.setProperty("visibility", o.value ? o.value : "", o.priority);
                return s
            }, isElementVisible: function (t) {
                return void 0 !== t.offsetParent && null !== t.offsetParent
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").service("ganttEnableNgAnimate", ["$injector", function (t) {
        var e;
        try {
            e = t.get("$animate")
        } catch (i) {
        }
        return void 0 !== e ? function (t, i) {
            angular.version.major >= 1 && angular.version.minor >= 4 ? e.enabled(t, i) : e.enabled(i, t)
        } : angular.noop
    }])
}(), function () {
    "use strict";
    angular.module("gantt").directive("ganttBindCompileHtml", ["$compile", function (t) {
        return {
            restrict: "A", require: "^gantt", link: function (e, i, n, s) {
                e.scope = s.gantt.$scope.$parent, e.$watch(function () {
                    return e.$eval(n.ganttBindCompileHtml)
                }, function (n) {
                    i.html(n), t(i.contents())(e)
                })
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").service("ganttLayout", ["$document", function (t) {
        return {
            getScrollBarWidth: function () {
                var e = t[0].createElement("p");
                e.style.width = "100%", e.style.height = "200px";
                var i = t[0].createElement("div");
                i.style.position = "absolute", i.style.top = "0px", i.style.left = "0px", i.style.visibility = "hidden", i.style.width = "200px", i.style.height = "150px", i.style.overflow = "hidden", i.appendChild(e), t[0].body.appendChild(i);
                var n = e.offsetWidth;
                i.style.overflow = "scroll";
                var s = e.offsetWidth;
                return n === s && (s = i.clientWidth), t[0].body.removeChild(i), n - s
            }, getScrollBarHeight: function () {
                var e = t[0].createElement("p");
                e.style.width = "200px;", e.style.height = "100%";
                var i = t[0].createElement("div");
                i.style.position = "absolute", i.style.top = "0px", i.style.left = "0px", i.style.visibility = "hidden", i.style.width = "150px", i.style.height = "200px", i.style.overflow = "hidden", i.appendChild(e), t[0].body.appendChild(i);
                var n = e.offsetHeight;
                i.style.overflow = "scroll";
                var s = e.offsetHeight;
                return n === s && (s = i.clientHeight), t[0].body.removeChild(i), n - s
            }, setColumnsWidthFactor: function (t, e, i) {
                if (t) {
                    i || (i = 0);
                    for (var n = 0; n < t.length; n++) {
                        var s = t[n];
                        s.left = e * (s.originalSize.left + i) - i, s.width = e * s.originalSize.width;
                        for (var a = 0; a < s.timeFrames.length; a++) {
                            var r = s.timeFrames[a];
                            r.left = e * r.originalSize.left, r.width = e * r.originalSize.width
                        }
                    }
                }
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").service("ganttMouseButton", [function () {
        return {
            getButton: function (t) {
                return t = t || window.event, t.which ? t.which : void 0 === t.button ? 1 : t.button < 2 ? 1 : 4 === t.button ? 2 : 3
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").service("ganttMouseOffset", [function () {
        return {
            getTouch: function (t) {
                return void 0 !== t.touches ? t.touches[0] : t
            }, getOffset: function (t) {
                return t.offsetX && t.offsetY ? {x: t.offsetX, y: t.offsetY} : t.layerX && t.layerY ? {
                    x: t.layerX,
                    y: t.layerY
                } : this.getOffsetForElement(t.target, t)
            }, getOffsetForElement: function (t, e) {
                var i = t.getBoundingClientRect();
                return {x: e.clientX - i.left, y: e.clientY - i.top}
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("gantt").factory("ganttSmartEvent", [function () {
        function t(t, e, i, n) {
            return t.$on("$destroy", function () {
                e.unbind(i, n)
            }), {
                bindOnce: function () {
                    e.one(i, n)
                }, bind: function () {
                    e.bind(i, n)
                }, unbind: function () {
                    e.unbind(i, n)
                }
            }
        }

        return t
    }])
}(), angular.module("gantt.templates", []).run(["$templateCache", function (t) {
    t.put("template/gantt.tmpl.html", '<div class="gantt unselectable" ng-cloak gantt-scroll-manager gantt-element-width-listener="ganttElementWidth">\n    <gantt-side>\n        <gantt-side-background>\n        </gantt-side-background>\n        <gantt-side-content>\n        </gantt-side-content>\n        <div gantt-resizer="gantt.side.$element" gantt-resizer-event-topic="side" gantt-resizer-enabled="{{$parent.gantt.options.value(\'allowSideResizing\')}}" resizer-width="sideWidth" class="gantt-resizer">\n            <div ng-show="$parent.gantt.options.value(\'allowSideResizing\')" class="gantt-resizer-display"></div>\n        </div>\n    </gantt-side>\n    <gantt-scrollable-header>\n        <gantt-header gantt-element-height-listener="$parent.ganttHeaderHeight">\n            <gantt-header-columns>\n                <div ng-repeat="header in gantt.columnsManager.visibleHeaders track by $index">\n                    <div class="gantt-header-row" ng-class="{\'gantt-header-row-last\': $last, \'gantt-header-row-first\': $first}">\n                        <gantt-column-header ng-repeat="column in header"></gantt-column-header>\n                    </div>\n                </div>\n            </gantt-header-columns>\n        </gantt-header>\n    </gantt-scrollable-header>\n    <gantt-scrollable>\n        <gantt-body>\n            <gantt-body-background>\n                <gantt-row-background ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id"></gantt-row-background>\n            </gantt-body-background>\n            <gantt-body-foreground>\n                <div class="gantt-current-date-line" id="gantt-current-date-line" ng-show="currentDate === \'line\' && gantt.currentDateManager.position >= 0 && gantt.currentDateManager.position <= gantt.width" ng-style="{\'left\': gantt.currentDateManager.position + \'px\' }"></div>\n            </gantt-body-foreground>\n            <gantt-body-columns>\n                <gantt-column ng-repeat="column in gantt.columnsManager.visibleColumns">\n                    <gantt-time-frame ng-repeat="timeFrame in column.visibleTimeFrames"></gantt-time-frame>\n                </gantt-column>\n            </gantt-body-columns>\n            <div ng-if="gantt.columnsManager.visibleColumns == 0" style="background-color: #808080"></div>\n            <gantt-body-rows>\n                <gantt-timespan ng-repeat="timespan in gantt.timespansManager.timespans track by timespan.model.id"></gantt-timespan>\n                <gantt-row ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id">\n                    <gantt-task ng-repeat="task in row.visibleTasks track by task.model.id">\n                    </gantt-task>\n                </gantt-row>\n            </gantt-body-rows>\n        </gantt-body>\n    </gantt-scrollable>\n\n    <!-- Plugins -->\n    <ng-transclude></ng-transclude>\n\n    <!--\n    ******* Inline templates *******\n    You can specify your own templates by either changing the default ones below or by\n    adding an attribute template-url="<url to your template>" on the specific element.\n    -->\n\n    <!-- Body template -->\n    <script type="text/ng-template" id="template/ganttBody.tmpl.html">\n        <div ng-transclude class="gantt-body" ng-style="{\'width\': gantt.width > 0 ? gantt.width +\'px\' : undefined}"></div>\n    </script>\n\n    <!-- Header template -->\n    <script type="text/ng-template" id="template/ganttHeader.tmpl.html">\n        <div ng-transclude class="gantt-header"\n             ng-show="gantt.columnsManager.columns.length > 0 && gantt.columnsManager.headers.length > 0"></div>\n    </script>\n\n    <!-- Side template -->\n    <script type="text/ng-template" id="template/ganttSide.tmpl.html">\n        <div ng-transclude class="gantt-side" style="width: auto;"></div>\n    </script>\n\n    <!-- Side content template-->\n    <script type="text/ng-template" id="template/ganttSideContent.tmpl.html">\n        <div class="gantt-side-content">\n        </div>\n    </script>\n\n    <!-- Header columns template -->\n    <script type="text/ng-template" id="template/ganttHeaderColumns.tmpl.html">\n        <div ng-transclude class="gantt-header-columns"\n              gantt-horizontal-scroll-receiver></div>\n    </script>\n\n    <script type="text/ng-template" id="template/ganttColumnHeader.tmpl.html">\n        <div class="gantt-column-header" ng-class="{\'gantt-column-header-last\': $last, \'gantt-column-header-first\': $first}">{{::column.label}}</div>\n    </script>\n\n    <!-- Body background template -->\n    <script type="text/ng-template" id="template/ganttBodyBackground.tmpl.html">\n        <div ng-transclude class="gantt-body-background"></div>\n    </script>\n\n    <!-- Body foreground template -->\n    <script type="text/ng-template" id="template/ganttBodyForeground.tmpl.html">\n        <div ng-transclude class="gantt-body-foreground"><span style="z-index: 1000">Hello</span></div>\n    </script>\n\n    <!-- Body columns template -->\n    <script type="text/ng-template" id="template/ganttBodyColumns.tmpl.html">\n        <div ng-transclude class="gantt-body-columns"></div>\n    </script>\n\n    <script type="text/ng-template" id="template/ganttColumn.tmpl.html">\n        <div ng-transclude class="gantt-column gantt-foreground-col" ng-class="{\'gantt-column-last\': $last, \'gantt-column-first\': $first}"></div>\n    </script>\n\n    <script type="text/ng-template" id="template/ganttTimeFrame.tmpl.html">\n        <div class="gantt-timeframe"></div>\n    </script>\n\n    <!-- Scrollable template -->\n    <script type="text/ng-template" id="template/ganttScrollable.tmpl.html">\n        <div id="div" ng-transclude class="gantt-scrollable" gantt-scroll-sender ng-style="getScrollableCss()"></div>\n    </script>\n\n    <script type="text/ng-template" id="template/ganttScrollableHeader.tmpl.html">\n        <div ng-transclude class="gantt-scrollable-header" ng-style="getScrollableHeaderCss()"></div>\n    </script>\n\n    <!-- Rows template -->\n    <script type="text/ng-template" id="template/ganttBodyRows.tmpl.html">\n        <div ng-transclude class="gantt-body-rows"></div>\n    </script>\n\n    <!-- Timespan template -->\n    <script type="text/ng-template" id="template/ganttTimespan.tmpl.html">\n        <div class="gantt-timespan" ng-class="timespan.model.classes">\n        </div>\n    </script>\n\n    <!-- Task template -->\n    <script type="text/ng-template" id="template/ganttTask.tmpl.html">\n        <div class="gantt-task" ng-class="task.model.classes">\n            <gantt-task-background></gantt-task-background>\n            <gantt-task-foreground></gantt-task-foreground>\n            <gantt-task-content></gantt-task-content>\n        </div>\n    </script>\n\n    <script type="text/ng-template" id="template/ganttTaskBackground.tmpl.html">\n        <div class="gantt-task-background" ng-style="{\'background-color\': task.model.color}"></div>\n    </script>\n\n    <script type="text/ng-template" id="template/ganttTaskForeground.tmpl.html">\n        <div class="gantt-task-foreground">\n            <div ng-if="task.truncatedRight" class="gantt-task-truncated-right">&gt;</div>\n            <div ng-if="task.truncatedLeft" class="gantt-task-truncated-left">&lt;</div>\n        </div>\n    </script>\n\n    <!-- Task content template -->\n    <script type="text/ng-template" id="template/ganttTaskContent.tmpl.html">\n        <div class="gantt-task-content" unselectable="on"><span unselectable="on" gantt-bind-compile-html="getTaskContent()"/></div>\n    </script>\n\n\n    <!-- Row background template -->\n    <script type="text/ng-template" id="template/ganttRowBackground.tmpl.html">\n        <div class="gantt-row gantt-row-height"\n             ng-class="row.model.classes"\n             ng-class-odd="\'gantt-row-odd\'"\n             ng-class-even="\'gantt-row-even\'"\n             ng-style="{\'height\': row.model.height}">\n            <div class="gantt-row-background"\n                 ng-style="{\'background-color\': row.model.color}">\n            </div>\n        </div>\n    </script>\n\n    <!-- Row template -->\n    <script type="text/ng-template" id="template/ganttRow.tmpl.html">\n        <div class="gantt-row gantt-row-height"\n             ng-class="row.model.classes"\n             ng-class-odd="\'gantt-row-odd\'"\n             ng-class-even="\'gantt-row-even\'"\n             ng-style="{\'height\': row.model.height}">\n            <div ng-transclude class="gantt-row-content"></div>\n        </div>\n    </script>\n\n    <!-- Side background template -->\n    <script type="text/ng-template" id="template/ganttSideBackground.tmpl.html">\n        <div class="gantt-side-background">\n            <div class="gantt-side-background-header" ng-style="{height: $parent.ganttHeaderHeight + \'px\'}">\n                <div ng-show="$parent.ganttHeaderHeight" class="gantt-header-row gantt-side-header-row"></div>\n            </div>\n            <div class="gantt-side-background-body" ng-style="getMaxHeightCss()">\n                <div gantt-vertical-scroll-receiver>\n                    <div class="gantt-row gantt-row-height "\n                         ng-class-odd="\'gantt-row-odd\'"\n                         ng-class-even="\'gantt-row-even\'"\n                         ng-class="row.model.classes"\n                         ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id"\n                         ng-style="{\'height\': row.model.height}">\n                        <div gantt-row-label class="gantt-row-label gantt-row-background"\n                             ng-style="{\'background-color\': row.model.color}">\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </script>\n</div>\n')
}]);
