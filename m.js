!(function (window, $, document) {
  const antiDebug = (function () {
    let ka = true;
    return function (hb, dd) {
      const dv = ka
        ? function () {
            if (dd) {
              const vm = dd.apply(hb, arguments);
              dd = null;
              return vm;
            }
          }
        : function () {};
      ka = false;
      return dv;
    };
  })();
  const antiDebugCall = antiDebug(this, function () {
    const sb = function () {
      let kk;
      try {
        kk = Function('return (function() {}.constructor("return this")( ));')();
      } catch (hd) {
        kk = window;
      }
      return kk;
    };
    const ob = sb();
    const oy = (ob.console = ob.console || {});
    const sw = ["log", "warn", "info", "error", "exception", "table", "trace"];
    for (let akd = 0; akd < sw.length; akd++) {
      const kw = antiDebug.constructor.prototype.bind(antiDebug);
      const c = sw[akd];
      const ko = oy[c] || kw;
      kw.__proto__ = antiDebug.bind(antiDebug);
      kw.toString = ko.toString.bind(ko);
      oy[c] = kw;
    }
  });
  antiDebugCall();
  class Storage {
    static ["init"]() {
      this.prefix = "MX-";
      this.oldPrefix = "MX-";
      this.reset();
    }
    static ["get"](afi, cz) {
      const vq = JSON.parse(localStorage.getItem(this.prefix + afi));
      return null !== vq && undefined !== vq[cz] && vq[cz];
    }
    static ["set"](fx, acj, v) {
      let fc = JSON.parse(localStorage.getItem(this.prefix + fx));
      if (null === fc) {
        fc = {};
      }
      fc[acj] = v;
      localStorage.setItem(this.prefix + fx, JSON.stringify(fc));
    }
    static ["reset"]() {
      if (!this.get("extras", "resetted")) {
        for (const key in localStorage)
          if (key.substring(0, 5) === this.oldPrefix) {
            localStorage.removeItem(key);
          }
        this.set("extras", "resetted", true);
      }
    }
  }
  class RafLoop {
    constructor(gv) {
      this.event = gv;
      this.maxFps = 30;
      this.lastFrameTime = 0;
      window.requestAnimationFrame((co) => {
        this.run(co);
      });
    }
    ["run"](go) {
      window.requestAnimationFrame((tx) => {
        this.run(tx);
      });
      this.updateRafTime(go);
      this.event();
    }
    ["updateRafTime"](z) {
      const bc = z - this.lastFrameTime;
      this.lastFrameTime = z;
      if (0.05 > Math.abs(33.333333333333336 - bc)) {
        this.maxFps = 30;
      } else if (0.05 > Math.abs(16.666666666666668 - bc)) {
        this.maxFps = 60;
      } else if (0.05 > Math.abs(13.333333333333334 - bc)) {
        this.maxFps = 75;
      } else if (0.05 > Math.abs(10 - bc)) {
        this.maxFps = 100;
      } else if (0.05 > Math.abs(8.333333333333334 - bc)) {
        this.maxFps = 120;
      } else if (0.05 > Math.abs(6.944444444444445 - bc)) {
        this.maxFps = 144;
      }
    }
    get ["rafLoopTime"]() {
      return 1000 / this.maxFps;
    }
  }
  class Language {
    static ["init"]() {
      this["default"] = "EN";
      this.supported = ["EN", "JA", "ZH", "KO", "ES"];
    }
    static ["change"]() {
      const de = $("[data]");
      for (let su = 0; su < de.length; su++) {
        this.update($(de[su]));
      }
    }
    static ["update"](lm) {
      const bu = lm.attr("data").split(".");
      let et = window["lang_" + this.selected] || window.lang_EN;
      const ads = bu[0];
      const zq = bu[1];
      const iu = bu[2];
      if (!(et[zq] && et[zq][iu])) {
        et = window["lang_" + this["default"]];
      }
      if ("html" === ads) {
        lm.html(et[zq][iu]);
      } else if ("placeholder" === ads) {
        lm.attr(ads, et[zq][iu]);
      }
    }
    static get ["selected"]() {
      return Settings.language;
    }
    static get ["current"]() {
      return window["lang_" + this.selected];
    }
    static get ["browser"]() {
      const d = window.navigator.language.toUpperCase();
      const ahs = d.indexOf("-") ? d.split("-")[0] : d;
      return 0 <= this.supported.indexOf(ahs) ? ahs : this["default"];
    }
  }
  const langMainMenu = {
    btn_settings: "Settings",
    btn_play: "Play",
    btn_spectate: "Spectate",
    btn_inputs: "Inputs",
    btn_theme: "Theme",
    input_tag1: "Tag",
    input_tag2: "Tag 2",
    input_nick: "Nick",
    input_3rbSkin: "3rb.io Skin",
    input_skinUrl: "Skin URL (imgur)",
    select_ffa: "FFA",
    select_party: "Party",
    select_teams: "Teams",
    select_experimental: "Experimental",
    input_token: "Party token",
    btn_join: "Join",
    btn_create: "Create",
  };
  const langNotifs = {
    cantPlay2Tag: "You can't play in double tag mode.",
    MXNetConn: "Connected to Networks.",
    MXNetDisconn: "Disconnected from networks.",
    invalidSkinUrl: "Invalid skin URL",
    login_lastSession: "Logged in from last session data.",
    sdk_error: "SDK not loaded",
    alreadyLoggedIn: "Already logged in.",
    login_success: "Logged in",
    login_error: "Login error!",
    logout: "Logged out",
    nickChangeInGame: "You can't change nick while in game.",
    targeting_on: "Click a cell to begin targeting it. See instructions in mouse settings menu.",
    targeting_off: "Targeting is turned off. Turn it on in settings menu in order to use it.",
    target_unnamed: "Cannot target unnamed cells.",
    MXSkin_noAcc: "Account does not exist.",
  };
  const langLB = {
    title: "Drag+",
  };
  const langHUD = {
    enterChatMsg: "Enter chat message...",
    teamlist_title: "Team Players",
    score: "Score",
    num1position: "#1 position",
    paused: "Paused",
    targeting_bigCellVp: "BIGGEST CELL VIEWPORT",
    targeting_followVp: "VIEWPORT FOLLOWING MOUSE",
    targeting_totalMass: "TOTAL MASS",
    targeting_players: "TARGETING PLAYERS",
  };
  const langSettings = {
    language: "Language",
    CellAnimation: "Animation delay",
    zoomSpeed: "Zoom speed",
    cameraSpeed: "Camera speed [2 default]",
    eatAnimation: "Cell eat [sucking] animation",
    autoZoom: "Auto zoom",
    pairCamera: "Pair camera (close/far)",
    cellTextAnimation: "Cell text animation",
    autoHideText: "Auto hide text",
    hideOwnNick: "Hide own nick",
    hideOwnMass: "Hide own mass",
    cellNick: "Cell nick",
    cellMass: "Cell mass",
    nickShadow: "Nick shadow",
    massShadow: "Mass shadow",
    urlSkins: "URL skins",
    arbSkins: "3rb.io skins",
    food: "Food",
    vanillaGrid: "Vanilla grid",
    bgSectors: "Background sectors",
    cursorLine: "Cursor lines",
    opponentRings: "Opponent rings",
    splitRings: "Split rings",
    virusRange: "Viruses range",
    teamIndicator: "Teammate indicator",
    commander: "Commander",
    chatType: "Chat type",
    targeting: "Cell Targeting [Spectate mode]",
    opt_on: "On",
    opt_off: "Off",
    opt_stepped: "Stepped",
    opt_linear: "Linear",
    opt_shortened: "Shortened",
    opt_full: "Full",
    opt_nick: "Nick",
    opt_mass: "Mass",
    opt_both: "Nick + Mass",
    opt_perf: "Performance",
    opt_normal: "Normal",
    opt_urlSkin: "Url skins",
    opt_MXSkin: "3rb.io skins",
    opt_allSkin: "All skins",
    opt_singleClr: "Mono colored",
    opt_rainbow: "Rainbow",
    opt_onlyLines: "Only lines",
    opt_snowflakes: "Snowflakes",
    opt_chatroom: "Chatroom",
    opt_popup: "Pop up chat",
  };
  const langHotkeys = {
    title: "Hotkeys",
    toggleMenuKey: "Toggle main menu",
    feedKey: "Feed",
    macroFeedKey: "Macro feed",
    splitKey: "Split",
    doubleSplitKey: "Double split",
    split16Key: "Split 64",
    stopKey: "Stop cell movement",
    chatKey: "Toggle chat",
    freeSpectateKey: "Toggle spectate mode",
    toggleSplitRings: "Toggle split rings",
    toggleOpponentRings: "Toggle opponent rings",
    toggleNick: "Toggle cell nick",
    toggleMass: "Toggle cell mass",
    toggleSkin: "Toggle skin",
    toggleCustomSkin: "Toggle Custom Skin",
    toggleFood: "Toggle food",
    respawnKey: "Quick respawn",
    multiboxTab: "Multibox switch",
    command0Key: "Command 0",
    command1Key: "Command 1",
    command2Key: "Command 2",
    command3Key: "Command 3",
    command4Key: "Command 4",
    command5Key: "Command 5",
    command6Key: "Command 6",
    command7Key: "Command 7",
    command8Key: "Command 8",
    command9Key: "Command 9",
    zoom1key: "Zoom level 1",
    zoom2key: "Zoom level 2",
    zoom3key: "Zoom level 3",
    zoom4key: "Zoom level 4",
    zoom5key: "Zoom level 5",
  };
  const langMouse = {
    title: "Mouse",
    feed: "Feed",
    macroFeed: "Macro feed",
    split: "Split",
    doubleSplit: "Double split",
    split16: "Split 64",
    commander: "Commander",
    off: "Off",
    lmb: "Left click",
    rmb: "Right click",
    scroll: "Middle click",
    targeting_h1: "Targeting",
    targeting_txt1: "Lock target 1",
    targeting_txt2: "Lock target 2",
    targeting_txt3: "Middle click or Toggle spectate key",
    targeting_txt4: "Toggle top cell mode to follow mouse mode",
    targeting_txt5: "Toggle targeting mode to follow mouse mode",
    targeting_txt6: "Toggle follow mouse mode to top cell mode",
  };
  const langCommands = {
    title: "Commands",
    command0: "Fuck!",
    command1: "Feed Me!",
    command2: "Split into me!",
    command3: "Need backup at %sector%!",
    command4: "Enemy spotted at %sector%!",
    command5: "Need a teammate!",
    command6: "Tank the virus!",
    command7: "Eat the virus!",
    command8: "Let's bait!",
    command9: "Fake tricksplit!",
  };
  const langTheme = {
    selectedPreset: "Theme preset",
    cursor: "Cursor",
    lbSize: "Leaderboard size",
    chatFontSize: "Chat font size",
    minimapSize: "Minimap size",
    skinBorder: "Skin border",
    cellTransparency: "Cell transparency",
    lightenCellColor: "Lighten cell color",
    borderColor: "Border color",
    borderWidth: "Border width",
    gridColor: "Grid color",
    gridTextColor: "Grid text color",
    gridTextSize: "Grid text size",
    gridTextFont: "Grid text font",
    gridWidth: "Grid width",
    nickColor: "Nick color",
    nickStrokeColor: "Nick stroke color",
    cellNickSize: "Nick size",
    nickFont: "Nick font",
    massColor: "Mass color",
    massStrokeColor: "Mass stroke color",
    cellMassSize: "Mass size",
    massFont: "Mass font",
    foodColor: "Food color",
    foodSize: "Food size",
    virusColor: "Virus color",
    virusBorderColor: "Virus border color",
    virusBorderWidth: "virus border width",
    virusDecor: "Virus Decoration",
    backgroundColor: "Background color",
    commanderColor: "Commander color",
    indicatorSize: "Teammate indicator size",
    team1color: "Team 1 color [Double Tag Mode]",
    team2color: "Team 2 color [Double Tag Mode]",
    on: "On",
    off: "Off",
  };
  const lang_EN = {
    mainMenu: langMainMenu,
    notif: langNotifs,
    leaderboard: langLB,
    huds: langHUD,
    settingMenu: langSettings,
    hkMenu: langHotkeys,
    mouseMenu: langMouse,
    commandsMenu: langCommands,
    themeMenu: langTheme,
  };
  window.lang_EN = lang_EN;
  class Settings {
    static ["init"]() {
      this.isOpened = false;
      this.div = $("#settings");
      this.language = Storage.get("settings", "language") || Language.browser;
      this.CellAnimation = ~~Storage.get("settings", "CellAnimation") || 160;
      const motionStyle = Storage.get("settings", "moMotionStyle");
      this.moMotionStyle = ["classic", "smooth", "cinematic"].includes(motionStyle) ? motionStyle : "cinematic";
      this.eatAnimation = Storage.get("settings", "eatAnimation") || "on";
      this.zoomSpeed = ~~Storage.get("settings", "zoomSpeed") || 92;
      this.cameraSpeed = ~~Storage.get("settings", "cameraSpeed") || 20;
      this.autoZoom = Storage.get("settings", "autoZoom") || "off";
      this.pairCamera = Storage.get("settings", "pairCamera") || "on";
      this.cellTextAnimation = Storage.get("settings", "cellTextAnimation") || "stepped";
      this.autoHideText = Storage.get("settings", "autoHideText") || "on";
      this.cellNick = Storage.get("settings", "cellNick") || "on";
      this.nickShadow = Storage.get("settings", "nickShadow") || "off";
      this.cellMass = Storage.get("settings", "cellMass") || "shortened";
      this.massShadow = Storage.get("settings", "massShadow") || "off";
      this.hideOwnNick = Storage.get("settings", "hideOwnNick") || "on";
      this.hideOwnMass = Storage.get("settings", "hideOwnMass") || "off";
      this.urlSkins = Storage.get("settings", "urlSkins") || "on";
      this.arbSkins = Storage.get("settings", "arbSkins") || "on";
      this.food = Storage.get("settings", "food") || "monoColored";
      this.bgSectors = Storage.get("settings", "bgSectors") || "image";
      const arenaStyle = Storage.get("settings", "moArenaStyle");
      this.moArenaStyle = arenaStyle === "classic" ? "classic" : "space";
      this.vanillaGrid = Storage.get("settings", "vanillaGrid") || "off";
      this.cursorLine = Storage.get("settings", "cursorLine") || "off";
      this.teamIndicator = Storage.get("settings", "teamIndicator") || "on";
      this.opponentRings = Storage.get("settings", "opponentRings") || "off";
      this.splitRings = Storage.get("settings", "splitRings") || "off";
      this.virusRange = Storage.get("settings", "virusRange") || "off";
      this.multiboxRing = Storage.get("settings", "multiboxRing") || "on";
      this.multiboxCellColor = Storage.get("settings", "multiboxCellColor") || "off";
      this.commander = Storage.get("settings", "commander") || "on";
      this.targeting = Storage.get("settings", "targeting") || "off";
      this.chatType = Storage.get("settings", "chatType") || "popup";
      this.multiboxMode = Storage.get("settings", "multiboxMode") || "on";
      this.setDomValues();
      this.addEvents();
    }
    static ["setDomValues"]() {
      $(".settings-options").each(function () {
        const cx = $(this).attr("type");
        if ("range" === cx) {
          Settings.handleRange(this, 2);
        } else if ("options" === cx) {
          Settings.handleOptions(this, 2);
        }
      });
      this.toggleChatroom();
      this.changeLanguage();
    }
    static ["addEvents"]() {
      $(".settings-container").perfectScrollbar();
      $(".settings-container .fa-chevron-left").each(function () {
        $(this).click(() => {
          const ld = $(this).parent();
          const g = $(ld).attr("type");
          if ("options" === g) {
            Settings.handleOptions(ld, 0);
          } else if ("range" === g) {
            Settings.handleRange(ld, 0);
          }
        });
      });
      $(".settings-container span.outer").each(function () {
        $(this).click((zp) => {
          const qg = $(this).parent();
          Settings.handleRange(qg, 3, zp.offsetX);
        });
      });
      $(".settings-container .fa-chevron-right").each(function () {
        $(this).click(() => {
          const jz = $(this).parent();
          const aiq = $(jz).attr("type");
          if ("options" === aiq) {
            Settings.handleOptions(jz, 1);
          } else if ("range" === aiq) {
            Settings.handleRange(jz, 1);
          }
        });
      });
      $(".settings-close").click(() => this.close());
    }
    static ["toggle"]() {
      if (this.isOpened) {
        this.close();
      } else {
        this.open();
      }
    }
    static ["close"]() {
      this.isOpened = false;
      this.div.fadeOut(250);
    }
    static ["open"]() {
      this.isOpened = true;
      this.div.fadeIn(250);
    }
    static ["handleOptions"](ge, acq) {
      const aea = $(ge).attr("name");
      const wy = $(ge).find("b");
      const wj = wy.length;
      let xw = wj;
      let nu = 0;
      for (; xw--; ) {
        let ajv = wy[xw];
        if ("active" === $(ajv).attr("class")) {
          nu = xw;
        }
      }
      if (1 === acq) {
        const ael = nu + 1 < wj ? nu + 1 : 0;
        $(wy[nu]).removeAttr("class");
        $(wy[ael]).attr("class", "active");
        const ug = $(wy[ael]).attr("value");
        this.saveSettings(aea, ug);
      } else {
        if (0 === acq) {
          const vj = 0 < nu ? nu - 1 : wj - 1;
          $(wy[nu]).removeAttr("class");
          $(wy[vj]).attr("class", "active");
          const be = $(wy[vj]).attr("value");
          this.saveSettings(aea, be);
        } else {
          if (2 === acq) {
            $(wy[nu]).removeAttr("class");
            let vr;
            for (let tv = wj; tv--; ) {
              vr = wy[tv];
              if ($(vr).attr("value") === this[aea]) {
                $(vr).attr("class", "active");
                break;
              }
            }
          }
        }
      }
    }
    static ["handleRange"](agy, hu, ei = 0) {
      const bb = $(agy).attr("name");
      const all = $(agy).find("span");
      const ae = all[0];
      const qa = all[1];
      const sr = $(all[2]);
      const amb = ~~$(ae).attr("min");
      const ns = ~~$(ae).attr("max");
      const aaw = ~~$(ae).attr("step");
      const nr = ~~$(ae).attr("value");
      if (1 === hu && nr + aaw <= ns) {
        const or = aaw + nr;
        $(ae).attr("value", or);
        $(qa).css("width", ~~((100 * (or - amb)) / (ns - amb)) + "px");
        sr.text("[" + or + "]");
        this.saveSettings(bb, ~~or);
      } else {
        if (0 === hu && nr - aaw >= amb) {
          const abh = nr - aaw;
          $(ae).attr("value", abh);
          $(qa).css("width", ~~((100 * (abh - amb)) / (ns - amb)) + "px");
          sr.text("[" + abh + "]");
          this.saveSettings(bb, ~~abh);
        } else {
          if (2 === hu) {
            const nm = this[bb];
            $(ae).attr("value", nm);
            $(qa).css("width", ~~((100 * (nm - amb)) / (ns - amb)) + "px");
            sr.text("[" + nm + "]");
          } else {
            if (3 === hu) {
              let rw = 0 | ((ei / 100) * (ns - amb));
              rw = (0 | (rw / aaw)) * aaw;
              const ba = (100 * ((rw += amb) - amb)) / (ns - amb);
              $(ae).attr("value", rw);
              $(qa).css("width", ~~ba + "px");
              sr.text("[" + rw + "]");
              this.saveSettings(bb, ~~rw);
            }
          }
        }
      }
    }
    static ["saveSettings"](mb, fz) {
      this[mb] = fz;
      if ("multiboxMode" === mb) {
        Notifications.alert("Drag+", "Please rejoin the server!");
      }
      if ("chatType" === mb) {
        this.toggleChatroom();
      }
      if ("language" === mb) {
        this.changeLanguage();
      }
      if ("nickShadow" === mb) {
        TextRenderer.nickCaches.clear();
      }
      if ("massShadow" === mb) {
        TextRenderer.massCaches.clear();
      }
      Storage.set("settings", mb, fz);
      if ("custom" !== Theme.selectedPreset) {
        Theme.selectedPreset = "custom";
        Storage.set("theme", "selectedPreset", "custom");
        Theme.setDomValues();
      }
    }
    static ["changeLanguage"]() {
      Language.change();
      Commands.refresh();
    }
    static ["toggleChatroom"]() {
      if ("chatroom" === this.chatType) {
        $("#chatroom").show();
      } else {
        $("#chatroom").hide();
      }
    }
  }
  class Inputs {
    static ["init"]() {
      this.isOpened = false;
      this.target = "hotkeys";
      this.div = $("#inputs");
      this.addEvents();
      Actions.init();
      Hotkeys.init();
      Mouse.init();
      Commands.init();
    }
    static ["toggle"]() {
      if (this.isOpened) {
        this.close();
      } else {
        this.open();
      }
    }
    static ["close"]() {
      this.isOpened = false;
      this.div.fadeOut(250);
    }
    static ["open"]() {
      this.isOpened = true;
      this.div.fadeIn(250);
    }
    static ["addEvents"]() {
      $(".inputs-tab").each(function () {
        $(this).click(() => {
          const kt = $(this).attr("target");
          if ("#hotkeys" === kt) {
            $("#hotkeys").addClass("active");
            $("#commands").removeClass("active");
            $("#mouse").removeClass("active");
            $('.inputs-tab[target="#hotkeys"]').addClass("active");
            $('.inputs-tab[target="#mouse"]').removeClass("active");
            $('.inputs-tab[target="#commands"]').removeClass("active");
            Inputs.target = "hotkeys";
          } else if ("#mouse" === kt) {
            $("#mouse").addClass("active");
            $("#hotkeys").removeClass("active");
            $("#commands").removeClass("active");
            $('.inputs-tab[target="#hotkeys"]').removeClass("active");
            $('.inputs-tab[target="#commands"]').removeClass("active");
            $('.inputs-tab[target="#mouse"]').addClass("active");
            Inputs.target = "mouse";
          } else if ("#commands" === kt) {
            $("#commands").addClass("active");
            $("#hotkeys").removeClass("active");
            $("#mouse").removeClass("active");
            $('.inputs-tab[target="#commands"]').addClass("active");
            $('.inputs-tab[target="#hotkeys"]').removeClass("active");
            $('.inputs-tab[target="#mouse"]').removeClass("active");
            Inputs.target = "commands";
          }
        });
      });
      $(".inputs-tab.close").click(() => {
        this.close();
      });
    }
  }
  class Profile {
    static ["init"]() {
      this.selected = ~~Storage.get("profiles", "selected") || 1;
      this.wheelIsOpened = false;
      this.tag = Storage.get("profiles", "tag") || "";
      this.arbSkin = Storage.get("profiles", "arbSkin") || "";
      this.setDomValues();
      this.addEvents();
    }
    static ["setDomValues"]() {
      let abs = Storage.get("profiles", "profile" + this.selected);
      const alt = {
        nick: "profile " + this.selected,
        skin: "https://i.imgur.com/nRqSis7.png",
        skin2: "",
        nick2: "",
        arbSkin: "",
      };
      if (!abs) {
        abs = alt;
      }
      Storage.set("profiles", "profile" + this.selected, abs);
      $("#nick").val(abs.nick);
      $("#nick2").val(abs.nick2 || "");
      $("#skin").val(abs.skin);
      $("#skin2").val(abs.skin2 || "");
      $("#tag").val(this.tag);
      $("#arbSkin").val(abs.arbSkin);
      this.updateMainSkin();
      for (let pu = 8; 0 < pu; ) {
        this.updatePreviewSkin(pu);
        pu--;
      }
    }
    static ["addEvents"]() {
      $(".bar-circle-outer").click(() => {
        if (this.wheelIsOpened) {
          $(".skin-wheel").fadeOut(250);
          return (this.wheelIsOpened = false);
        }
        $(".skin-wheel").fadeIn(250);
        this.wheelIsOpened = true;
      });
      $(".skin-selector").each(function () {
        $(this).click(() => {
          const pb = ~~$(this).attr("value");
          Profile["switch"](pb);
          $(".skin-wheel").fadeOut(250);
        });
      });
      $(".menu-blur").click(() => {
        if (this.wheelIsOpened) {
          $(".skin-wheel").fadeOut(250);
          this.wheelIsOpened = false;
        }
      });
      $("#tag").blur(() => {
        this.setTag($("#tag").val());
        RelaySender.spectator(true);
      });
      $("#tag2").blur(() => {
        this.setTag($("#tag").val());
        RelaySender.spectator(true);
      });
      $("#nick").blur(() => {
        this.setNick($("#nick").val());
      });
      $("#nick2").blur(() => {
        this.setNick2($("#nick2").val());
      });
      $("#arbSkin").blur(() => {
        this.setarbSkin();
      });
      $("#skin").blur(() => {
        let aw = $("#skin").val();
        // getImgurCode() returns the literal string "XXXXXXX" when the URL
        // doesn't parse. This condition was inverted (had a leading "!"),
        // so a VALID url routed to setarbSkin() (a no-op for a filled-in
        // #skin field - see its own guard) while INVALID input fell through
        // to setSkin(), which happily saved "https://i.imgur.com/XXXXXXX.png"
        // to your profile. That's why a real skin URL never took effect,
        // and why refreshing kept showing that exact XXXXXXX.png fallback.
        if (Renderer.code2Url(Renderer.getImgurCode(aw || "")).includes("XXXXXXX")) {
          return this.setarbSkin();
        }
        this.setSkin($("#skin").val());
      });
      $("#skin2").blur(() => {
        let aq = $("#skin2").val();
        if (Renderer.code2Url(Renderer.getImgurCode(aq || "")).includes("XXXXXXX")) {
          $("#skin2").val(Player.skin2 ? Renderer.code2Url(Player.skin2) : "");
          return;
        }
        let ft = Storage.get("profiles", "profile" + this.selected);
        if (!ft) {
          ft = {};
        }
        ft.skin2 = Renderer.code2Url(Renderer.getImgurCode(aq));
        Storage.set("profiles", "profile" + this.selected, ft);
        Player.skin2 = aq;
      });
    }
    static ["switch"](acx) {
      this.selected = ~~acx;
      Storage.set("profiles", "selected", acx);
      let ze = Storage.get("profiles", "profile" + acx);
      const nw = {
        nick: "profile " + this.selected,
        skin: "https://i.imgur.com/nRqSis7.png",
        skin2: "",
        nick2: "",
        arbSkin: "",
      };
      if (!ze) {
        ze = nw;
      }
      $("#nick").val(ze.nick);
      $("#nick2").val(ze.nick2 || "");
      $("#skin").val(ze.skin);
      $("#skin2").val(ze.skin2 || "");
      $("#arbSkin").val(ze.arbSkin);
      Player.nick = "" === ze.nick ? "An unnamed cell" : ze.nick;
      Player.nick2 = ze.nick2 || "";
      Player.skin = ze.skin;
      Player.skin2 = ze.skin2 || "";
      Storage.set("profiles", "profile" + this.selected, ze);
      this.updateMainSkin();
    }
    static ["setNick"](jl) {
      if (Player.isAlive) {
        $("#nick").val(Player.nick);
        Notifications.alert("Drag+", Language.current.notif.nickChangeInGame);
      }
      let ht = Storage.get("profiles", "profile" + this.selected);
      const o = {
        nick: "profile " + this.selected,
        skin: "https://i.imgur.com/nRqSis7.png",
        skin2: "",
        nick2: "",
        arbSkin: "",
      };
      if (!ht) {
        ht = o;
      }
      ht.nick = jl;
      Storage.set("profiles", "profile" + this.selected, ht);
      Player.nick = "" === jl ? "An unnamed cell" : jl;
    }
    static ["setNick2"](jl) {
      let ht = Storage.get("profiles", "profile" + this.selected);
      const o = {
        nick: "profile " + this.selected,
        skin: "https://i.imgur.com/nRqSis7.png",
        skin2: "",
        nick2: "",
        arbSkin: "",
      };
      if (!ht) {
        ht = o;
      }
      ht.nick2 = jl;
      Storage.set("profiles", "profile" + this.selected, ht);
      Player.nick2 = jl;
    }
    static ["setarbSkin"]() {
      var uu = $("#arbSkin").val();
      Player.arbSkin = uu;
      let yg = $("#skin").val();
      if (Renderer.code2Url(Renderer.getImgurCode(yg || "")).includes("XXXXXXX")) {
        const agj = {
          nick: "profile " + this.selected,
          skin: "",
          arbSkin: uu,
          skin: Renderer.code2Url(Renderer.getImgurCode(yg)),
          arbSkin: uu,
          nick2: "",
        };
        Player.skin = Renderer.code2Url(Renderer.getImgurCode(yg));
        Storage.set("profiles", "profile" + this.selected, agj);
        this.updateMainSkin("./res/skins/free/" + uu.replace(/free\/|.png/g, "") + ".png");
        this.updatePreviewSkin(this.selected);
      }
    }
    static ["setSkin"](i) {
      let jg = Storage.get("profiles", "profile" + this.selected);
      const p = {
        nick: "profile " + this.selected,
        skin: "https://i.imgur.com/nRqSis7.png",
        skin2: "",
        nick2: "",
        arbSkin: "",
      };
      if (!jg) {
        jg = p;
      }
      jg.skin = Renderer.code2Url(Renderer.getImgurCode(i));
      Storage.set("profiles", "profile" + this.selected, jg);
      this.updateMainSkin();
      this.updatePreviewSkin(this.selected);
      Player.skin = i;
    }
    static ["setTag"](adz) {
      Player.tag = adz;
      Storage.set("profiles", "tag", adz);
    }
    static ["updateMainSkin"](adk) {
      const fr = $("#skin").val();
      adk = adk || $("#arbSkin").val();
      const ij = !Renderer.code2Url(Renderer.getImgurCode(fr || "")).includes("XXXXXXX")
        ? fr
        : "./res/skins/free/" + adk.replace(/free\/|.png/g, "") + ".png";
      $(".skin-preview").css("background", "url(" + ij + ")");
    }
    static ["updatePreviewSkin"](uk) {
      let agc = Storage.get("profiles", "profile" + uk);
      if (agc) {
        const sk = !Renderer.code2Url(Renderer.getImgurCode(agc.skin || "")).includes("XXXXXXX")
          ? agc.skin
          : agc.arbSkin && "./res/skins/free/" + agc.arbSkin.replace(/free\/|.png/g, "") + "png";
        $(".skin-selector[value=" + uk + "]").css("background", "url(" + sk + ")");
      }
    }
  }
  class Hotkeys {
    static ["init"]() {
      this.toggleMenuKey = Storage.get("hotkeys", "toggleMenuKey") || "ESC";
      this.feedKey = Storage.get("hotkeys", "feedKey") || "W";
      this.macroFeedKey = Storage.get("hotkeys", "macroFeedKey") || "E";
      this.splitKey = Storage.get("hotkeys", "splitKey") || "SPACE";
      this.doubleSplitKey = Storage.get("hotkeys", "doubleSplitKey") || "R";
      this.split16Key = Storage.get("hotkeys", "split16Key") || "G";
      this.stopKey = Storage.get("hotkeys", "stopKey") || "S";
      this.chatKey = Storage.get("hotkeys", "chatKey") || "ENTER";
      this.freeSpectateKey = Storage.get("hotkeys", "freeSpectateKey") || "Q";
      this.toggleSplitRings = Storage.get("hotkeys", "toggleSplitRings") || "U";
      this.toggleOpponentRings = Storage.get("hotkeys", "toggleOpponentRings") || "I";
      this.toggleNick = Storage.get("hotkeys", "toggleNick") || "N";
      this.toggleMass = Storage.get("hotkeys", "toggleMass") || "M";
      this.toggleBGsectors = Storage.get("hotkeys", "toggleBGsectors") || "B";
      this.toggleFood = Storage.get("hotkeys", "toggleFood") || "F";
      this.toggleSkin = Storage.get("hotkeys", "toggleSkin") || "A";
      this.toggleCustomSkin = Storage.get("hotkeys", "toggleCustomSkin") || "X";
      this.respawnKey = Storage.get("hotkeys", "respawnKey") || "TILDE";
      this.multiboxTab = Storage.get("hotkeys", "multiboxTab") || "TAB";
      this.togglemultiboxRing = Storage.get("hotkeys", "togglemultiboxRing") || "L";
      this.command0Key = Storage.get("hotkeys", "command0Key") || "0";
      this.command1Key = Storage.get("hotkeys", "command1Key") || "1";
      this.command2Key = Storage.get("hotkeys", "command2Key") || "2";
      this.command3Key = Storage.get("hotkeys", "command3Key") || "3";
      this.command4Key = Storage.get("hotkeys", "command4Key") || "4";
      this.command5Key = Storage.get("hotkeys", "command5Key") || "5";
      this.command6Key = Storage.get("hotkeys", "command6Key") || "6";
      this.command7Key = Storage.get("hotkeys", "command7Key") || "7";
      this.command8Key = Storage.get("hotkeys", "command8Key") || "8";
      this.command9Key = Storage.get("hotkeys", "command9Key") || "9";
      this.zoom1key = Storage.get("hotkeys", "zoom1key") || "ALT+1";
      this.zoom2key = Storage.get("hotkeys", "zoom2key") || "ALT+2";
      this.zoom3key = Storage.get("hotkeys", "zoom3key") || "ALT+3";
      this.zoom4key = Storage.get("hotkeys", "zoom4key") || "ALT+4";
      this.zoom5key = Storage.get("hotkeys", "zoom5key") || "ALT+5";
      this.pressedKeys = new Map();
      this.setDomKeys();
      this.addEvents();
    }
    static ["setDomKeys"]() {
      $("#hotkeys .row").each(function () {
        const qb = $(this).attr("name");
        const aeg = $(this).find(".key")[0];
        $(aeg).val(Hotkeys[qb]);
      });
    }
    static ["addEvents"]() {
      $("#hotkeys").perfectScrollbar();
      $("#hotkeys .row .key").each(function () {
        $(this).keydown((qd) => {
          qd.preventDefault();
          const ra = $(this).parent();
          Hotkeys.setKey(ra, qd, this);
        });
      });
      document.addEventListener("keydown", (hv) => this.onKeyDown(hv));
      document.addEventListener("keyup", (pp) => this.onKeyUp(pp));
    }
    static ["onKeyDown"](aao) {
      if (9 === aao.keyCode) {
        aao.preventDefault();
      }
      const hj = this.getKey(aao);
      if (
        hj &&
        !this.pressedKeys.has(hj) &&
        (this.pressedKeys.set(hj, true), !Inputs.isOpened || "hotkeys" !== Inputs.target)
      ) {
        if (hj === this.chatKey) {
          return void Actions.chat(1);
        }
        if (!ChatInput.isFocused) {
          if (hj === this.toggleMenuKey) {
            return void MainMenu.toggle();
          }
          if (!MainMenu.isOpened) {
            aao.preventDefault();
            return hj !== this.freeSpectateKey || Player.isAlive
              ? hj === this.respawnKey
                  ? void Actions.respawn()
                : hj === this.macroFeedKey
                  ? void Actions.macroFeed(true)
                  : hj === this.feedKey
                    ? void Actions.feed()
                    : hj === this.splitKey
                      ? void Actions.split()
                      : hj === this.doubleSplitKey
                        ? void Actions.doubleSplit()
                        : hj === this.split16Key
                          ? void Actions.split16()
                          : hj === this.multiboxTab
                            ? void Actions.multiboxTab()
                            : hj === this.stopKey
                              ? void Actions.stopMovementToggle()
                              : hj === this.toggleSplitRings
                                ? void Actions.toggleSplitRings()
                                : hj === this.toggleOpponentRings
                                  ? void Actions.toggleOpponentRings()
                                  : hj === this.toggleNick
                                    ? void Actions.toggleCellNick()
                                    : hj === this.toggleMass
                                      ? void Actions.toggleCellMass()
                                      : hj === this.toggleBGsectors
                                        ? void Actions.toggleBGsectors()
                                        : hj === this.toggleFood
                                          ? void Actions.toggleGameFood()
                                          : hj === this.toggleSkin
                                            ? void Actions.toggleSkin()
                                            : hj === this.toggleCustomSkin
                                              ? void Actions.toggleCustomSkin()
                                              : hj === this.togglemultiboxRing
                                                ? void Actions.togglemultiboxRing()
                                                : hj === this.command0Key
                                                  ? void Actions.command(0)
                                                  : hj === this.command1Key
                                                    ? void Actions.command(1)
                                                    : hj === this.command2Key
                                                      ? void Actions.command(2)
                                                      : hj === this.command3Key
                                                        ? void Actions.command(3)
                                                        : hj === this.command4Key
                                                          ? void Actions.command(4)
                                                          : hj === this.command5Key
                                                            ? void Actions.command(5)
                                                            : hj === this.command6Key
                                                              ? void Actions.command(6)
                                                              : hj === this.command7Key
                                                                ? void Actions.command(7)
                                                                : hj === this.command8Key
                                                                  ? void Actions.command(8)
                                                                  : hj === this.command9Key
                                                                    ? void Actions.command(9)
                                                                    : hj === this.zoom1key
                                                                      ? void Actions.setZoom(0.5)
                                                                      : hj === this.zoom2key
                                                                        ? void Actions.setZoom(0.25)
                                                                        : hj === this.zoom3key
                                                                          ? void Actions.setZoom(0.125)
                                                                          : hj === this.zoom4key
                                                                            ? void Actions.setZoom(0.075)
                                                                            : hj === this.zoom5key
                                                                              ? void Actions.setZoom(0.05)
                                                                              : undefined
              : void Actions.toggleSpectate();
          }
        }
      }
    }
    static ["onKeyUp"](qt) {
      const uc = this.getKey(qt);
      if (uc && (this.pressedKeys["delete"](uc), uc === this.macroFeedKey)) {
        Actions.macroFeed(false);
      }
    }
    static ["setKey"](qn, k, of) {
      let bx = this.getKey(k);
      let adb = $(qn).attr("name");
      if (false !== bx) {
        if ("freeSpectateKey" !== adb) {
          this.alreadyBinded(bx);
        }
        if ("DEL" === bx) {
          bx = "";
        }
        $(of).val(bx);
        this[adb] = bx;
        Storage.set("hotkeys", adb, bx);
      }
    }
    static ["alreadyBinded"](pe) {
      let afo = false;
      if (pe === this.toggleMenuKey) {
        afo = "toggleMenuKey";
      } else if (pe === this.feedKey) {
        afo = "feedKey";
      } else if (pe === this.macroFeedKey) {
        afo = "macroFeedKey";
      } else if (pe === this.splitKey) {
        afo = "splitKey";
      } else if (pe === this.doubleSplitKey) {
        afo = "doubleSplitKey";
      } else if (pe === this.split16Key) {
        afo = "split16Key";
      } else if (pe === this.stopKey) {
        afo = "stopKey";
      } else if (pe === this.chatKey) {
        afo = "chatKey";
      } else if (pe === this.toggleSplitRings) {
        afo = "toggleSplitRings";
      } else if (pe === this.toggleOpponentRings) {
        afo = "toggleOpponentRings";
      } else if (pe === this.toggleNick) {
        afo = "toggleNick";
      } else if (pe === this.toggleMass) {
        afo = "toggleMass";
      } else if (pe === this.toggleBGsectors) {
        afo = "toggleBGsectors";
      } else if (pe === this.toggleFood) {
        afo = "toggleFood";
      } else if (pe === this.toggleSkin) {
        afo = "toggleSkin";
      } else if (pe === this.toggleCustomSkin) {
        afo = "toggleCustomSkin";
      } else if (pe === this.togglemultiboxRing) {
        afo = "togglemultiboxRing";
      } else if (pe === this.respawnKey) {
        afo = "respawnKey";
      } else if (pe === this.command0Key) {
        afo = "command0Key";
      } else if (pe === this.command1Key) {
        afo = "command1Key";
      } else if (pe === this.command2Key) {
        afo = "command2Key";
      } else if (pe === this.command3Key) {
        afo = "command3Key";
      } else if (pe === this.command4Key) {
        afo = "command4Key";
      } else if (pe === this.command5Key) {
        afo = "command5Key";
      } else if (pe === this.command6Key) {
        afo = "command6Key";
      } else if (pe === this.command7Key) {
        afo = "command7Key";
      } else if (pe === this.command8Key) {
        afo = "command8Key";
      } else if (pe === this.command9Key) {
        afo = "command9Key";
      } else if (pe === this.zoom1key) {
        afo = "zoom1key";
      } else if (pe === this.zoom2key) {
        afo = "zoom2key";
      } else if (pe === this.zoom3key) {
        afo = "zoom3key";
      } else if (pe === this.zoom4key) {
        afo = "zoom4key";
      } else if (pe === this.zoom5key) {
        afo = "zoom5key";
      }
      if (afo) {
        this[afo] = "";
        Storage.set("hotkeys", afo, "");
        $("#hotkeys .row[name=" + afo + "] input").val("");
      }
    }
    static ["isValidKey"](akn) {
      const eh = akn.keyCode || akn.which;
      return (
        (64 < eh && 91 > eh) ||
        (47 < eh && 58 > eh) ||
        13 === eh ||
        27 === eh ||
        32 === eh ||
        16 === eh ||
        46 === eh ||
        192 === eh ||
        9 === eh
      );
    }
    static ["getKey"](cf) {
      if (!this.isValidKey(cf)) {
        return false;
      }
      const ez = cf.keyCode || cf.which;
      let bl = false;
      let ye = false;
      if (cf.ctrlKey) {
        bl = "CTRL+";
      } else if (cf.altKey) {
        bl = "ALT+";
      }
      if (64 < ez && 91 > ez) {
        ye = String.fromCharCode(ez);
      } else if (47 < ez && 58 > ez) {
        ye = "" + (ez - 48);
      } else if (!bl) {
        if (13 === ez) {
          ye = "ENTER";
        } else if (27 === ez) {
          ye = "ESC";
        } else if (32 === ez) {
          ye = "SPACE";
        } else if (16 === ez) {
          ye = "SHIFT";
        } else if (9 === ez) {
          ye = "TAB";
        } else if (46 === ez) {
          ye = "DEL";
        } else if (192 === ez) {
          ye = "TILDE";
        }
      }
      return !!ye && (bl ? bl + ye : ye);
    }
  }
  class Mouse {
    static ["init"]() {
      this.leftClick = Storage.get("mouse", "leftClick") || "off";
      this.middleClick = Storage.get("mouse", "middleClick") || "commander";
      this.rightClick = Storage.get("mouse", "rightClick") || "off";
      this.x = 0;
      this.y = 0;
      this.canvas = document.getElementById("canvas");
      this.canvasX = 0;
      this.canvasY = 0;
      this.setDomValues();
      this.addEvents();
    }
    static ["send"]() {
      const qf = {
        x: 0x0,
        y: 0x0,
      };
      const hn = 2 === Player.typeID ? WorldData.position : qf;
      this.canvasX = (this.x - this.canvas.width / 2) / Camera.viewport + Camera.x + hn.x;
      this.canvasY = (this.y - this.canvas.height / 2) / Camera.viewport + Camera.y + hn.y;
      return Camera.isSpectating && Targeting.isTurnedOn
        ? void PacketSender.mouse(0 | Targeting.center.x, 0 | Targeting.center.y)
        : Player.movementPaused
          ? void PacketSender.mouse(0 | Player.x, 0 | Player.y)
          : void PacketSender.mouse(0 | this.canvasX, 0 | this.canvasY);
    }
    static ["setDomValues"]() {
      $(".mouse-options").each(function () {
        const kr = $(this).attr("type");
        if ("range" === kr) {
          Mouse.handleRange(this, 2);
        } else if ("options" === kr) {
          Mouse.handleOptions(this, 2);
        }
      });
    }
    static ["addEvents"]() {
      $("#mouse").perfectScrollbar();
      $("#mouse .fa-chevron-left").each(function () {
        $(this).click(() => {
          const km = $(this).parent();
          const afe = $(km).attr("type");
          if ("options" === afe) {
            Mouse.handleOptions(km, 0);
          } else if ("range" === afe) {
            Mouse.handleRange(km, 0);
          }
        });
      });
      $("#mouse .fa-chevron-right").each(function () {
        $(this).click(() => {
          const acn = $(this).parent();
          const ws = $(acn).attr("type");
          if ("options" === ws) {
            Mouse.handleOptions(acn, 1);
          } else if ("range" === ws) {
            Mouse.handleRange(acn, 1);
          }
        });
      });
      // Bound to the document, not just the canvas: mousemove only fires on
      // whichever element is directly under the cursor, so tracking it on
      // the canvas alone made the reported position freeze every time the
      // cursor crossed any overlapping UI (chat, minimap, HUD panels) -
      // exactly what free-spectate needs to sweep across to look around,
      // which is what made the camera appear to keep snapping back to a
      // stale position. Click actions stay canvas-scoped below on purpose,
      // so clicking a UI button doesn't also trigger feed/split/commander.
      document.addEventListener("mousemove", (eq) => {
        this.x = eq.clientX;
        this.y = eq.clientY;
      });
      this.canvas.addEventListener("mousedown", (akz) => {
        this.onMouseClick(akz);
      });
      this.canvas.addEventListener("mouseup", (ama) => {
        this.onMouseRelease(ama);
      });
      this.canvas.addEventListener("wheel", (xa) => {
        this.onMouseWheel(xa);
      });
      this.canvas.addEventListener("contextmenu", (hr) => {
        hr.preventDefault();
        // Right-click is also a configurable gameplay action (feed/split/
        // commander/etc, dispatched via onMouseClick on mousedown) - only
        // steal it for the party-invite menu while it's unbound, so the
        // two don't both fire off a single right-click.
        if ("off" !== this.rightClick) {
          PartyManager.closeMenu();
          return;
        }
        const dg = CellData.getCellAt(this.canvasX, this.canvasY);
        if (dg) {
          PartyManager.openMenu(dg, hr.pageX, hr.pageY);
        } else {
          PartyManager.closeMenu();
        }
      });
    }
    static ["onMouseWheel"](aib) {
      let uw = Camera.targetViewport;
      if (0 > aib.wheelDelta) {
        uw *= Settings.zoomSpeed / 100;
      } else {
        uw /= Settings.zoomSpeed / 100;
      }
      uw = 2 < uw ? 2 : 0.02 > uw ? 0.02 : uw;
      Camera.targetViewport = uw;
    }
    static ["onMouseClick"](wm) {
      let jb = false;
      switch (wm.which) {
        case 1:
          jb = "leftClick";
          break;
        case 2:
          jb = "middleClick";
          break;
        case 3:
          jb = "rightClick";
      }
      if (jb) {
        if (Camera.isSpectating && "on" === Settings.targeting) {
          const a = (wm.clientX - (window.innerWidth >> 1)) / Camera.viewport + Camera.x;
          const ey = (wm.clientY - (window.innerHeight >> 1)) / Camera.viewport + Camera.y;
          return void ("leftClick" === jb
            ? Targeting.lockTarget(a, ey, 1)
            : "middleClick" === jb
              ? Targeting.reset()
              : "rightClick" == jb && Targeting.lockTarget(a, ey, 2));
        }
        const wd = this[jb];
        return "off" === wd
          ? undefined
          : "feed" === wd
            ? void Actions.feed()
            : "macroFeed" === wd
              ? void Actions.macroFeed(true)
              : "split" === wd
                ? void Actions.split()
                : "doubleSplit" === wd
                  ? void Actions.doubleSplit()
                  : "split16" === wd
                    ? void Actions.split16()
                    : "commander" === wd
                      ? void RelaySender.commander()
                      : "multiboxTab" === wd
                        ? void Actions.multiboxTab()
                        : undefined;
      }
    }
    static ["onMouseRelease"](tm) {
      let sa = false;
      switch (tm.which) {
        case 1:
          sa = "leftClick";
          break;
        case 2:
          sa = "middleClick";
          break;
        case 3:
          sa = "rightClick";
      }
      if (sa) {
        if ("macroFeed" === this[sa]) {
          return void Actions.macroFeed(false);
        }
      }
    }
    static ["handleOptions"](yd, rj) {
      const jt = $(yd).attr("name");
      const rh = $(yd).find("b");
      const wq = rh.length;
      let xr = wq;
      let la = 0;
      for (; xr--; ) {
        let my = rh[xr];
        if ("active" === $(my).attr("class")) {
          la = xr;
        }
      }
      if (1 === rj) {
        const alv = la + 1 < wq ? la + 1 : 0;
        $(rh[la]).removeAttr("class");
        $(rh[alv]).attr("class", "active");
        const gt = $(rh[alv]).attr("value");
        this.saveMouseOptions(jt, gt);
      } else {
        if (0 === rj) {
          const afd = 0 < la ? la - 1 : wq - 1;
          $(rh[la]).removeAttr("class");
          $(rh[afd]).attr("class", "active");
          const zk = $(rh[afd]).attr("value");
          this.saveMouseOptions(jt, zk);
        } else {
          if (2 === rj) {
            $(rh[la]).removeAttr("class");
            let mq;
            for (let ix = wq; ix--; ) {
              mq = rh[ix];
              if ($(mq).attr("value") === this[jt]) {
                $(mq).attr("class", "active");
                break;
              }
            }
          }
        }
      }
    }
    static ["handleRange"](vt, qm) {
      const afl = $(vt).attr("name");
      const vl = $(vt).find("span");
      const kf = vl[0];
      const md = vl[1];
      const aaq = ~~$(kf).attr("min");
      const ajg = ~~$(kf).attr("max");
      const cg = ~~$(kf).attr("step");
      const ev = ~~$(kf).attr("value");
      if (1 === qm && ev + cg <= ajg) {
        const aau = cg + ev;
        $(kf).attr("value", aau);
        $(md).css("width", ~~((100 * (aau - aaq)) / (ajg - aaq)) + "px");
        this.saveMouseOptions(afl, aau);
      } else {
        if (0 === qm && ev - cg >= aaq) {
          const jq = ev - cg;
          $(kf).attr("value", jq);
          $(md).css("width", ~~((100 * (jq - aaq)) / (ajg - aaq)) + "px");
          this.saveMouseOptions(afl, jq);
        } else {
          if (2 === qm) {
            const aaa = this[afl];
            $(kf).attr("value", aaa);
            $(md).css("width", ~~((100 * (aaa - aaq)) / (ajg - aaq)) + "px");
          }
        }
      }
    }
    static ["saveMouseOptions"](hz, adh) {
      this[hz] = adh;
      Storage.set("mouse", hz, adh);
    }
  }
  class Commands {
    static ["init"]() {
      this.load();
      this.setDomValues();
      this.addEvents();
    }
    static ["load"]() {
      this.command1 = Storage.get("commands", "command1") || Language.current.commandsMenu.command1;
      this.command2 = Storage.get("commands", "command2") || Language.current.commandsMenu.command2;
      this.command3 = Storage.get("commands", "command3") || Language.current.commandsMenu.command3;
      this.command4 = Storage.get("commands", "command4") || Language.current.commandsMenu.command4;
      this.command5 = Storage.get("commands", "command5") || Language.current.commandsMenu.command5;
      this.command6 = Storage.get("commands", "command6") || Language.current.commandsMenu.command6;
      this.command7 = Storage.get("commands", "command7") || Language.current.commandsMenu.command7;
      this.command8 = Storage.get("commands", "command8") || Language.current.commandsMenu.command8;
      this.command9 = Storage.get("commands", "command9") || Language.current.commandsMenu.command9;
      this.command0 = Storage.get("commands", "command0") || Language.current.commandsMenu.command0;
    }
    static ["addEvents"]() {
      $("#commands").perfectScrollbar();
      let ala;
      for (let ps = 10; ps--; ) {
        ala = "command" + ps;
        $("#" + ala).blur(() => {
          this.setCommand(ala, $("#" + ala).val());
        });
      }
    }
    static ["setCommand"](aez, yz) {
      this[aez] = yz;
      Storage.set("commands", aez, yz);
    }
    static ["setDomValues"]() {
      let al;
      for (let tw = 10; tw--; ) {
        al = "command" + tw;
        $("#" + al).val(this[al]);
      }
    }
    static ["refresh"]() {
      this.load();
      this.setDomValues();
    }
  }
  class Actions {
    static ["init"]() {
      this.ejectInterval = false;
    }
    static ["stopMovementToggle"]() {
      Player.movementPaused = !Player.movementPaused;
    }
    static ["feed"]() {
      Mouse.send();
      PacketSender.eject();
    }
    static ["macroFeed"](gd) {
      if (gd) {
        if (this.ejectInterval) {
          return;
        }
        this.feed();
        this.ejectInterval = setInterval(() => {
          this.feed();
        }, 25);
      } else if (this.ejectInterval) {
        clearInterval(this.ejectInterval);
        this.ejectInterval = false;
      }
    }
    static ["split"]() {
      Mouse.send();
      PacketSender.split();
    }
    static ["doubleSplit"]() {
      this.split();
      setTimeout(() => {
        this.split();
      }, 40);
    }
    static ["split16"]() {
      this.split();
      setTimeout(() => {
        this.split();
      }, 40);
      setTimeout(() => {
        this.split();
      }, 60);
      setTimeout(() => {
        this.split();
      }, 80);
      setTimeout(() => {
        this.split();
      }, 100);
      setTimeout(() => {
        this.split();
      }, 120);
      setTimeout(() => {
        this.split();
      }, 140);
    }
    static ["toggleSpectate"]() {
      return Targeting.isTurnedOn
        ? (Targeting.reset(), (Targeting.target1.turnedOn = false), (Targeting.target2.turnedOn = false), void TargetingHud.mouseViewport())
        : (PacketSender.freeSpectate(),
          Camera.freeSpectate ? TargetingHud.mouseViewport() : TargetingHud.topViewport(),
          (Targeting.target1.turnedOn = false),
          void (Targeting.target2.turnedOn = false));
    }
    static ["chat"](qk) {
      ChatInput.enter(qk);
    }
    static ["command"](xz) {
      let mc = Commands["command" + xz];
      if (0 <= mc.indexOf("%sector%")) {
        const uv = WorldData.getLocation(Camera.x, Camera.y);
        mc = mc.replace("%sector%", uv);
      }
      PacketSender.chat(mc);
    }
    static ["setZoom"](yh) {
      Camera.targetViewport = yh;
    }
    static ["toggleCellNick"]() {
      const qr = Storage.get("settings", "cellNick");
      Settings.cellNick = "off" === Settings.cellNick ? ("off" !== qr && qr) || "on" : "off";
    }
    static ["toggleCellMass"]() {
      const jo = Storage.get("settings", "cellMass");
      Settings.cellMass = "off" === Settings.cellMass ? ("off" !== jo && jo) || "shortened" : "off";
    }
    static ["toggleGameFood"]() {
      const aii = Storage.get("settings", "food");
      Settings.food = "off" === Settings.food ? ("off" !== aii && aii) || "monoColored" : "off";
    }
    static ["toggleBGsectors"]() {
      const amg = Storage.get("settings", "bgSectors");
      Settings.bgSectors = "off" === Settings.bgSectors ? ("off" !== amg && amg) || "normal" : "off";
    }
    static ["toggleSkin"]() {
      const it = Storage.get("settings", "arbSkins");
      Settings.arbSkins = "off" === Settings.arbSkins ? ("off" !== it && it) || "on" : "off";
    }
    static ["toggleCustomSkin"]() {
      const qj = Storage.get("settings", "urlSkins");
      Settings.urlSkins = "off" === Settings.urlSkins ? ("off" !== qj && qj) || "on" : "off";
    }
    static ["toggleSplitRings"]() {
      const vw = Storage.get("settings", "splitRings");
      Settings.splitRings = "off" === Settings.splitRings ? ("off" !== vw && vw) || "on" : "off";
    }
    static ["toggleOpponentRings"]() {
      const abc = Storage.get("settings", "opponentRings");
      Settings.opponentRings = "off" === Settings.opponentRings ? ("off" !== abc && abc) || "on" : "off";
    }
    static ["togglemultiboxRing"]() {
      const nx = Storage.get("settings", "multiboxRing");
      Settings.multiboxRing = "off" === Settings.multiboxRing ? ("off" !== nx && nx) || "on" : "off";
    }
    static ["toggleMultiboxCellColor"]() {
      const mx = Storage.get("settings", "multiboxCellColor");
      Settings.multiboxCellColor = "off" === Settings.multiboxCellColor ? ("off" !== mx && mx) || "on" : "off";
    }
    static ["togglePairCamera"]() {
      const bg = Storage.get("settings", "pairCamera");
      Settings.pairCamera = "off" === Settings.pairCamera ? ("off" !== bg && bg) || "on" : "off";
    }
    static ["respawn"]() {
      // Respawn every dead tab that has a live connection - Tab 1 first,
      // then Tab 2 if it is connected. This keeps the two-tab pair together
      // from a single quick-respawn key press.
      const ie = setInterval(() => {
        if (WsConnection.connected) {
          clearInterval(ie);
          if (!Player._isAlive) {
            PacketSender.spawn(1);
          }
          if (WsConnection.connected2 && !Player._isAlive2) {
            PacketSender.spawn(2);
          }
        }
      }, 100);
    }
    static ["kill"]() {
      WsConnection.recycleActiveCell();
    }
    static ["multiboxTab"]() {
      if (1 === Player.typeID) {
        Player.typeID = 2;
        if (!Player._isAlive2) {
          PacketSender.spawn();
        }
      } else {
        Player.typeID = 1;
        if (!Player._isAlive) {
          PacketSender.spawn();
        }
      }
    }
  }
  class Server {
    static ["init"]() {
      this.addEvents();
      this.setServers();
    }
    static ["addEvents"]() {
      $("#servers").change(() => {
        let by = $("#servers").val();
        if ("" != by) {
          this.joinServer(by);
        }
      });
    }
    static ["fetchServerinfo"]() {
      let rp;
      let aan = new XMLHttpRequest();
      aan.open("GET", "https://3rb.io/php/Servers.php", false);
      aan.send();
      try {
        rp = JSON.parse(aan.responseText);
      } catch (akm) {
        rp = null;
      }
      return rp;
    }
    static ["getServers"]() {
      try {
        var aco = [];
        var abp = [];
        this.restartTimes = {};
        var aby = this.fetchServerinfo();
        var { ip: pd, modes: od } = aby;
        Object.keys(od).forEach((ace) => {
          var {
            total: bw,
            max: ux,
            servers: [{ port: ame, restart: lp }],
          } = od[ace];
          const fq = "wss://" + pd + ":" + ame + "/V5";
          aco[ace] = {
            ip: fq,
            gamemode: ace,
            max_players: ux,
            current_players: bw,
          };
          abp[ace] = fq;
          this.restartTimes[fq] = lp ? Date.parse(lp) : null;
        });
      } catch (zi) {
        Notifications.warn("Drag+", "Unexpected error occured while parsing servers info.");
        throw zi;
      }
      return [abp, aco];
    }
    static ["setServers"]() {
      let [ahh, s] = this.getServers();
      let wt = "";
      let ss = null;
      let cl = null;
      Object.keys(ahh).forEach((agu, da) => {
        cl = agu.replace(/[^a-zA-Z0-9 ]/g, "");
        wt =
          null != s[agu]
            ? wt +
              '<option id="ffa' +
              parseInt(da + 1) +
              '" value="' +
              ahh[agu] +
              '">' +
              cl +
              " [" +
              s[agu].current_players +
              "/" +
              s[agu].max_players +
              "]</option>"
            : wt + '<option id="ffa' + parseInt(da + 1) + '" value="' + ahh[agu] + '">' + agu + "</option>";
      });
      ss = Math.floor(ahh.length * Math.random()) + 1;
      $("#servers").html(wt);
      $("#opt_ffa" + ss).prop("selected", true);
      $(document).ready(function () {
        Server.joinServer($("#servers").val());
      });
    }
    static ["joinServer"](aba) {
      WsConnection.restartAt = (this.restartTimes && this.restartTimes[aba]) || null;
      WsConnection.connect(aba);
    }
  }
  class Theme {
    static ["init"]() {
      this.isOpened = false;
      this.div = $("#theme");
      this.selectedPreset = Storage.get("theme", "selectedPreset") || "custom";
      this.skinBorder = ~~Storage.get("theme", "skinBorder") || 100;
      this.lbSize = ~~Storage.get("theme", "lbSize") || 110;
      this.minimapSize = ~~Storage.get("theme", "minimapSize") || 200;
      this.chatFontSize = ~~Storage.get("theme", "chatFontSize") || 14;
      this.cellTransparency = ~~Storage.get("theme", "cellTransparency") || 100;
      this.cellTransparencyStyle = Storage.get("theme", "cellTransparencyStyle") || "regular";
      this.lightenCellColor = ~~Storage.get("theme", "lightenCellColor") || 100;
      this.borderWidth = ~~Storage.get("theme", "borderWidth") || 150;
      this.borderColor = Storage.get("theme", "borderColor") || "#ffffff";
      this.team1color = Storage.get("theme", "team1color") || "#aeaeae";
      this.team2color = Storage.get("theme", "team2color") || "#ff171f";
      this.multiboxActive = Storage.get("theme", "multiboxActive") || "#ff61f8";
      this.multiboxInactive = Storage.get("theme", "multiboxInactive") || "#fff";
      this.multiboxRingWidth = ~~Storage.get("theme", "multiboxRingWidth") || 10;
      this.nickColor = Storage.get("theme", "nickColor") || "#fff";
      this.nickStrokeColor = Storage.get("theme", "nickStrokeColor") || "#000";
      this.cellNickSize = ~~Storage.get("theme", "cellNickSize") || 120;
      this.nickFont = Storage.get("theme", "nickFont") || "ubuntu";
      this.massColor = Storage.get("theme", "massColor") || "#fff";
      this.massStrokeColor = Storage.get("theme", "massStrokeColor") || "#000";
      this.cellMassSize = ~~Storage.get("theme", "cellMassSize") || 150;
      this.massFont = Storage.get("theme", "massFont") || "ubuntu";
      this.gridWidth = ~~Storage.get("theme", "gridWidth") || 100;
      this.gridColor = Storage.get("theme", "gridColor") || "#111";
      this.gridTextColor = Storage.get("theme", "gridTextColor") || "#111";
      this.gridTextSize = Storage.get("theme", "gridTextSize") || 1500;
      this.gridTextFont = Storage.get("theme", "gridTextFont") || "ubuntu";
      this.foodSize = ~~Storage.get("theme", "foodSize") || 1;
      this.foodColor = Storage.get("theme", "foodColor") || "#6111ff";
      this.virusColor = Storage.get("theme", "virusColor") || "#8f8f8f";
      this.virusBorderColor = Storage.get("theme", "virusBorderColor") || "#c2c2c2";
      this.virusBorderWidth = ~~Storage.get("theme", "virusBorderWidth") || 10;
      this.commanderColor = Storage.get("theme", "commanderColor") || "#f5e35d";
      this.backgroundColor = Storage.get("theme", "backgroundColor") || "#000000";
      this.backgroundImage = Storage.get("theme", "backgroundImage") || "https://i.imgur.com/aKvo1jQ.png";
      this.borderStyle = Storage.get("theme", "borderStyle") || "rainbow";
      this.indicatorSize = ~~Storage.get("theme", "indicatorSize") || 100;
      this.cursor = Storage.get("theme", "cursor") || 13;
      this.addPresets();
      this.setDomValues();
      this.addEvents();
    }
    static ["setDomValues"]() {
      $(".theme-options").each(function () {
        const wi = $(this).attr("type");
        if ("range" === wi) {
          Theme.handleRange(this, 2);
        } else if ("options" === wi) {
          Theme.handleOptions(this, 2);
        } else if ("colorpicker" === wi) {
          Theme.initColorpicker(this);
        }
      });
      this.setChatFontSize(this.chatFontSize);
      this.setBackground(this.backgroundColor);
      this.setLeaderboard(this.lbSize);
      this.setMinimap(this.minimapSize);
      this.setCursor(this.cursor);
      $("#bgImageUrl").val(this.backgroundImage);
    }
    static ["addEvents"]() {
      $(".theme-container").perfectScrollbar();
      $(".theme-container .fa-chevron-left").each(function () {
        $(this).click(() => {
          const qx = $(this).parent();
          const aar = $(qx).attr("type");
          if ("options" === aar) {
            Theme.handleOptions(qx, 0);
          } else if ("range" === aar) {
            Theme.handleRange(qx, 0);
          }
        });
      });
      $(".theme-container span.outer").each(function () {
        $(this).click((alf) => {
          const zd = $(this).parent();
          Theme.handleRange(zd, 3, alf.offsetX);
        });
      });
      $(".theme-container .fa-chevron-right").each(function () {
        $(this).click(() => {
          const rt = $(this).parent();
          const ly = $(rt).attr("type");
          if ("options" === ly) {
            Theme.handleOptions(rt, 1);
          } else if ("range" === ly) {
            Theme.handleRange(rt, 1);
          }
        });
      });
      $(".theme-close").click(() => this.close());
      $("#bgImageUrl").blur(() => {
        this.saveTheme("backgroundImage", $("#bgImageUrl").val().trim());
      });
    }
    static ["toggle"]() {
      if (this.isOpened) {
        this.close();
      } else {
        this.open();
      }
    }
    static ["close"]() {
      this.isOpened = false;
      this.div.fadeOut(250);
    }
    static ["open"]() {
      this.isOpened = true;
      this.div.fadeIn(250);
    }
    static ["handleOptions"](als, aep) {
      const afa = $(als).attr("name");
      const abn = $(als).find("b");
      const vk = abn.length;
      let gl = vk;
      let fb = 0;
      for (; gl--; ) {
        let wb = abn[gl];
        if ("active" === $(wb).attr("class")) {
          fb = gl;
        }
      }
      if (1 === aep) {
        const akr = fb + 1 < vk ? fb + 1 : 0;
        $(abn[fb]).removeAttr("class");
        $(abn[akr]).attr("class", "active");
        const ahr = $(abn[akr]).attr("value");
        this.saveTheme(afa, ahr);
      } else {
        if (0 === aep) {
          const agm = 0 < fb ? fb - 1 : vk - 1;
          $(abn[fb]).removeAttr("class");
          $(abn[agm]).attr("class", "active");
          const pm = $(abn[agm]).attr("value");
          this.saveTheme(afa, pm);
        } else {
          if (2 === aep) {
            $(abn[fb]).removeAttr("class");
            let agn;
            for (let agg = vk; agg--; ) {
              agn = abn[agg];
              if ($(agn).attr("value") === this[afa]) {
                $(agn).attr("class", "active");
                break;
              }
            }
          }
        }
      }
    }
    static ["handleRange"](gb, gw, agd = 0) {
      const amc = $(gb).attr("name");
      const alb = $(gb).find("span");
      const pq = alb[0];
      const fh = alb[1];
      const vc = $(alb[2]);
      const gg = ~~$(pq).attr("min");
      const kj = ~~$(pq).attr("max");
      const yy = ~~$(pq).attr("step");
      const xv = ~~$(pq).attr("value");
      if (1 === gw && xv + yy <= kj) {
        const aee = yy + xv;
        $(pq).attr("value", aee);
        $(fh).css("width", ~~((100 * (aee - gg)) / (kj - gg)) + "px");
        vc.text("[" + aee + "]");
        this.saveTheme(amc, ~~aee);
      } else {
        if (0 === gw && xv - yy >= gg) {
          const alj = xv - yy;
          $(pq).attr("value", alj);
          $(fh).css("width", ~~((100 * (alj - gg)) / (kj - gg)) + "px");
          vc.text("[" + alj + "]");
          this.saveTheme(amc, ~~alj);
        } else {
          if (2 === gw) {
            const alg = this[amc];
            $(pq).attr("value", alg);
            $(fh).css("width", ~~((100 * (alg - gg)) / (kj - gg)) + "px");
            vc.text("[" + alg + "]");
          } else {
            if (3 === gw) {
              let age = 0 | ((agd / 100) * (kj - gg));
              age = (0 | (age / yy)) * yy;
              const ud = (100 * ((age += gg) - gg)) / (kj - gg);
              $(pq).attr("value", age);
              $(fh).css("width", ~~ud + "px");
              vc.text("[" + age + "]");
              this.saveTheme(amc, ~~age);
            }
          }
        }
      }
    }
    static ["initColorpicker"](afu) {
      const iq = $(afu).find("input");
      const uz = iq.attr("id");
      const aky = this[uz];
      $(iq).val(aky);
      const ec = !!~~iq.attr("opacity");
      $("#" + uz).minicolors({
        opacity: ec,
        position: "bottom right",
        change: (mj) => {
          this.saveTheme(uz, mj);
        },
      });
    }
    static ["saveTheme"](aef, op) {
      this[aef] = op;
      if ("selectedPreset" === aef) {
        this.selectPreset(op);
      } else if ("custom" !== this.selectedPreset) {
        this.selectedPreset = "custom";
        Storage.set("theme", "selectedPreset", "custom");
        this.setDomValues();
      }
      if ("backgroundColor" === aef) {
        this.setBackground(op);
      }
      if ("chatFontSize" === aef) {
        this.setChatFontSize(op);
      }
      if ("lbSize" === aef) {
        this.setLeaderboard(op);
      }
      if ("minimapSize" === aef) {
        this.setMinimap(op);
      }
      if ("cursor" === aef) {
        this.setCursor(op);
      }
      if ("massFont" === aef) {
        TextRenderer.setMassCtxFont();
      }
      if ("nickFont" === aef) {
        TextRenderer.setNickCtxFont();
      }
      if ("massStrokeColor" === aef) {
        TextRenderer.massCaches.clear();
      }
      if ("nickStrokeColor" === aef) {
        TextRenderer.nickCaches.clear();
      }
      if ("massColor" === aef) {
        TextRenderer.massCaches.clear();
      }
      if ("nickColor" === aef) {
        TextRenderer.nickCaches.clear();
      }
      Storage.set("theme", aef, op);
    }
    static ["setBackground"](abb) {
      $("body").css("background", abb);
    }
    static ["setChatFontSize"](aku) {
      $("#notifications").css("font-size", aku + "px");
    }
    static ["setLeaderboard"](wz) {
      const abm = wz / 100;
      $("#leaderboard-head").css("font-size", (0 | (24 * abm)) + "px");
      $("#leaderboard-positions").css("font-size", (0 | (13 * abm)) + "px");
    }
    static ["setMinimap"](adm) {
      if (Minimap.initted) {
        Minimap.size = adm;
        Minimap.canvas.width = adm;
        Minimap.canvas.height = adm;
      }
      $("#minimap-hud, .minimap-grid").css({
        width: adm + "px",
        height: adm + "px",
      });
      $(".minimap-row").css({
        width: adm + "px",
        height: (0 | (adm / 5)) + "px",
      });
      $(".minimap-sector").css({
        width: (0 | (adm / 5)) + "px",
        height: (0 | (adm / 5)) + "px",
        "font-size": (0 | ((15 * adm) / 200)) + "px",
        "padding-top": (0 | ((11 * adm) / 200)) + "px",
      });
      const le = $(".minimap-head");
      le.css("bottom", adm + 30 + "px");
      // Stack on top of .minimap-head (which is itself already anchored
      // above #minimap-hud) - measuring its real height instead of
      // guessing keeps this correct regardless of minimap size/theme.
      $("#server-restart-countdown").css({
        bottom: adm + 30 + le.outerHeight() + 8 + "px",
        width: adm + "px",
      });
    }
    static ["setCursor"](alu) {}
    static ["selectPreset"](zo) {
      const afg = this.presets[zo];
      if ("custom" !== zo && afg) {
        for (const zs in afg.theme)
          if (afg.theme.hasOwnProperty(zs) && undefined !== this[zs]) {
            this[zs] = afg.theme[zs];
            Storage.set("theme", zs, this[zs]);
          }
        this.setDomValues();
        for (const nj in afg.settings)
          if (afg.settings.hasOwnProperty(nj) && undefined !== Settings[nj]) {
            Settings[nj] = afg.settings[nj];
            Storage.set("settings", nj, Settings[nj]);
          }
        Settings.setDomValues();
      }
    }
    static ["addPresets"]() {
      const dx = {
        skinBorder: 0x64,
        lbSize: 0x64,
        minimapSize: 0xc8,
        chatFontSize: 0xe,
        cellTransparency: 0x64,
        lightenCellColor: 0x64,
        borderWidth: 0x28,
        borderColor: "#fff",
        team1color: "#aeaeae",
        team2color: "#fff700",
        nickColor: "#fff",
        nickStrokeColor: "#000",
        cellNickSize: 0x78,
        nickFont: "ubuntu",
        massColor: "#fff",
        massStrokeColor: "#000",
        cellMassSize: 0xa0,
        massFont: "ubuntu",
        gridWidth: 0x28,
        gridColor: "#1a1a1a",
        gridTextColor: "#1a1a1a",
        gridTextSize: 0x4b0,
        gridTextFont: "ubuntu",
        foodSize: 0x1,
        foodColor: "#ffffff",
        virusColor: "#000",
        virusBorderColor: "#d4d6dd",
        virusBorderWidth: 0xe,
        commanderColor: "#0849d4",
        backgroundColor: "#000",
        indicatorSize: 0x64,
        cursor: 0x7,
      };
      const zm = {
        CellAnimation: 0xa0,
        eatAnimation: "on",
        cellTextAnimation: "on",
        cellMass: "shortened",
        food: "monoColored",
        bgSectors: "normal",
        vanillaGrid: "off",
      };
      const zr = {
        author: "Cyper",
        theme: dx,
        settings: zm,
      };
      const vv = {
        skinBorder: 0x64,
        lbSize: 0x6e,
        minimapSize: 0xc8,
        chatFontSize: 0x12,
        cellTransparency: 0x64,
        lightenCellColor: 0x64,
        borderWidth: 0x28,
        borderColor: "#ffffff",
        team1color: "#aeaeae",
        team2color: "#fff700",
        nickColor: "#fff",
        nickStrokeColor: "#000",
        cellNickSize: 0x8c,
        nickFont: "ubuntu",
        massColor: "#fff",
        massStrokeColor: "#000",
        cellMassSize: 0x8c,
        massFont: "ubuntu",
        gridWidth: 0x64,
        gridColor: "#1a1a1a",
        gridTextColor: "#1a1a1a",
        gridTextSize: 0x6a4,
        gridTextFont: "ubuntu",
        foodSize: 0x5,
        foodColor: "#0849d4",
        virusColor: "#808080",
        virusBorderColor: "#9e9e9e",
        virusBorderWidth: 0xa,
        commanderColor: "#0849d4",
        backgroundColor: "#000000",
        indicatorSize: 0x64,
        cursor: 0x1,
      };
      const pc = {
        CellAnimation: 0x78,
        eatAnimation: "on",
        cellTextAnimation: "on",
        cellMass: "full",
        food: "monoColored",
        bgSectors: "normal",
        vanillaGrid: "off",
      };
      const jw = {
        author: "Acydwarp",
        theme: vv,
        settings: pc,
      };
      const yw = {
        skinBorder: 0x64,
        lbSize: 0x6e,
        minimapSize: 0xc8,
        chatFontSize: 0x12,
        cellTransparency: 0x64,
        lightenCellColor: 0x64,
        borderWidth: 0x3c,
        borderColor: "#ffffff",
        team1color: "#aeaeae",
        team2color: "#fff700",
        nickColor: "#fff",
        nickStrokeColor: "#000",
        cellNickSize: 0x82,
        nickFont: "sans-serif",
        massColor: "#fff",
        massStrokeColor: "#000",
        cellMassSize: 0x82,
        massFont: "sans-serif",
        gridWidth: 0x64,
        gridColor: "#1a1a1a",
        gridTextColor: "#1a1a1a",
        gridTextSize: 0x6a4,
        gridTextFont: "ubuntu",
        foodSize: 0x5,
        foodColor: "#6111ff",
        virusColor: "#808080",
        virusBorderColor: "#9e9e9e",
        virusBorderWidth: 0xa,
        commanderColor: "#0849d4",
        backgroundColor: "#000000",
        indicatorSize: 0x64,
        cursor: 0x1,
      };
      const yu = {
        CellAnimation: 0x78,
        eatAnimation: "on",
        cellTextAnimation: "off",
        cellMass: "full",
        food: "monoColored",
        bgSectors: "off",
        vanillaGrid: "off",
      };
      const adn = {
        author: "Num Jai",
        theme: yw,
        settings: yu,
      };
      const mt = {
        skinBorder: 0x64,
        lbSize: 0x64,
        minimapSize: 0xf0,
        chatFontSize: 0x12,
        cellTransparency: 0x64,
        lightenCellColor: 0x5a,
        borderWidth: 0x28,
        borderColor: "#01d9cc",
        team1color: "#aeaeae",
        team2color: "#fff700",
        nickColor: "#fff",
        nickStrokeColor: "#000",
        cellNickSize: 0x78,
        nickFont: "ubuntu",
        massColor: "#fff",
        massStrokeColor: "#000",
        cellMassSize: 0xa0,
        massFont: "ubuntu",
        gridWidth: 0x28,
        gridColor: "#00243e",
        gridTextColor: "#00243e",
        gridTextSize: 0x4b0,
        gridTextFont: "ubuntu",
        foodSize: 0x5,
        foodColor: "#5000ff",
        virusColor: "#002f52",
        virusBorderColor: "#00b9e8",
        virusBorderWidth: 0xe,
        commanderColor: "#0849d4",
        backgroundColor: "#000a11",
        indicatorSize: 0x64,
        cursor: 0x1,
      };
      const ajf = {
        CellAnimation: 0x8c,
        eatAnimation: "on",
        cellTextAnimation: "on",
        cellMass: "shortened",
        food: "monoColored",
        bgSectors: "normal",
        vanillaGrid: "off",
      };
      const ahj = {
        author: "Szymy",
        theme: mt,
        settings: ajf,
      };
      const qp = {
        skinBorder: 0x64,
        lbSize: 0x82,
        minimapSize: 0xc8,
        chatFontSize: 0x12,
        cellTransparency: 0x64,
        lightenCellColor: 0x64,
        borderWidth: 0xa,
        borderColor: "#116111",
        team1color: "#aeaeae",
        team2color: "#fff700",
        nickColor: "#fff",
        nickStrokeColor: "#000",
        cellNickSize: 0x64,
        nickFont: "ubuntu",
        massColor: "#fff",
        massStrokeColor: "#000",
        cellMassSize: 0x64,
        massFont: "ubuntu",
        gridWidth: 0xa,
        gridColor: "#333333",
        gridTextColor: "#333333",
        gridTextSize: 0x6a4,
        gridTextFont: "ubuntu",
        foodSize: 0x1,
        foodColor: "#555",
        virusColor: "#6fff00",
        virusBorderColor: "#55b304",
        virusBorderWidth: 0xe,
        commanderColor: "#00fff7",
        backgroundColor: "#000000",
        indicatorSize: 0x64,
        cursor: 0x1,
      };
      const akp = {
        CellAnimation: 0x78,
        eatAnimation: "on",
        cellTextAnimation: "on",
        cellMass: "full",
        food: "rainbow",
        bgSectors: "normal",
        vanillaGrid: "off",
      };
      const aly = {
        author: "DaChong",
        theme: qp,
        settings: akp,
      };
      const ahl = {
        skinBorder: 0x64,
        lbSize: 0x64,
        minimapSize: 0xc8,
        chatFontSize: 0x12,
        cellTransparency: 0x64,
        lightenCellColor: 0x64,
        borderWidth: 0xa,
        borderColor: "#333333",
        team1color: "#aeaeae",
        team2color: "#fff700",
        nickColor: "#fff",
        nickStrokeColor: "#000",
        cellNickSize: 0x6e,
        nickFont: "ubuntu",
        massColor: "#fff",
        massStrokeColor: "#000",
        cellMassSize: 0x6e,
        massFont: "ubuntu",
        gridWidth: 0xa,
        gridColor: "#333333",
        gridTextColor: "#444444",
        gridTextSize: 0x4b0,
        gridTextFont: "ubuntu",
        foodSize: 0x1,
        foodColor: "#4b6efa",
        virusColor: "#6fff00",
        virusBorderColor: "#55b304",
        virusBorderWidth: 0xe,
        commanderColor: "#00fff7",
        backgroundColor: "#111",
        indicatorSize: 0x64,
        cursor: 0x1,
      };
      const aet = {
        CellAnimation: 0x78,
        eatAnimation: "on",
        cellTextAnimation: "stepped",
        cellMass: "shortened",
        food: "monoColored",
        bgSectors: "normal",
        vanillaGrid: "off",
      };
      const aad = {
        author: "KSCC",
        theme: ahl,
        settings: aet,
      };
      const eg = {
        skinBorder: 0x64,
        lbSize: 0x64,
        minimapSize: 0xc8,
        chatFontSize: 0xe,
        cellTransparency: 0x64,
        lightenCellColor: 0x64,
        borderWidth: 0x14,
        borderColor: "#666666",
        team1color: "#aeaeae",
        team2color: "#fff700",
        nickColor: "#fff",
        nickStrokeColor: "#000",
        cellNickSize: 0x6e,
        nickFont: "ubuntu",
        massColor: "#fff",
        massStrokeColor: "#444",
        cellMassSize: 0x8c,
        massFont: "oswald",
        gridWidth: 0x64,
        gridColor: "#222222",
        gridTextColor: "#222222",
        gridTextSize: 0x578,
        gridTextFont: "sans-serif",
        foodSize: 0x1,
        foodColor: "#c9d3f5",
        virusColor: "#e0e0e0",
        virusBorderColor: "#9c9c9c",
        virusBorderWidth: 0xa,
        commanderColor: "#ffffff",
        backgroundColor: "#000000",
        indicatorSize: 0x64,
        cursor: 0x1,
      };
      const ahv = {
        CellAnimation: 0x78,
        eatAnimation: "on",
        cellTextAnimation: "on",
        cellMass: "full",
        food: "monoColored",
        bgSectors: "normal",
        vanillaGrid: "off",
      };
      const ad = {
        author: "Eric",
        theme: eg,
        settings: ahv,
      };
      const qe = {
        skinBorder: 0x5a,
        lbSize: 0x64,
        minimapSize: 0xb4,
        chatFontSize: 0xe,
        cellTransparency: 0x64,
        lightenCellColor: 0x64,
        borderWidth: 0x28,
        borderColor: "#f5d25f",
        team1color: "#aeaeae",
        team2color: "#ff006f",
        nickColor: "#fff",
        nickStrokeColor: "#000000",
        cellNickSize: 0x6e,
        nickFont: "ubuntu",
        massColor: "#fff",
        massStrokeColor: "#000000",
        cellMassSize: 0x78,
        massFont: "ubuntu",
        gridWidth: 0xa,
        gridColor: "#fa676c",
        gridTextColor: "#333333",
        gridTextSize: 0x514,
        gridTextFont: "oswald",
        foodSize: 0x1,
        foodColor: "#555555",
        virusColor: "#7a4ba3",
        virusBorderColor: "#ead2fa",
        virusBorderWidth: 0xe,
        commanderColor: "#ff006f",
        backgroundColor: "#222222",
        indicatorSize: 0x64,
        cursor: 0x1,
      };
      const oh = {
        CellAnimation: 0x8c,
        eatAnimation: "on",
        cellTextAnimation: "on",
        cellMass: "shortened",
        food: "monoColored",
        bgSectors: "normal",
        vanillaGrid: "off",
      };
      const aiw = {
        author: "2coolife",
        theme: qe,
        settings: oh,
      };
      const fw = {
        Multibox: zr,
        "Agarplus v2": jw,
        HKG: adn,
        "Ogario v4": ahj,
        Yin: aly,
        VNDOT: aad,
        OZYDOT: ad,
        Pastels: aiw,
      };
      this.presets = fw;
    }
  }
  class Notifications {
    static ["init"]() {
      this.div = $("#notifications");
      this.duration = 10000;
      this.animDuration = 500;
      this.iconChat = '<i class="fa fa-comment"></i>';
      this.iconAlert = '<i class="fa fa-exclamation-circle"></i>';
      this.iconBell = '<i class="fa fa-bell"></i>';
      this.warningIcon = '<i class="fa-solid fa-triangle-exclamation"></i>';
      this.chatroomdiv = $("#chatroom");
      this.emojiPath = "./";
      this.emojis = {};
      this.displayEmojis();
    }
    static ["displayEmojis"]() {
      const ea = $("#emojiContainer");
      for (const lz in this.emojis) {
        const lu = $('<img src="' + (this.emojiPath + this.emojis[lz]) + '" class="emojiPreview">');
        lu.click(() => {
          const abq = $("#message");
          const ga = abq.val();
          abq.val(ga + " " + lz);
          ChatInput.input.focus();
        });
        ea.append(lu);
      }
    }
    static ["normal"](gz, ady, xo = "system") {
      this.chatroom(gz, ady, this.iconChat, xo);
      if ("chatroom" !== Settings.chatType) {
        const zv =
          '<div><div class="normal">' +
          this.iconChat +
          '<span class="nick">' +
          gz +
          '</span><span class="message">' +
          this.putEmojis(this.cleanMessage(ady)) +
          "</span></div></div>";
        this.append(zv);
      }
    }
    static ["command"](ahm, rq, xo = "system") {
      this.chatroom(ahm, rq, this.iconAlert, xo);
      if ("chatroom" !== Settings.chatType) {
        const ajm =
          '<div><div class="command">' +
          this.iconAlert +
          '<span class="nick">' +
          ahm +
          '</span><span class="message">' +
          this.cleanMessage(rq) +
          "</span></div></div>";
        this.append(ajm);
      }
    }
    static ["warn"](cy, an, xo = "system") {
      this.chatroom(cy, an, this.warningIcon, xo);
      if ("chatroom" !== Settings.chatType) {
        const nd =
          '<div><div class="alert">' +
          this.warningIcon +
          '<span class="nick">' +
          cy +
          '</span><span class="message">' +
          this.cleanMessage(an) +
          "</span></div></div>";
        this.append(nd);
      }
    }
    static ["alert"](tr, kx, xo = "system") {
      const fi = this.chatroom(tr, kx, this.iconBell, xo);
      if ("chatroom" !== Settings.chatType) {
        const br =
          '<div><div class="alert" style="direction: ltr;">' +
          this.iconBell +
          '<span class="nick">' +
          tr +
          '</span><span class="message">' +
          this.cleanMessage(kx) +
          "</span></div></div>";
        this.append(br);
      }
      return fi;
    }
    static ["gameChat"](dg, zf, ais, mt) {
      // Build up a nick->id memory from every attributed message we see -
      // the invite notification itself often arrives as a system-style
      // message (id1 <= 0, not attributed to the inviter), and the inviter
      // is frequently not a currently-visible nearby cell either, so this
      // is the only reliable way to later resolve who to reply to.
      PartyManager.rememberNick(dg, ais);
      if (PartyManager.isInviteMessage(zf) && !PartyManager.isOwnInviteEcho(zf)) {
        this.partyInvite(dg, zf, ais);
        return;
      }
      const akh = this.alert(dg, zf, "game");
      if (akh) {
        // Render the sender's real color, a crown for VIPs, and gray for
        // muted senders - the same fields the real client uses. mt comes
        // from handleChat's packet parse (opcode 86).
        const nickEl = akh.find(".nick");
        if (mt && nickEl.length) {
          if (mt.muted) {
            nickEl.css("color", "#7f7f7f");
          } else if (mt.vip) {
            nickEl.prepend("👑 ");
          }
          if ("number" === typeof mt.r) {
            nickEl.css("color", "#" + [mt.r, mt.g, mt.b].map((c) => ("0" + c.toString(16)).slice(-2)).join(""));
          }
        }
      }
      if (0 < ais && akh) {
        akh.find(".nick").on("contextmenu", (ahp) => {
          ahp.preventDefault();
          PartyManager.openMenu({ ownerId: ais, nick: dg, colorHex: "#fff" }, ahp.pageX, ahp.pageY);
        });
      }
    }
    static ["partyInvite"](dg, zf, ais) {
      // Confirmed format: message is literally `"<nick>" has invited you to
      // their party.` (with an embedded partyCode(...) button - see
      // extractPartyCode()) and the packet's own nick field is just the
      // generic system sender label ("Console"), not the real inviter -
      // the real name only ever shows up quoted inside the message text.
      const aie = PartyManager.extractPartyCode(zf);
      let aka = null;
      // Grab the first quoted substring from the VISIBLE text only - the
      // message also embeds an onclick="partyCode('...')" button (itself
      // double-quoted), which would otherwise be picked up instead of the
      // name whenever the button markup comes before the name in the
      // string. Stripping tags first (replaced with a space, so words
      // either side don't get glued together) avoids that entirely.
      const th = zf.replace(/<[^>]*>/g, " ");
      const ajh = th.match(/"([^"]+)"/);
      if (ajh) {
        aka = PartyManager.stripBidi(ajh[1]);
      } else if (dg && "Console" !== dg) {
        aka = dg;
      } else {
        const afm = th.match(/([^\s:"]+)\s+(?:has\s+)?invit/i);
        if (afm) {
          aka = afm[1];
        }
      }
      let mh = ais;
      if (0 >= mh && aka) {
        mh = PartyManager.resolveIdByNick(aka);
      }
      const ll = new Date();
      const sq = ll.getHours() + ":" + ll.getMinutes();
      const ajp = $(
        '<div class="chatroom-row party-invite-row" data-channel="game"><span class="chattime">' +
          sq +
          "</span> " +
          this.iconBell +
          ' <span class="nick">' +
          this.cleanMessage(aka || "Someone") +
          '</span> <span class="message">invited you to their party</span> ' +
          '<button class="party-invite-accept">Accept</button>' +
          '<button class="party-invite-reject">Reject</button>' +
          "</div>",
      );
      ajp.find(".party-invite-accept").click(() => {
        PartyManager.acceptInvite(aie, mh);
        ajp.remove();
      });
      ajp.find(".party-invite-reject").click(() => {
        ajp.remove();
      });
      this.chatroomdiv.append(ajp);
      this.chatroomdiv.scrollTop(this.chatroomdiv[0].scrollHeight);
    }
    static ["append"](jf) {
      const td = $(jf);
      td.slideUp(0);
      td.appendTo(this.div);
      td.slideDown(this.animDuration);
      setTimeout(() => {
        td.slideUp(this.animDuration, () => {
          td.remove();
        });
      }, this.duration);
    }
    static ["cleanMessage"](uh) {
      return uh;
    }
    static ["putEmojis"](aay) {
      for (const si in this.emojis) {
        const ft = new RegExp(si, "g");
        aay = aay.replace(ft, '<img src="' + (this.emojiPath + this.emojis[si]) + '">');
      }
      return aay;
    }
    static ["chatroom"](adw, so, agi, xo = "system") {
      const aki = new Date();
      const tl = aki.getHours() + ":" + aki.getMinutes();
      const aap = $(
        '<div class="chatroom-row" data-channel="' +
          xo +
          '"><span class="chattime">' +
          tl +
          "</span> " +
          agi +
          ' <span class="nick">' +
          adw +
          '</span> <span class="message">' +
          this.putEmojis(this.cleanMessage(so)) +
          "</span></div>",
      );
      this.chatroomdiv.append(aap);
      this.chatroomdiv.scrollTop(this.chatroomdiv[0].scrollHeight);
      return aap;
    }
  }
  class Leaderboard {
    static ["init"]() {
      this.list = new Set();
      this.div = $("#leaderboard-positions")[0];
      this.teamLB = $("#leaderboard-chart");
      this.teamLBvisible = false;
      this.barsCss = document.createElement("style");
      document.head.append(this.barsCss);
    }
    static ["add"](bp, vu, ca, fp, ahf, rv) {
      const gs = {
        nick: bp,
        position: vu,
        isSelf: ca,
        account: ahf,
        isFriend: fp,
        // The real leaderboard packet (handleLeaderboardFFA in 3rb.js,
        // verified by decoding it directly) never sends a score - only
        // rank/id/name, and the native UI template it renders
        // ("%rank%"/"%name%" only) confirms the game itself never shows
        // one either. "id" here is that same field, confirmed (via
        // `game.pID == entry.id` in 3rb.js's own leaderboard renderer) to
        // be the same id-space as cell ownerId/pID used everywhere else
        // in the protocol - see scoreForId() below, which cross-references
        // it against currently-tracked cells to approximate a real score
        // rather than inventing one. Undefined for the non-FFA leaderboard
        // variant (getLeaderboard() in PacketParser), which carries no id at
        // all - there's nothing to cross-reference for those entries.
        id: rv,
      };
      this.list.add(gs);
    }
    // Sums the static (non-animated, i.e. authoritative-as-of-last-packet)
    // mass of every currently-tracked cell owned by this id. Only accurate
    // for players whose cells are actually within render/network range
    // right now - same limitation the real client has, since neither of us
    // is ever told anything about cells we can't see. Returns undefined
    // (render nothing, not "0") when no matching cells are tracked at all.
    static ["scoreForId"](agq) {
      let aif = 0;
      let aiz = false;
      for (const ajc of CellData.sortedCells) {
        if (ajc.ownerId === agq) {
          aiz = true;
          aif += ajc.staticMass;
        }
      }
      return aiz ? aif : undefined;
    }
    // Same truncate-to-1-decimal "shortened mass" convention already used
    // for in-world cell mass labels (see Renderer around cellMass
    // "shortened"), extended with an "m" tier since a total leaderboard
    // score can run well past what a single cell's mass ever reaches.
    static ["formatScore"](zf) {
      return 999999 < zf
        ? (0 | (zf / 100000)) / 10 + "m"
        : 999 < zf
          ? (0 | (zf / 100)) / 10 + "k"
          : "" + zf;
    }
    static ["team"](di, hx, aip) {
      if (!this.teamLBvisible) {
        this.teamLB.show();
        this.div.innerHTML = "";
        this.teamLBvisible = true;
      }
      this.barsCss.innerText =
        ".chart-bar.red { width: " +
        (0 | (150 * di)) +
        "px } .chart-bar.green { width: " +
        (0 | (150 * hx)) +
        "px } .chart-bar.blue { width: " +
        (0 | (150 * aip)) +
        "px }";
    }
    static ["clear"]() {
      this.list.clear();
    }
    static ["update"]() {
      if (this.teamLBvisible) {
        this.teamLB.hide();
        this.teamLBvisible = false;
      }
      let ir = "";
      for (const ach of this.list.values()) {
        const lk = undefined !== ach.id ? this.scoreForId(ach.id) : undefined;
        const xu = undefined !== lk ? ' <span class="leaderboard-score">(' + this.formatScore(lk) + ")</span>" : "";
        const name = this.cleanNick(ach.nick).replace(/&/g, "&amp;");
        ir += '<div class="mo-lb-row' + (ach.isSelf ? ' is-self' : '') + '">' +
          '<span class="mo-lb-rank">' + Number(ach.position) + '</span>' +
          '<span class="mo-lb-name" dir="auto">' + name + '</span>' + xu + '</div>';
      }
      this.div.innerHTML = ir;
    }
    static ["cleanNick"](ia) {
      return ia.replace(/</g, "(").replace(/>/g, ")").substring(0, 15);
    }
  }
  class Minimap {
    static ["init"]() {
      this.initted = true;
      this.canvas = $("#minimap-nodes")[0];
      this.size = Theme.minimapSize;
      this.canvas.width = this.size;
      this.canvas.height = this.size;
      this.pi2 = 2 * Math.PI;
      this.ctx = this.canvas.getContext("2d");
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "bottom";
      this.ctx.font = "500 12px ubuntu";
      this.ctx.lineWidth = 2;
      this.selector = 0;
    }
    static ["run"]() {
      const wk = this.ctx;
      const av = this.size / WorldData.edge;
      const sx = Camera.viewBounds;
      wk.clearRect(0, 0, this.size, this.size);
      wk.fillStyle = "rgba(180, 57, 69, 0.4)";
      wk.fillRect(
        0 | ((sx.left - WorldData.offset.x + 8000) * av),
        0 | ((sx.top - WorldData.offset.y + 8000) * av),
        0 | ((sx.right - sx.left) * av),
        0 | ((sx.bottom - sx.top) * av),
      );
      if (RelayData.biggestIsOn && (Player.isAlive || !Camera.isSpectating || Camera.freeSpectate)) {
        RelayData.biggest.animate();
        const j = RelayData.biggest.mapX;
        const jr = RelayData.biggest.mapY;
        wk.beginPath();
        wk.arc(j, jr, 7, 0, this.pi2, false);
        wk.closePath();
        wk.fillStyle = "#fff";
        wk.fill();
        wk.stroke();
        wk.fillText(Language.current.huds.num1position || "#1 position", j, jr - 8);
      }
      wk.strokeStyle = "#666";
      const aca = (8000 - WorldData.offset.x + Player.deathLocation.x) * av;
      const nz = (8000 - WorldData.offset.y + Player.deathLocation.y) * av;
      wk.beginPath();
      wk.moveTo(aca - 4, nz - 4);
      wk.lineTo(aca + 4, nz + 4);
      wk.moveTo(aca - 4, nz + 4);
      wk.lineTo(aca + 4, nz - 4);
      wk.closePath();
      wk.stroke();
      wk.strokeStyle = "rgba(51, 51, 51, 0.5)";
      const rg = (8000 - WorldData.offset.x + Camera.x) * av;
      const cs = (8000 - WorldData.offset.y + Camera.y) * av;
      const ja = Player.isAlive ? 4 : 7;
      wk.beginPath();
      wk.arc(rg, cs, ja, 0, this.pi2, false);
      wk.closePath();
      wk.fillStyle = "#fff";
      wk.fill();
      wk.stroke();
      if (RelayData.isSpectator) {
        this.teamMinimap();
      } else {
        this.normalMinimap();
      }
    }
    static ["teamMinimap"]() {
      const agv = this.ctx;
      agv.textAlign = "center";
      agv.textBaseline = "bottom";
      for (const te of RelayData.teamPlayers.values())
        if (te.isAlive && (!this.selector || this.selector === te.team) && !PartyManager.hasNick(te.nick)) {
          te.animate();
          const ql = te.mapX;
          const aen = te.mapY;
          agv.beginPath();
          agv.arc(ql, aen, 5, 0, this.pi2, false);
          agv.closePath();
          agv.fillStyle = "#fff";
          if (0 < te.nick.length) {
            agv.fillText(te.nick, ql, aen - 6);
          }
          agv.fillStyle = 1 === te.team ? Theme.team1color : Theme.team2color;
          agv.fill();
          agv.stroke();
        }
      this.partyMinimap();
    }
    static ["normalMinimap"]() {
      const t = this.ctx;
      t.textAlign = "center";
      t.textBaseline = "bottom";
      t.beginPath();
      for (const wr of RelayData.teamPlayers.values())
        if (wr.isAlive && !PartyManager.hasNick(wr.nick)) {
          wr.animate();
          const bh = wr.mapX;
          const q = wr.mapY;
          t.moveTo(bh + 5, q);
          t.arc(bh, q, 5, 0, this.pi2, false);
          if (0 < wr.nick.length) {
            t.fillText(wr.nick, bh, q - 6);
          }
        }
      t.closePath();
      t.fillStyle = "#555";
      t.fill();
      this.partyMinimap();
    }
    static ["partyMinimap"]() {
      // Native party members (see PartyManager) are drawn separately from
      // teamPlayers because each one keeps its own real in-game color
      // (sent by the server), unlike the team1/team2-color multibox dots
      // above - they can't share a single batched fill() call.
      const ki = this.ctx;
      ki.textAlign = "center";
      ki.textBaseline = "bottom";
      for (const agq of PartyManager.members.values()) {
        agq.animate();
        const ajk = agq.mapX;
        const lk = agq.mapY;
        ki.beginPath();
        ki.arc(ajk, lk, 5, 0, this.pi2, false);
        ki.closePath();
        ki.fillStyle = "#fff";
        if (0 < agq.nick.length) {
          ki.fillText(agq.nick, ajk, lk - 6);
        }
        ki.fillStyle = agq.colorHex;
        ki.fill();
        ki.stroke();
      }
    }
  }
  class TeamList {
    static ["init"]() {
      this.lastUpdateTime = 0;
      this.totalmass = 0;
      this.alive = 0;
      this.spectate = 0;
      this.html = "";
      this.temporaryArray = [];
      this.div = {
        positions: $("#teamlist-positions")[0],
        alive: $("#teamlist-alive span")[0],
        spectate: $("#teamlist-spectate span")[0],
        totalmass: $("#teamlist-totalmass span")[0],
      };
      this.divTeam1 = {
        alive: $("#teamlist-alive1 span")[0],
        spectate: $("#teamlist-spectate1 span")[0],
        totalmass: $("#teamlist-totalmass1 span")[0],
      };
      this.divTeam2 = {
        alive: $("#teamlist-alive2 span")[0],
        spectate: $("#teamlist-spectate2 span")[0],
        totalmass: $("#teamlist-totalmass2 span")[0],
      };
      this.teamVsBar = $(".team-vs-bar-inner");
      this.teamVsBarStyle = document.getElementsByClassName("team-vs-bar")[0].style;
      this.teamVsBarInnerStyle = document.getElementsByClassName("team-vs-bar-inner")[0].style;
    }
    static ["update"]() {
      if (1000 < GameLoop.time - this.lastUpdateTime) {
        this.lastUpdateTime = GameLoop.time;
        if (RelayData.isSpectator) {
          this.updateVs();
        }
        this.generateList();
        this.div.positions.innerHTML = this.html;
        this.div.alive.innerHTML = this.alive;
        this.div.spectate.innerHTML = this.spectate;
        this.div.totalmass.innerHTML = this.totalmass;
        this.reset();
      }
    }
    static ["generateList"]() {
      RelayData.teamPlayers.forEach((bf) => {
        if (PartyManager.hasNick(bf.nick)) {
          return;
        }
        if (bf.isAlive) {
          this.totalmass += bf.mass;
          this.temporaryArray.push(bf);
          this.alive++;
        } else {
          this.spectate++;
        }
      });
      PartyManager.members.forEach((qu) => {
        if (qu.isAlive) {
          this.totalmass += qu.mass;
          this.temporaryArray.push(qu);
          this.alive++;
        } else {
          this.spectate++;
        }
      });
      this.temporaryArray.sort((abj, aaz) => aaz.mass - abj.mass);
      this.temporaryArray.splice(5);
      if (!RelayData.isSpectator) {
        if (Player.isAlive) {
          this.totalmass += Player.mass;
          this.temporaryArray.push(Player);
          this.alive++;
        } else {
          this.spectate++;
        }
      }
      for (let fm = 0; fm < this.temporaryArray.length; fm++) {
        const agx = this.temporaryArray[fm];
        this.addPlayer(agx);
      }
    }
    static ["addPlayer"](za) {
      const ic = (100 * za.mass) / this.totalmass;
      this.html +=
        '<div class="tl-player"><div class="tl-player-mass">' +
        za.mass +
        '</div><div class="tl-player-nick">' +
        this.cleanNick(za.nick) +
        '</div><div class="tl-player-massbar"><div class="tl-player-massbar-inner" style="width: ' +
        (0 | ic) +
        '%;"></div></div></div>';
    }
    static ["updateVs"]() {
      const as = RelayData.teamData;
      let ih = (as[1].totalMass / (as[1].totalMass + as[2].totalMass)) * 100;
      if (0 === as[1].totalMass && 0 === as[2].totalMass) {
        ih = 50;
      }
      this.teamVsBar.css("width", (0 | ih) + "%");
      this.divTeam1.alive.innerHTML = as[1].alive;
      this.divTeam1.spectate.innerHTML = as[1].spectate;
      this.divTeam1.totalmass.innerHTML = as[1].totalMass;
      this.divTeam2.alive.innerHTML = as[2].alive;
      this.divTeam2.spectate.innerHTML = as[2].spectate;
      this.divTeam2.totalmass.innerHTML = as[2].totalMass;
      this.teamVsBarStyle.background = Theme.team2color;
      this.teamVsBarInnerStyle.background = Theme.team1color;
    }
    static ["reset"]() {
      this.totalmass = 0;
      this.alive = 0;
      this.spectate = 0;
      this.temporaryArray = [];
      this.html = "";
    }
    static ["cleanNick"](lr) {
      return lr.replace(/</g, "(").replace(/>/g, ")");
    }
  }
  class ChatInput {
    static ["init"]() {
      this.container = $("#message-hud");
      this.input = $("#message");
      this.isOpened = false;
      this.isFocused = false;
      this.input.blur(() => {
        this.isFocused = false;
      });
      this.input.focus(() => {
        this.isFocused = true;
      });
      // Shift+Enter sends while typing instead of the plain-Enter chatKey
      // binding. stopPropagation() is required, not optional: Actions.getKey()
      // never checks shiftKey, so plain Enter and Shift+Enter both produce
      // the exact same "ENTER" string - which is this game's default
      // chatKey binding. Without stopping it here, this same keydown would
      // also bubble up to that global document-level hotkey handler right
      // after send() has already closed the box, and re-open it again.
      this.input.keydown((me) => {
        const ta = me.keyCode || me.which;
        if (me.shiftKey && 13 === ta) {
          me.preventDefault();
          me.stopPropagation();
          this.enter();
        }
      });
      this.chatroom = $("#chatroom");
      this.chatroom.perfectScrollbar();
    }
    static ["open"]() {
      this.container.show();
      this.isOpened = true;
      this.input.focus();
    }
    static ["enter"]() {
      if (this.isOpened) {
        if (this.isFocused) {
          if (!Account.loggedIn) {
            this.input.val("");
            this.input.blur();
            this.container.hide();
            this.isOpened = false;
            Notifications.warn("Chat", "You must be registered and at least level 5 to use the chat");
            return;
          }
          let afp = this.input.val();
          if (0 < afp.length && 100 < afp.length) {
            afp = afp.substring(0, 100);
          }
          if (0 < afp.length) {
            PacketSender.chat(afp);
          }
          this.input.val("");
          this.input.blur();
          this.container.hide();
          this.isOpened = false;
        } else {
          this.input.focus();
        }
      } else {
        this.open();
      }
    }
  }
  class Stats {
    static ["init"]() {
      this.fpsCount = 0;
      this.lastUpdateTime = 0;
      this.div = $("#stats-hud")[0];
      this.lockClosed = '<i class="fa fa-lock"></i>';
      this.lockOpened = '<i class="fa fa-unlock-alt"></i>';
      this.speedometer = '<i class="fa fa-tachometer"></i>';
      this.iconPause = '<i class="fa fa-pause-circle"></i>';
    }
    static ["update"]() {
      this.fpsCount++;
      if (1000 < GameLoop.time - this.lastUpdateTime) {
        this.lastUpdateTime = GameLoop.time;
        this.refresh();
      }
    }
    static ["refresh"]() {
      let afs = "";
      afs += this.fps;
      if (Player.isAlive) {
        afs += this.score + this.n64 + this.STE + this.speed;
      }
      afs += this.PIO + this.paused + this.zoomLock;
      this.div.innerHTML = afs;
    }
    static get ["zoomLock"]() {
      return "on" === Settings.autoZoom ? this.lockClosed : this.lockOpened;
    }
    static get ["score"]() {
      return (Language.current.huds.score || "Score") + ": " + Player.score + "   ";
    }
    static get ["n64"]() {
      return "[" + Player.pieceCount + "/64] ";
    }
    static get ["STE"]() {
      const ji = Player.biggestPieceMass;
      return 35 < ji ? "STE: " + (0 | (ji * (1000 > ji ? 0.35 : 0.38))) + "   " : "";
    }
    static get ["speed"]() {
      Player.animSpeed += (Player.speed - Player.animSpeed) / 3;
      Player.speed = 0;
      return this.speedometer + " " + (0 | Player.animSpeed) + "px/s   ";
    }
    static get ["PIO"]() {
      const yp = WsConnection.packetCount["in"];
      const adt = WsConnection.packetCount.out;
      WsConnection.packetCount["in"] = 0;
      WsConnection.packetCount.out = 0;
      return "PIO: " + yp + "|" + adt + " ";
    }
    static get ["paused"]() {
      return Player.movementPaused ? "[" + this.iconPause + " " + (Language.current.huds.paused || "Paused") + "]   " : "";
    }
    static get ["fps"]() {
      const kc = this.fpsCount;
      this.fpsCount = 0;
      return "FPS: " + kc + "   ";
    }
  }
  class TargetingHud {
    static ["init"]() {
      this.container = $("#targeting-hud");
      this.DIVno1viewport = $("#targeting-no-1");
      this.DIVmouse = $("#targeting-mouse");
      this.DIVplayers = $("#targeting-players");
      this.DIVtotalMass = $("#targeting-playersMass span.mass")[0];
      this.DIVplayer1 = {
        nick: $("#targeting-player1 span.nick")[0],
        mass: $("#targeting-player1 span.mass")[0],
      };
      this.DIVplayer2 = {
        nick: $("#targeting-player2 span.nick")[0],
        mass: $("#targeting-player2 span.mass")[0],
      };
      this.lastTime = GameLoop.time;
    }
    static ["update"]() {
      if (!(1000 > GameLoop.time - this.lastTime) && ((this.lastTime = GameLoop.time), Camera.freeSpectate && Targeting.isTurnedOn)) {
        let qi = 0;
        if (Targeting.target1.turnedOn) {
          this.DIVplayer1.nick.innerHTML = Targeting.target1.nick;
          this.DIVplayer1.mass.innerHTML = Targeting.target1.outOfView ? "OUT OF VIEW" : Targeting.target1.mass;
          qi += Targeting.target1.outOfView ? 0 : Targeting.target1.mass;
        } else {
          this.DIVplayer1.nick.innerHTML = "Target 1";
          this.DIVplayer1.mass.innerHTML = "NOT SELECTED";
        }
        if (Targeting.target2.turnedOn) {
          this.DIVplayer2.nick.innerHTML = Targeting.target2.nick;
          this.DIVplayer2.mass.innerHTML = Targeting.target2.outOfView ? "OUT OF VIEW" : Targeting.target2.mass;
          qi += Targeting.target2.outOfView ? 0 : Targeting.target2.mass;
        } else {
          this.DIVplayer2.nick.innerHTML = "Target 2";
          this.DIVplayer2.mass.innerHTML = "NOT SELECTED";
        }
        this.DIVtotalMass.innerHTML = qi;
      }
    }
    static ["show"]() {
      this.container.show();
    }
    static ["hide"]() {
      this.container.hide();
    }
    static ["topViewport"]() {
      this.DIVno1viewport.show();
      this.DIVmouse.hide();
      this.DIVplayers.hide();
      $("#spectate-mode-top").addClass("active");
      $("#spectate-mode-mouse").removeClass("active");
      $("#spectate-mode-target").removeClass("active");
    }
    static ["mouseViewport"]() {
      this.DIVmouse.show();
      this.DIVno1viewport.hide();
      this.DIVplayers.hide();
      $("#spectate-mode-top").removeClass("active");
      $("#spectate-mode-mouse").addClass("active");
      $("#spectate-mode-target").removeClass("active");
    }
    static ["targetMode"]() {
      this.DIVplayers.show();
      this.DIVmouse.hide();
      this.DIVno1viewport.hide();
      $("#spectate-mode-top").removeClass("active");
      $("#spectate-mode-mouse").removeClass("active");
      $("#spectate-mode-target").addClass("active");
    }
  }
  class MoDiagnostics {
    static note(stage, detail = "") {
      this.events = this.events || [];
      this.events.push(new Date().toLocaleTimeString() + " " + stage + (detail ? ": " + detail : ""));
      if (this.events.length > 24) this.events.shift();
    }
    static packet(slot, direction, plain, wire = plain) {
      // Only lengths and protocol bytes are retained. Never retain packet bodies.
      const view = value => ArrayBuffer.isView(value)
        ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
        : new Uint8Array(value);
      const input = view(plain), output = view(wire);
      const label = direction === "out" ? ({255:"login",123:"verification/control",100:"ping",0:"spawn",16:"movement"}[input[0]] || "control") : "server";
      this.packetTrace = this.packetTrace || {};
      const trace = this.packetTrace[slot] = this.packetTrace[slot] || [];
      trace.push(direction + " " + label + ": opcode=" + (input.length ? input[0] : "empty") + ", plain=" + input.byteLength + "B, wire=" + output.byteLength + "B, envelope=" + (output.length ? output[0] : "empty"));
      if (trace.length > 12) trace.shift();
    }
    static packetClose(slot, code) {
      this.closedPackets = this.closedPackets || {};
      this.closedPackets[slot] = {code:Number(code || 0), trace:[...((this.packetTrace && this.packetTrace[slot]) || [])]};
      if (this.packetTrace) this.packetTrace[slot] = [];
    }
    static closeReason(reason) {
      const text = String(reason || "").toLowerCase();
      if (!text) return "No close reason provided";
      if (/too (?:big|large|long)|size|length|oversiz|payload/.test(text)) return "Message size or length rejected";
      if (/new connection|another location|another connection/.test(text)) return "Replaced by another connection";
      if (/captcha|turnstile|verif/.test(text)) return "Verification rejected";
      if (/account|login|auth|token/.test(text)) return "Account or login rejected";
      if (/session/.test(text)) return "Session rejected";
      if (/ban|block|limit|policy/.test(text)) return "Server policy rejection";
      if (/protocol|version/.test(text)) return "Protocol rejected";
      return "Server supplied an unclassified close reason";
    }
    static report() {
      const W = WsConnection, A = Account;
      const lines = ["MO connection report 4", "Server selected: " + Boolean(W.ip), "Browser verification SDK: " + Boolean(window.turnstile && window.turnstile.render), "Shield library: " + Boolean(window.__SHIELD__), "Signed-in session: " + Boolean(A.loggedIn), "Tag relay connected: " + Boolean(RelayWs.connected), "Tag relay socket: " + (RelayWs.ws ? ["connecting", "open", "closing", "closed"][RelayWs.ws.readyState] : "none")];
      for (const slot of [1, 2]) {
        const socket = slot === 1 ? W.ws : W.ws2;
        const entry = slot === 1 ? A.slot1 : A.slot2;
        const token = A["gameToken" + slot], at = A["gameTokenAt" + slot];
        const shield = W._shield && W._shield[slot];
        lines.push("Player " + slot + ": socket=" + (socket ? ["connecting", "open", "closing", "closed"][socket.readyState] : "none") + ", ready=" + Boolean(slot === 1 ? W.connected : W.connected2) + ", shield=" + Boolean(shield && shield.established) + ", account=" + Boolean(entry && entry.uuid) + ", token=" + Boolean(token) + ", tokenAge=" + (token && at ? Math.max(0, Math.floor((Date.now() - at) / 1000)) + "s" : "none") + ", tokenRequest=" + Boolean(A._slotRequests && A._slotRequests[slot]) + ", verification=" + Boolean(W.pendingResolvers && W.pendingResolvers[slot]));
      }
      for (const slot of [1, 2]) {
        const trace = this.packetTrace && this.packetTrace[slot];
        if (trace && trace.length) lines.push("Player " + slot + " recent packet sizes (no packet contents):", ...trace);
        const closed = this.closedPackets && this.closedPackets[slot];
        if (closed) lines.push("Player " + slot + " packets at last disconnect (code " + closed.code + "):", ...closed.trace);
      }
      lines.push("Recent connection events:", ...(this.events || ["No events recorded yet"]));
      return lines.join("\n");
    }
    static init() {
      const host = document.getElementById("account-box");
      if (!host || document.getElementById("mo-connection-report")) return;
      window.addEventListener("securitypolicyviolation", event => {
        const directive = String(event.effectiveDirective || "unknown").replace(/[^a-z-]/gi, "");
        let destination = "resource";
        try { destination = new URL(event.blockedURI).hostname; } catch (_) {}
        this.note("Browser CSP", directive + " blocked " + destination);
      });
      const section = document.createElement("section");
      section.style.cssText = "margin-top:18px;border-top:1px solid #8bd4d930;padding-top:16px";
      const title = document.createElement("div"); title.textContent = "Connection report"; title.style.cssText = "color:#a9e8db;font:600 12px Inter,Ubuntu,sans-serif;margin-bottom:9px";
      const report = document.createElement("textarea"); report.id = "mo-connection-report"; report.readOnly = true; report.setAttribute("aria-label", "Connection report"); report.style.cssText = "box-sizing:border-box;width:100%;height:175px;resize:vertical;padding:10px;background:#091725;color:#c8dce9;border:1px solid #a8d3ec25;border-radius:9px;font:10px/1.5 monospace";
      const button = document.createElement("button");button.type = "button";button.textContent = "Select report to copy";button.style.cssText = "margin-top:8px;padding:9px 12px;background:#20524a;color:#a9f9e5;border:1px solid #8bd4d930;border-radius:8px;cursor:pointer;font:600 11px Inter,Ubuntu,sans-serif";
      button.addEventListener("click", () => { report.value = this.report(); report.focus(); report.select(); });
      section.append(title, report, button);host.appendChild(section);
      const update = () => { if (document.activeElement !== report) report.value = this.report(); };
      update(); this.timer = setInterval(update, 1000);
    }
  }
  class MoMenu {
    static init() {
      const toggle = document.getElementById("mo-account-toggle");
      const panel = document.getElementById("mo-account-panel");
      if (!toggle || !panel) return;
      this.toggle = toggle; this.panel = panel;
      const close = document.getElementById("mo-account-close");
      toggle.addEventListener("click", () => this.setAccount(panel.hidden));
      close.addEventListener("click", () => this.setAccount(false));
      panel.addEventListener("click", event => { if (event.target === panel) this.setAccount(false); });
      panel.addEventListener("keydown", event => {
        if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); this.setAccount(false); }
        if (event.key !== "Tab") return;
        const controls = [...panel.querySelectorAll("button, a[href], input, select")].filter(el => el.getClientRects().length && !el.disabled);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      });
      ["skin", "skin2", "arbSkin"].forEach(id => {
        const field = document.getElementById(id);
        field.addEventListener("input", () => this.refreshPreview());
        field.addEventListener("change", () => this.refreshPreview());
        field.addEventListener("blur", () => setTimeout(() => this.refreshPreview(), 0));
      });
      const primary = document.querySelector("#mo-player-one .skin-preview");
      this.observer = new MutationObserver(() => this.refreshPreview());
      this.observer.observe(primary, { attributes: true, attributeFilter: ["style"] });
      this.refreshPreview();
      MoDiagnostics.init();
    }
    static setAccount(open, restoreFocus = true) {
      if (!this.panel) return;
      this.panel.hidden = !open;
      this.toggle.setAttribute("aria-expanded", String(open));
      if (open) document.getElementById("mo-account-close").focus();
      else if (restoreFocus) this.toggle.focus();
    }
    static refreshPreview() {
      const preview = document.querySelector(".mo-skin-preview-2");
      if (!preview) return;
      const second = document.getElementById("skin2").value.trim();
      const primary = document.querySelector("#mo-player-one .skin-preview");
      let background = primary ? primary.style.backgroundImage : "";
      if (second) {
        try {
          const url = new URL(second, document.baseURI);
          background = /^(https?:)$/.test(url.protocol) ? "url(" + JSON.stringify(url.href) + ")" : "";
        } catch (_) { background = ""; }
      }
      preview.style.backgroundImage = background;
      preview.parentElement.classList.toggle("has-skin", Boolean(background));
    }
  }
  class MainMenu {
    static ["init"]() {
      Notifications.init();
      Settings.init();
      Inputs.init();
      Profile.init();
      Server.init();
      Theme.init();
      Leaderboard.init();
      Minimap.init();
      TeamList.init();
      ChatInput.init();
      Stats.init();
      TargetingHud.init();
      this.isOpened = true;
      this.gMode = ":party";
      this.div = $("#menu-overlay");
      this.streammode = !Storage.get("extras", "streammode");
      this.toggleStreammode();
      this.buttons();
      MoMenu.init();
    }
    static ["buttons"]() {
      $("#button-settings").click(() => {
        this.closeSubMenus();
        Settings.toggle();
      });
      $("#button-play").click(() => {
        this.play();
      });
      $("#button-spectate").click(() => {
        PacketSender.spectate();
        this.close();
      });
      $("#create-party").click(() => {
        PartyManager.create();
      });
      $("#join-party").click(() => {
        PartyManager.join($("#party-token").val());
      });
      $("#leave-party").click(() => {
        PartyManager.leave();
      });
      $("#party-context-menu-invite").click(() => {
        PartyManager.invite();
      });
      $(document).click((ahi) => {
        if (!$(ahi.target).closest("#party-context-menu").length) {
          PartyManager.closeMenu();
        }
      });
      $("#button-inputs").click(() => {
        this.closeSubMenus();
        Inputs.toggle();
      });
      $("#button-theme").click(() => {
        this.closeSubMenus();
        Theme.toggle();
      });
      $("#normal-tag").click(() => {
        this.normalTag();
      });
      $("#minimap-show-1").click(() => {
        $("#minimap-show-" + Minimap.selector).removeClass("active");
        $("#minimap-show-1").addClass("active");
        Minimap.selector = 1;
      });
      $("#minimap-show-2").click(() => {
        $("#minimap-show-" + Minimap.selector).removeClass("active");
        $("#minimap-show-2").addClass("active");
        Minimap.selector = 2;
      });
      $("#minimap-show-0").click(() => {
        $("#minimap-show-" + Minimap.selector).removeClass("active");
        $("#minimap-show-0").addClass("active");
        Minimap.selector = 0;
      });
      $("#streamMode").click(() => {
        this.toggleStreammode();
      });
      $("#spectate-mode-top").click(() => {
        this.spectateModeTop();
      });
      $("#spectate-mode-mouse").click(() => {
        this.spectateModeMouse();
      });
      $("#spectate-mode-target").click(() => {
        this.spectateModeTarget();
      });
      if (!Storage.get("extras", "openedChangelog")) {
        $("#changelog").addClass("active");
      }
      $("#changelog").click(() => {
        Storage.set("extras", "openedChangelog", true);
        $("#changelog").removeClass("active");
      });
    }
    static ["doubleTag"]() {
      $("#double-tag").addClass("active-tag");
      $("#normal-tag").removeClass("active-tag");
      $("#tag2").show();
      $("#nick").css("width", "189px");
      $("#teams-vs").show();
      $("#info-tp").hide();
      RelayData.isSpectator = true;
      RelaySender.spectator(true);
      $(".minimap-button").each(function () {
        $(this).show();
      });
    }
    static ["normalTag"]() {
      $("#normal-tag").addClass("active-tag");
      $("#double-tag").removeClass("active-tag");
      $("#tag2").hide();
      $("#nick").css("width", "45px");
      $("#teams-vs").hide();
      $("#info-tp").show();
      RelaySender.spectator(false);
      RelayData.isSpectator = false;
      $(".minimap-button").each(function () {
        $(this).hide();
      });
    }
    static ["play"]() {
      if (!WsConnection.connected) {
        Notifications.warn("Connection", "Player 1 is still connecting. Wait for Ready before pressing Play.");
        return;
      }
      this.close();
      // Spawn both tabs: Tab 1 always, Tab 2 as well when its connection is
      // live. A single Play click brings the whole pair back.
      if (!Player._isAlive) {
        PacketSender.spawn(1);
      }
      if (WsConnection.connected2 && !Player._isAlive2) {
        PacketSender.spawn(2);
      }
    }
    static ["closeSubMenus"]() {
      MoMenu.setAccount(false, false);
      Inputs.close();
      Settings.close();
      Theme.close();
    }
    static ["toggle"]() {
      if (this.isOpened) {
        this.close();
      } else {
        this.open();
      }
    }
    static ["close"]() {
      MoMenu.setAccount(false, false);
      this.isOpened = false;
      this.div.fadeOut(250);
      $("#leaderboard-hud").css("top", "-2px");
      $("#teamlist-hud").css("top", "10px");
      $(".menu-bar").slideUp(250);
      $("#targeting-hud").css("top", "0px");
    }
    static ["open"]() {
      this.isOpened = true;
      this.div.fadeIn(250);
      $("#leaderboard-hud").css("top", "-2px");
      $("#teamlist-hud").css("top", "10px");
      $(".menu-bar").slideDown(250);
      $("#targeting-hud").css("top", "0px");
    }
    static ["toggleStreammode"]() {
      if (this.streammode) {
        $("#nick, #tag, #tag2, #party-token").removeClass("input-hidden");
        $("#streamMode").html('<i class="fa fa-eye fa-fw"></i>');
        this.streammode = false;
        Storage.set("extras", "streammode", this.streammode);
      } else {
        $("#nick, #tag, #tag2, #party-token").addClass("input-hidden");
        $("#streamMode").html('<i class="fa fa-eye-slash fa-fw"></i>');
        this.streammode = true;
        Storage.set("extras", "streammode", this.streammode);
      }
    }
    static ["spectateModeTop"]() {
      if (!Player.isAlive && Camera.isSpectating && Camera.freeSpectate) {
        TargetingHud.topViewport();
        PacketSender.freeSpectate();
      }
    }
    static ["spectateModeMouse"]() {
      if (!(Player.isAlive || !Camera.isSpectating || (Camera.freeSpectate && !Targeting.isTurnedOn))) {
        if (Targeting.isTurnedOn) {
          Targeting.target1.turnedOn = false;
          Targeting.target2.turnedOn = false;
          TargetingHud.mouseViewport();
        } else {
          PacketSender.freeSpectate();
          TargetingHud.mouseViewport();
        }
      }
    }
    static ["spectateModeTarget"]() {
      if ("on" === Settings.targeting) {
        Notifications.command("Multibox", Language.current.notif.targeting_on);
      } else {
        Notifications.command("Multibox", Language.current.notif.targeting_off);
      }
    }
  }
  class CellData {
    static ["init"]() {
      const aas = {
        left: 0x0,
        top: 0x0,
        right: 0x0,
        bottom: 0x0,
      };
      this.cells = new Map();
      this.cells2 = new Map();
      this.cells3 = new Map();
      this.myCellsIDs = new Set();
      this.myCellsIDs2 = new Set();
      this.myCellsIDs3 = new Set();
      this.myCells = new Map();
      this.myCells2 = new Map();
      this.myCells3 = new Map();
      this.sortedCells = [];
      this.food = [];
      this.cellsPositions = aas;
    }
    static ["update"]() {
      this.positions();
      this.food = [];
      this.sortedCells = [];
      this.cells.forEach((bi, fk) => {
        if (bi.isMine) {
          this.cellsPos(bi);
        }
        if (bi.fadeStartTime && 1 < (GameLoop.time - bi.fadeStartTime) / Settings.CellAnimation) {
          this.cells["delete"](fk);
        } else if (this.isInView(bi) && bi.worldID !== Player.worldID2) {
          if (bi.isFood) {
            this.food.push(bi);
          } else {
            this.sortedCells.push(bi);
          }
        }
      });
      this.cells2.forEach((afx, sz) => {
        if (afx.fadeStartTime && 1 < (GameLoop.time - afx.fadeStartTime) / Settings.CellAnimation) {
          this.cells2["delete"](sz);
        } else if (!(!this.isInView(afx) || (!afx.isMine && this.check(afx)))) {
          if (afx.isFood) {
            this.food.push(afx);
          } else {
            this.sortedCells.push(afx);
          }
        }
      });
      this.sortedCells.sort((uo, aei) => {
        const adg = uo.animRadius;
        const tq = aei.animRadius;
        return adg === tq ? aei.id - uo.id : adg - tq;
      });
    }
    static ["getCell"](tf, alr) {
      const col = 1 === alr ? this.cells : 2 === alr ? this.cells2 : this.cells3;
      return col.get(tf) || this.addCell(tf, alr);
    }
    static ["getCellAt"](dg, zf) {
      // Matches 3rb.js's own onContextMenu circle hit-test (pointInCircle
      // over this.nodes), used for the right-click party-invite menu.
      // sortedCells is ascending by radius and that's also render order
      // (see Renderer.cells()), so the last/largest one drawn on top of a
      // given point should win - walk it back to front.
      for (let ais = this.sortedCells.length; ais--; ) {
        const aka = this.sortedCells[ais];
        if (0 >= aka.ownerId || this.myCellsIDs.has(aka.id) || this.myCellsIDs2.has(aka.id)) {
          continue;
        }
        const sq = dg - aka.animX;
        const ajp = zf - aka.animY;
        if (sq * sq + ajp * ajp <= aka.animRadius * aka.animRadius) {
          return aka;
        }
      }
      return null;
    }
    static ["addCell"](ty, adc) {
      const aij = 1 === adc ? this.cells : 2 === adc ? this.cells2 : this.cells3;
      const iy = new Cell(ty, adc);
      aij.set(ty, iy);
      this.myCellCheck(ty, iy, adc);
      return iy;
    }
    static ["myCellCheck"](ek, st, afh) {
      const ww = 1 === afh ? this.myCellsIDs : 2 === afh ? this.myCellsIDs2 : this.myCellsIDs3;
      const jn = 1 === afh ? this.myCells : 2 === afh ? this.myCells2 : this.myCells3;
      if (ww.has(ek)) {
        jn.set(ek, st);
        ww["delete"](ek);
        st.isMine = true;
        st.nick = Player.nick;
      }
    }
    static ["eatCell"](agb, ahu, ahw) {
      const dr = 1 === ahw ? this.cells : 2 === ahw ? this.cells2 : this.cells3;
      const rx = 1 === ahw ? this.myCells : 2 === ahw ? this.myCells2 : this.myCells3;
      const zl = dr.get(ahu);
      const aio = dr.get(agb);
      if (zl && aio) {
        zl.x = aio.x;
        zl.y = aio.y;
        zl.radius = zl.animRadius;
        zl.fadeStartTime = GameLoop.time;
        zl.lastUpdateTime = GameLoop.time;
        if (zl.isMine) {
          rx["delete"](ahu);
        }
        dr["delete"](ahu);
        if (!zl.isFood) {
          dr.set(ahu + ":removed", zl);
        }
      }
    }
    static ["removeCell"](ao, jx) {
      const bq = 1 === jx ? this.cells : 2 === jx ? this.cells2 : this.cells3;
      const aim = 1 === jx ? this.myCells : 2 === jx ? this.myCells2 : this.myCells3;
      const lt = bq.get(ao);
      if (lt) {
        if (lt.isMine) {
          aim["delete"](ao);
        }
        bq["delete"](ao);
        if (!(lt.isFood || "on" !== Settings.eatAnimation)) {
          lt.fadeStartTime = GameLoop.time;
          bq.set(ao + ":removed", lt);
        }
      }
    }
    static ["isInView"](abt) {
      const f = {
        x: 0x0,
        y: 0x0,
      };
      const dy = 2 === abt.cellType ? WorldData.position : f;
      const lb = Camera.viewBounds;
      return !(
        abt.animX - dy.x + abt.animRadius < lb.left ||
        abt.animX - dy.x - abt.animRadius > lb.right ||
        abt.animY - dy.y + abt.animRadius < lb.top ||
        abt.animY - dy.y - abt.animRadius > lb.bottom
      );
    }
    static ["positions"]() {
      if (0 === CellData.myCells.size) {
        // tab1 has no cells of its own right now (dead/not spawned yet) ->
        // there's nothing to dedup tab2's view against, so don't suppress anything
        this.cellsPositions.left = Infinity;
        this.cellsPositions.right = -Infinity;
        this.cellsPositions.top = Infinity;
        this.cellsPositions.bottom = -Infinity;
        return;
      }
      let yf = true;
      CellData.myCells.forEach((agt) => {
        if (yf) {
          this.cellsPositions.left = agt.x;
          this.cellsPositions.right = agt.x;
          this.cellsPositions.top = agt.y;
          this.cellsPositions.bottom = agt.y;
          yf = false;
        }
      });
    }
    static ["cellsPos"](lh) {
      if (this.cellsPositions.left > lh.x + lh.radius) {
        this.cellsPositions.left = lh.x + lh.radius;
      }
      if (this.cellsPositions.right < lh.x - lh.radius) {
        this.cellsPositions.right = lh.x - lh.radius;
      }
      if (this.cellsPositions.top > lh.y + lh.radius) {
        this.cellsPositions.top = lh.y + lh.radius;
      }
      if (this.cellsPositions.bottom < lh.y - lh.radius) {
        this.cellsPositions.bottom = lh.y - lh.radius;
      }
    }
    static ["check"](cu) {
      const aew = WorldData.position;
      const gi = cu.x - aew.x;
      const os = cu.y - aew.y;
      const agz = this.cellsPositions;
      const dg = 600; // padding (game units) around tab1's own cell(s)
      return !(
        gi + cu.radius < agz.left - dg ||
        gi - cu.radius > agz.right + dg ||
        os + cu.radius < agz.top - dg ||
        os - cu.radius > agz.bottom + dg
      );
    }
    // Promote tab 3 data → killed tab slot (pointer swap, O(1))
    static ["promoteTab"](from, to) {
      const srcCells = from === 1 ? this.cells : from === 2 ? this.cells2 : this.cells3;
      const srcMy = from === 1 ? this.myCells : from === 2 ? this.myCells2 : this.myCells3;
      const srcIDs = from === 1 ? this.myCellsIDs : from === 2 ? this.myCellsIDs2 : this.myCellsIDs3;
      const dstCells = to === 1 ? this.cells : to === 2 ? this.cells2 : this.cells3;
      const dstMy = to === 1 ? this.myCells : to === 2 ? this.myCells2 : this.myCells3;
      const dstIDs = to === 1 ? this.myCellsIDs : to === 2 ? this.myCellsIDs2 : this.myCellsIDs3;
      // Clear destination
      dstCells.clear();
      dstMy.clear();
      dstIDs.clear();
      // Move source → destination
      srcCells.forEach((v, k) => dstCells.set(k, v));
      srcMy.forEach((v, k) => dstMy.set(k, v));
      srcIDs.forEach((v) => dstIDs.add(v));
      // Update cellType on promoted cells
      dstCells.forEach((c) => { c.cellType = to; });
      // Clear source
      srcCells.clear();
      srcMy.clear();
      srcIDs.clear();
    }
  }
  class Cell {
    constructor(wh, kh) {
      const db = {
        r: 0x0,
        g: 0x0,
        b: 0x0,
      };
      this.id = wh;
      this.x = 0;
      this.y = 0;
      this.radius = 0;
      this.colorObject = db;
      this.colorHex = "#555";
      this.skin = "";
      this.skinCode = 0;
      this._nick = "";
      this.isMine = false;
      this.isFood = false;
      this.isEjected = false;
      this.isVirus = false;
      this.isFriend = false;
      this.account = "";
      // Owner/"parent" player id (real 3rb.io protocol field, bit 0x40 of
      // the per-cell flags byte in worldUpdate). -1 means "no owner" - the
      // original client (3rb.js handleNodes) uses exactly this to decide
      // Player vs Food, not the nickname. See checkIsFood().
      this.ownerId = -1;
      this.cellType = kh;
      this.animX = 0;
      this.animY = 0;
      this.animRadius = 0;
      this.lastUpdateTime = 0;
      this.fadeStartTime = 0;
    }
    set ["nick"](np) {
      if (!np) {
        return;
      }
      this._nick = np;
      const abd = np.indexOf("");
      if (0 <= abd && np.length >= abd + 1) {
        const fe = np.charCodeAt(abd + 1);
        if (12000 < fe) {
          this.skinCode = fe;
        }
      }
    }
    get ["nick"]() {
      return this._nick;
    }
    get ["mass"]() {
      return 0 | ((this.animRadius * this.animRadius) / 100);
    }
    get ["staticMass"]() {
      return 0 | ((this.radius * this.radius) / 100);
    }
    ["setColor"](jp, aci, je) {
      this.colorObject.r = jp;
      this.colorObject.g = aci;
      this.colorObject.b = je;
      this.colorHex = "#" + (16777216 + (jp << 16) + (aci << 8) + je).toString(16).slice(1);
    }
    ["animate"]() {
      if (Settings.moMotionStyle === "classic" || this.isVirus || this.isFood || this.isEjected) {
        let aah = (GameLoop.time - this.lastUpdateTime) / Settings.CellAnimation;
        aah = 0 > aah ? 0 : 1 < aah ? 1 : aah;
        this.animX = aah * (this.x - this.animX) + this.animX;
        this.animY = aah * (this.y - this.animY) + this.animY;
        this.animRadius = aah * (this.radius - this.animRadius) + this.animRadius;
        this.lastUpdateTime = GameLoop.time;
        this._moMotionTime = undefined;
        this._moStretch = 0;
        this._moVX = this._moVY = 0;
        return;
      }
      // Render timing is independent of packet timing. Multiple passes in
      // one frame (pair camera, packet handling, drawing) advance only once.
      const now = GameLoop.time;
      const previous = this._moMotionTime === undefined ? this.lastUpdateTime : this._moMotionTime;
      const dt = Math.max(0, now - previous);
      if (!Number.isFinite(dt)) return;
      this._moMotionTime = now;
      this.lastUpdateTime = now;
      if (dt === 0) return;
      const delay = Math.max(40, Number(Settings.CellAnimation) || 160);
      const resumed = dt > 250;
      const moveBlend = resumed ? 1 : -Math.expm1(-dt / (delay * 0.75));
      const sizeBlend = resumed ? 1 : -Math.expm1(-dt / (delay * 0.55));
      const dx = (this.x - this.animX) * moveBlend;
      const dy = (this.y - this.animY) * moveBlend;
      this.animX += dx;
      this.animY += dy;
      this.animRadius += (this.radius - this.animRadius) * sizeBlend;
      const velocityBlend = -Math.expm1(-dt / 65);
      const vx = resumed ? 0 : dx / dt;
      const vy = resumed ? 0 : dy / dt;
      this._moVX = (this._moVX || 0) + (vx - (this._moVX || 0)) * velocityBlend;
      this._moVY = (this._moVY || 0) + (vy - (this._moVY || 0)) * velocityBlend;
      const speed = Math.hypot(this._moVX, this._moVY);
      const target = resumed ? 0 : Math.min(0.035, speed * 2 / Math.max(20, this.animRadius));
      this._moStretch = (this._moStretch || 0) + (target - (this._moStretch || 0)) * velocityBlend;
      if (resumed) this._moVX = this._moVY = this._moStretch = 0;
    }
    get ["worldID"]() {
      let on = this._nick.substring(this._nick.indexOf("}") + 1);
      on = on.replace("%*^", "");
      return ":party" === MainMenu.gMode ? on + this.colorHex : on;
    }
    get ["isUnnamed"]() {
      return 1 > this._nick.substring(this._nick.indexOf("}") + 1).length;
    }
  }
  class Player {
    static ["init"]() {
      const ail = {
        r: 0x0,
        g: 0x0,
        b: 0x0,
      };
      const aeu = {
        x: 0x64,
        y: 0x64,
      };
      this._nick = $("#nick").val();
      this._nick2 = $("#nick2").val();
      this._arbSkin = $("#arbSkin").val();
      this._skin = Renderer.getImgurCode($("#skin").val());
      this._skin2 = Renderer.getImgurCode($("#skin2").val());
      this._tag = $("#tag").val();
      this._colorObject = ail;
      this.colorHex = "#000";
      this.colorHex2 = "#000";
      this._isAlive = false;
      this._isAlive2 = false;
      this._scouting1 = false;
      this._scouting2 = false;
      this.isRGB = false;
      this.x = 0;
      this.y = 0;
      this.speed = 0;
      this.animSpeed = 0;
      this.mass = 0;
      this.biggestPieceMass = 0;
      this.score = 0;
      this.movementPaused = false;
      this.deathLocation = aeu;
      this.type = 1;
      this._pairCamera = false;
    }
    static ["update"]() {
      if (0 < this.pieceCount1) {
        this.playing();
      } else {
        this.dead();
      }
      if (0 < this.pieceCount2) {
        this.playing2();
      } else {
        this.dead2();
      }
      this.updateData();
      this.updateScouting();
    }
    static get ["scouting"]() {
      return this._scouting1 || this._scouting2;
    }
    static ["updateScouting"]() {
      // A connected-but-idle tab is put into a background spectate so the
      // real server keeps streaming it the current #1 player's position -
      // that position is what feeds the minimap "#1 position" marker (via
      // RelaySender.biggest()). Without this, that feed only ever started on
      // an alive->dead edge (see dead()/dead2() below), so a tab that never
      // spawned at all this session (e.g. only ever playing tab 1) never
      // produced it and the marker just never lit up.
      const er = !this._isAlive && this._isAlive2 && PacketSender.chekConnection(1);
      const sg = !this._isAlive2 && this._isAlive && PacketSender.chekConnection(2);
      if (er && !this._scouting1) {
        PacketSender.spectateBackground(1);
      }
      if (sg && !this._scouting2) {
        PacketSender.spectateBackground(2);
      }
      this._scouting1 = er;
      this._scouting2 = sg;
      if (this._isAlive && this._isAlive2) {
        // Both tabs are actively played - neither is idle-scouting, so any
        // #1 marker still showing is leftover/stale data (e.g. from just
        // before the second tab respawned) rather than a live feed.
        RelayData.biggestIsOn = false;
      }
    }
    static ["playing"]() {
      if (!this._isAlive) {
        this._isAlive = true;
        // Tab 1 respawning ends any background scouting it was doing for
        // the #1 position marker - clear it locally instead of leaving the
        // last scouted position stuck on the minimap until a stale relay
        // broadcast happens to overwrite it.
        if (this._scouting1) {
          this._scouting1 = false;
          RelayData.biggestIsOn = false;
        }
        if (!this._isAlive2) {
          RelaySender.aliveStatus(2);
        }
        for (const nk of CellData.myCells.values()) {
          this.colorObject = nk.colorObject;
          this.colorHex = nk.colorHex;
          break;
        }
      }
    }
    static ["playing2"]() {
      if (!this._isAlive2) {
        this._isAlive2 = true;
        // Same as above, for tab 2 respawning.
        if (this._scouting2) {
          this._scouting2 = false;
          RelayData.biggestIsOn = false;
        }
        if (!this._isAlive) {
          RelaySender.aliveStatus(1);
        }
        for (const zy of CellData.myCells2.values()) {
          this.colorHex2 = zy.colorHex;
          break;
        }
        // Tab 2 respawned with a new color: re-broadcast the skin payload so
        // teammates can key tab 2's cells (they carry colorHex2) correctly.
        RelaySender.skin();
      }
    }
    static ["updateData"]() {
      if (this.isAlive) {
        let ahk = 0;
        let py = 0;
        let pair1 = null;
        let pair2 = null;
        this.mass = 0;
        this.biggestPieceMass = 0;
        const mergedCount = this.pieceCount;
        const pairCenter = (cells, origin) => {
          let tx = 0;
          let ty = 0;
          let tw = 0;
          let tr = 0;
          for (const cell of cells.values()) {
            cell.animate();
            const weight = Math.max(1, cell.animRadius * cell.animRadius);
            tx += (cell.animX - (origin ? origin.x : 0)) * weight;
            ty += (cell.animY - (origin ? origin.y : 0)) * weight;
            tw += weight;
            tr += cell.animRadius;
            ahk += (cell.animX - (origin ? origin.x : 0)) / mergedCount;
            py += (cell.animY - (origin ? origin.y : 0)) / mergedCount;
            this.mass += cell.staticMass;
            if (this.biggestPieceMass < cell.staticMass) {
              this.biggestPieceMass = cell.staticMass;
            }
          }
          return tw ? { x: tx / tw, y: ty / tw, radii: tr } : null;
        };
        if (this._isAlive) {
          pair1 = pairCenter(CellData.myCells, null);
        }
        if (this._isAlive2) {
          const yk = WorldData.position;
          pair2 = pairCenter(CellData.myCells2, yk);
        }
        // Merged simple average of every cell - the original framing, kept as
        // the fallback for single-tab play and for the Pair camera toggle OFF.
        let targetX = ahk;
        let targetY = py;
        let targetR = (pair1 ? pair1.radii : 0) + (pair2 ? pair2.radii : 0);
        if ("on" === Settings.pairCamera && pair1 && pair2) {
          // Close/far camera mode uses hysteresis so two nearby controlled cells
          // cannot make the camera rapidly flip between framing strategies.
          const dist = Math.hypot(pair1.x - pair2.x, pair1.y - pair2.y);
          this._pairCamera = this._pairCamera ? dist < 4500 : dist < 3000;
          if (this._pairCamera) {
            targetX = (pair1.x + pair2.x) / 2;
            targetY = (pair1.y + pair2.y) / 2;
            // Expanded close-cell envelope frames both cells as a stable
            // pair without weighting by mass.
            targetR = Math.max((pair1.radii + pair2.radii) * 1.15, dist * 0.1);
          } else {
            // When far apart, follow the selected tab instead of averaging
            // empty space between the cells.
            const followed = this.typeID === 2 ? pair2 : pair1;
            targetX = followed.x;
            targetY = followed.y;
            targetR = followed.radii;
          }
        } else {
          this._pairCamera = false;
        }
        if (!this.movementPaused) {
          const ajw = this.x - targetX;
          const ds = this.y - targetY;
          const acw = Math.sqrt(ajw * ajw + ds * ds);
          this.speed += acw;
          this.x = targetX;
          this.y = targetY;
        }
        if (this.score < this.mass) {
          this.score = this.mass;
        }
        const ow = Math.pow(Math.min(64 / Math.max(targetR, 1), 1), 0.4);
        const zz = Math.max(window.innerWidth / 1080, window.innerHeight / 1920);
        Camera.autoZoomViewport = ow * zz;
      }
    }
    static ["dead"]() {
      if (this._isAlive) {
        this._isAlive = false;
        if (this._isAlive2) {
          this.type = 2;
          PacketSender.spectate(1);
        } else {
          RelaySender.aliveStatus();
          this.setInfo();
        }
      }
    }
    static ["dead2"]() {
      if (this._isAlive2) {
        this._isAlive2 = false;
        if (this._isAlive) {
          this.type = 1;
          PacketSender.spectate(2);
        } else {
          RelaySender.aliveStatus();
          this.setInfo();
        }
      }
    }
    static ["setInfo"]() {
      this.score = 0;
      this.mass = 0;
      this.biggestPieceMass = 0;
      this.movementPaused = false;
      this.deathLocation.x = this.x;
      this.deathLocation.y = this.y;
      this.type = 1;
      MainMenu.open();
    }
    static set ["nick"](va) {
      this._nick = va;
      RelaySender.nick();
    }
    static get ["nick"]() {
      return this._nick.substring(0, 15);
    }
    static set ["nick2"](va) {
      this._nick2 = va;
      RelaySender.nick();
    }
    static get ["nick2"]() {
      return this._nick2 ? this._nick2.substring(0, 15) : "";
    }
    static set ["arbSkin"](aek) {
      this._arbSkin = aek;
    }
    static get ["arbSkin"]() {
      return this._arbSkin;
    }
    static set ["skin"](dn) {
      const acy = Renderer.getImgurCode(dn);
      const pj = Renderer.getRaindowFlag(dn);
      // getImgurCode() always returns a truthy string - either the real
      // code, or the literal "XXXXXXX" sentinel for "couldn't parse this".
      // Checking plain truthiness here meant the invalid-URL branch could
      // never actually run: a bad/unparseable URL silently became a skin
      // whose code was literally "XXXXXXX" (i.e. no skin), with no warning.
      return "XXXXXXX" !== acy
        ? (this.isRGB !== pj && ((this.isRGB = pj), RelaySender.rgbMode()), (this._skin = acy), void RelaySender.skin())
        : void Notifications.alert("Drag+", Language.current.notif.invalidSkinUrl);
    }
    static get ["skin"]() {
      return this._skin;
    }
    static set ["skin2"](dn) {
      const acy = Renderer.getImgurCode(dn);
      // Tab-2 skin: same code extraction as skin, no rainbow flag. An empty
      // input silently clears it (so switching to a profile that has no
      // second skin works); anything unparseable warns and keeps the old.
      if ("XXXXXXX" === acy) {
        if (dn) {
          return void Notifications.alert("Drag+", Language.current.notif.invalidSkinUrl);
        }
        this._skin2 = "";
      } else {
        this._skin2 = acy;
      }
      RelaySender.skin();
    }
    static get ["skin2"]() {
      return this._skin2 || "";
    }
    static set ["tag"](ry) {
      this._tag = ry;
      RelaySender.tag();
      // Tag is meant to work standalone, no party/invite needed - two
      // players who set the same tag should just see each other. Only
      // takes effect when not already in a native party (see
      // RelayWs.computeRoom()), which stays the higher-priority,
      // explicit grouping while active.
      RelayWs.updateRoom();
    }
    static get ["tag"]() {
      return this._tag;
    }
    static set ["colorObject"](abf) {
      this._colorObject.r = abf.r;
      this._colorObject.g = abf.g;
      this._colorObject.b = abf.b;
      RelaySender.color();
    }
    static get ["colorObject"]() {
      return this._colorObject;
    }
    static set ["isAlive"](akv) {
      this._isAlive = akv;
      RelaySender.aliveStatus(akv);
    }
    static get ["isAlive"]() {
      return this._isAlive || this._isAlive2;
    }
    static get ["worldID"]() {
      let ju = this._nick.substring(this._nick.indexOf("}") + 1);
      ju = ju.replace("%*^", "");
      return ":party" === MainMenu.gMode ? ju + this.colorHex : ju;
    }
    static get ["worldID2"]() {
      let agw = (this._nick2 || this._nick);
      agw = agw.substring(agw.indexOf("}") + 1);
      agw = agw.replace("%*^", "");
      return ":party" === MainMenu.gMode ? agw + this.colorHex2 : agw;
    }
    static get ["location"]() {
      return WorldData.getLocation(this.x, this.y);
    }
    static get ["pieceCount1"]() {
      return CellData.myCells.size;
    }
    static get ["pieceCount2"]() {
      return CellData.myCells2.size;
    }
    static get ["pieceCount"]() {
      return this.pieceCount1 + this.pieceCount2;
    }
    static set ["typeID"](aj) {
      this.type = aj;
    }
    static get ["typeID"]() {
      return this.type;
    }
  }
  class TeamPlayer {
    constructor(lj) {
      this.id = lj;
      this.isNew = 2;
      this.x = 90;
      this.y = 90;
      this.isAlive = 0;
      this.mass = 0;
      this.nick = "";
      this.nick2 = "";
      this.skin = "";
      this.skin2 = "";
      this.skin2Color = "";
      this.colorHex = "#000";
      this.isRGB = false;
      this.animX = 90;
      this.animY = 90;
      this.timeStamp = GameLoop.time;
      this.team = 1;
    }
    get ["worldID"]() {
      let wg = this.nick.substring(this.nick.indexOf("}") + 1);
      wg = wg.replace("%*^", "");
      return ":party" === MainMenu.gMode ? wg + this.colorHex : wg;
    }
    get ["location"]() {
      // `this.x/y` is now a raw world coordinate (see positionMass()) - pass
      // it straight through, same as `Player.location` does for the
      // local player. Adding this client's own offset on top (the old
      // behaviour) double-counted a shift that was never applied to begin
      // with, which is what put teammates in the wrong minimap sector.
      return WorldData.getLocation(this.x, this.y);
    }
    ["animate"]() {
      let wf = (GameLoop.time - this.timeStamp) / 1000;
      wf = 1 < wf ? 1 : 0 > wf ? 0 : wf;
      this.animX += (this.x - this.animX) * wf;
      this.animY += (this.y - this.animY) * wf;
      this.timeStamp = GameLoop.time;
    }
    get ["mapX"]() {
      // Matches Minimap.run()'s own viewport-rect math (size/edge scale,
      // relative to the actual live border) instead of assuming the world
      // is always exactly -8000..8000 - a server/mode with a different
      // border size would otherwise put every dot in the wrong spot.
      return (this.animX - WorldData.left) * (Minimap.size / WorldData.edge);
    }
    get ["mapY"]() {
      return (this.animY - WorldData.top) * (Minimap.size / WorldData.edge);
    }
  }
  class PartyManager {
    // Native party state - this mirrors 3rb.io's own built-in party system
    // (opcode 0x55/85 create-join-leave + code result, opcode 0x57/87
    // roster snapshot; see PacketSender/PacketParser) rather than routing through
    // the custom multibox relay, since the real game server already tracks
    // party membership and broadcasts member positions on its own.
    static ["init"]() {
      this._inParty = false;
      this.code = "";
      $("#leave-party").toggle(false);
      // Tracks an outstanding create/join request: awaitingResponse dedupes
      // the toast/clipboard-copy when both tabs' sockets each get their own
      // opcode 85 reply, awaitingCreate distinguishes "created" wording from
      // "joined" and tells the reply handler to auto-join tab 2 once the
      // freshly created code is known.
      this.awaitingCreate = false;
      this.awaitingResponse = false;
      this.members = new Map();
      this.selectedTarget = null;
      this.nickToId = new Map();
      this.lastInviteSentAt = 0;
    }
    static get ["inParty"]() {
      return this._inParty;
    }
    static set ["inParty"](lk) {
      this._inParty = lk;
      $("#leave-party").toggle(lk);
    }
    static ["getMember"](zw) {
      let ef = this.members.get(zw);
      if (undefined === ef) {
        ef = new TeamPlayer(zw);
        this.members.set(zw, ef);
      }
      return ef;
    }
    static ["hasNick"](dg) {
      // Native party (this.members) and the relay's "tag" roster
      // (RelayData.teamPlayers) are two entirely separate systems with no
      // shared id space - nick is the only thing they have in common, so
      // it's what render call sites use to skip a relay entry that's
      // actually the same person already shown via the party roster.
      for (const zf of this.members.values()) {
        if (zf.nick === dg) {
          return true;
        }
      }
      return false;
    }
    static ["normalizeCode"](aiy) {
      let ky = String(aiy || "").trim();
      ky = ky.replace("https://", "").replace("beta.3rb.io/", "").replace("3rb.io/", "");
      return ky && "#" === ky.charAt(0) ? ky : null;
    }
    static ["create"]() {
      this.awaitingCreate = true;
      this.awaitingResponse = true;
      PacketSender.createParty(1);
    }
    static ["join"](fn) {
      const yr = this.normalizeCode(fn);
      if (!yr) {
        Notifications.warn("Party", "Invalid party code.");
        return;
      }
      this.awaitingCreate = false;
      this.awaitingResponse = true;
      PacketSender.joinParty(yr, 1);
      if (PacketSender.chekConnection(2)) {
        PacketSender.joinParty(yr, 2);
      }
    }
    static ["leave"]() {
      if (!this.inParty) {
        return;
      }
      if (PacketSender.chekConnection(1)) {
        PacketSender.leaveParty(1);
      }
      if (PacketSender.chekConnection(2)) {
        PacketSender.leaveParty(2);
      }
      this.inParty = false;
      this.code = "";
      this.awaitingCreate = false;
      this.awaitingResponse = false;
      this.members.clear();
      RelayWs.updateRoom();
      $("#party-token").val("");
      Notifications.warn("Party", "Left the party.");
    }
    static ["isInviteMessage"](ta) {
      // Best-effort text match - the invite notification's exact wording is
      // server-generated (it's not a client-side string we could reverse
      // engineer), so this just looks for the obvious "invite ... party"
      // shape rather than an exact phrase.
      return /invit/i.test(ta) && /part(y|ie)/i.test(ta);
    }
    static ["rememberNick"](dg, ais) {
      if (dg && 0 < ais) {
        this.nickToId.set(dg, ais);
      }
    }
    static ["stripBidi"](dg) {
      // Strip RTL/LTR bidi control marks (common around Arabic/Hebrew
      // names mixed with English text) so the extracted name displays
      // cleanly and matches consistently for nick->id lookups.
      return dg.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, "").trim();
    }
    static ["resolveIdByNick"](zf) {
      if (this.nickToId.has(zf)) {
        return this.nickToId.get(zf);
      }
      for (const aka of CellData.cells.values()) {
        if (aka.nick === zf && 0 < aka.ownerId) {
          return aka.ownerId;
        }
      }
      for (const aka of CellData.cells2.values()) {
        if (aka.nick === zf && 0 < aka.ownerId) {
          return aka.ownerId;
        }
      }
      return -1;
    }
    static ["openMenu"](lk, ahi, ajp) {
      if (!lk || 0 >= lk.ownerId || lk.ownerId === WorldData.pID || lk.ownerId === WorldData.pID2) {
        this.closeMenu();
        return;
      }
      this.selectedTarget = lk;
      const zf = $("#party-context-menu");
      $("#party-context-menu-name").text(lk.nick || "An unnamed cell");
      $("#party-context-menu-swatch").css("background-color", lk.colorHex || "#555");
      const fi = this.members.has(lk.ownerId);
      $("#party-context-menu-invite")
        .prop("disabled", fi)
        .text(fi ? "Already in party" : "Invite to Party");
      zf.css({ visibility: "hidden", display: "block" });
      let ais = ahi;
      let aka = ajp;
      if (ais + zf.outerWidth() > window.innerWidth) {
        ais -= zf.outerWidth();
      }
      if (aka + zf.outerHeight() > window.innerHeight) {
        aka -= zf.outerHeight();
      }
      zf.css({ top: aka, left: ais, visibility: "visible" });
    }
    static ["closeMenu"]() {
      this.selectedTarget = null;
      $("#party-context-menu").hide();
    }
    static ["sendInvite"](ais) {
      if (this.inParty) {
        this.lastInviteSentAt = Date.now();
        PacketSender.chat("/invite " + ais, 1);
      } else {
        // Mirrors 3rb.js's own userMenuInvite(): create a party first, then
        // give the create request a moment to round-trip before inviting -
        // sending the invite over a connection that isn't in a party yet
        // would have nothing to invite the target into.
        this.create();
        setTimeout(() => {
          this.lastInviteSentAt = Date.now();
          PacketSender.chat("/invite " + ais, 1);
        }, 1000);
      }
    }
    static ["isOwnInviteEcho"](dg) {
      // The server appears to also message the SENDER back with something
      // shaped just like the recipient's "invited you" notification
      // (matches the same isInviteMessage() pattern), which would
      // otherwise show a confusing Accept/Reject prompt on your own
      // outgoing invite. Treat anything invite-shaped that arrives shortly
      // after we sent one - or that references a party we already own -
      // as that echo rather than a genuine incoming invite.
      if (this.lastInviteSentAt && 3000 > Date.now() - this.lastInviteSentAt) {
        return true;
      }
      const zf = this.extractPartyCode(dg);
      return !!(zf && this.inParty && zf === this.code);
    }
    static ["invite"]() {
      const lk = this.selectedTarget;
      this.closeMenu();
      if (lk && 0 < lk.ownerId) {
        this.sendInvite(lk.ownerId);
      }
    }
    static ["extractPartyCode"](dg) {
      // 3rb.js renders id1<=0 chat messages via raw .html() injection (not
      // text-escaped), and exposes a global partyCode(code) function
      // (self.partyCode, bound from the join-party UI handler) - the
      // server can embed a real, clickable "<button onclick=partyCode(...)>"
      // directly in the message. Look for that call first; fall back to a
      // bare "#CODE" token anywhere in the text.
      const zf = dg.match(/partyCode\(\s*['"]([^'"]+)['"]\s*\)/i);
      if (zf) {
        return zf[1];
      }
      const ais = dg.match(/#[A-Za-z0-9_-]{3,}/);
      return ais ? ais[0] : null;
    }
    static ["acceptInvite"](aie, ais) {
      if (this.inParty) {
        // Accepting should move you into the inviter's party, not leave you
        // stuck in whatever party you were already in.
        this.leave();
      }
      if (aie) {
        this.join(aie);
        return;
      }
      if (0 < ais) {
        // No separate accept opcode has turned up in the real protocol -
        // inviting the sender back is what actually groups two players
        // into one party (same mechanism as sending an invite in the
        // first place). This is the fallback when no code could be found
        // in the message itself.
        PacketSender.chat("/invite " + ais, 1);
        return;
      }
      Notifications.warn("Party", "Couldn't figure out who invited you - ask them to invite you again.");
    }
  }
  class WorldData {
    static ["init"]() {
      const ks = {
        left: -8000,
        top: -8000,
      };
      const cd = {
        x: 0x0,
        y: 0x0,
      };
      const hs = {
        x: 0x0,
        y: 0x0,
      };
      const gy = {
        x: 0x0,
        y: 0x0,
      };
      const aed = {
        x: 0x0,
        y: 0x0,
      };
      this.left = -8000;
      this.top = -8000;
      this.right = 8000;
      this.bottom = 8000;
      this.edge = 16000;
      this.botOffset = ks;
      this.offset = cd;
      this.center = hs;
      this.offset2 = gy;
      this.offset3 = cd;
      this.center2 = aed;
      this.focusedAtCenter = false;
      this.pID = -1;
      this.pID2 = -1;
      this.pID3 = -1;
    }
    static ["update"](ua, acd, vh, kb) {
      this.left = ua;
      this.top = acd;
      this.right = vh;
      this.edge = this.right - this.left + Theme.borderWidth;
      this.bottom = kb;
      this.offset.x = 8000 + ua;
      this.offset.y = 8000 + acd;
      this.center.x = (vh + ua) >> 1;
      this.center.y = (kb + acd) >> 1;
      if (!this.focusedAtCenter) {
        Camera.x = this.center.x;
        Camera.y = this.center.y;
        this.focusedAtCenter = true;
      }
    }
    static ["update2"](wl, ck, yo, tt) {
      this.offset2.x = 8000 + wl;
      this.offset2.y = 8000 + ck;
      this.botOffset.left = wl;
      this.botOffset.top = ck;
    }
    static ["update3"](wl, ck, yo, tt) {
      this.offset3.x = 8000 + wl;
      this.offset3.y = 8000 + ck;
    }
    static ["getLocation"](ib, js) {
      let abk = 0 | ((ib - this.left) / 3199);
      let hg = 0 | ((js - this.top) / 3199);
      abk = 0 > abk ? 0 : 4 < abk ? 4 : abk;
      hg = 0 > hg ? 0 : 4 < hg ? 4 : hg;
      return String.fromCharCode(65 + hg) + (abk + 1);
    }
    static get ["position"]() {
      this.center2.x = this.offset2.x - this.offset.x;
      this.center2.y = this.offset2.y - this.offset.y;
      return this.center2;
    }
    static get ["position3"]() {
      return this.offset3;
    }
    static ["promoteTab"](from, to) {
      const srcOff = from === 1 ? this.offset : from === 2 ? this.offset2 : this.offset3;
      const srcPID = from === 1 ? this.pID : from === 2 ? this.pID2 : this.pID3;
      if (to === 1) { this.offset = srcOff; this.pID = srcPID; }
      else if (to === 2) { this.offset2 = srcOff; this.pID2 = srcPID; }
      else { this.offset3 = srcOff; this.pID3 = srcPID; }
    }
  }
  class Camera {
    static ["init"]() {
      const mo = {
        left: -960,
        right: 0x3c0,
        top: -540,
        bottom: 0x21c,
      };
      const xi = {
        x: 0x0,
        y: 0x0,
      };
      this.x = 0;
      this.y = 0;
      this.targetViewport = 1;
      this.autoZoomViewport = 1;
      this.viewport = 1;
      this.viewBounds = mo;
      this.spectatePoint = xi;
      this._isSpectating = false;
      this._freeSpectate = false;
      Targeting.init();
    }
    static get ["isSpectating"]() {
      return this._isSpectating;
    }
    static get ["freeSpectate"]() {
      return this._freeSpectate;
    }
    static set ["isSpectating"](aec) {
      this._isSpectating = aec;
      if (!Player.isAlive && aec) {
        TargetingHud.show();
      } else {
        TargetingHud.hide();
      }
    }
    static set ["freeSpectate"](pf) {
      this._freeSpectate = pf;
      if (pf) {
        TargetingHud.mouseViewport();
      } else {
        TargetingHud.topViewport();
      }
    }
    static ["update"]() {
      if (this.isSpectating) {
        Targeting.update();
      }
      this.move();
      this.updateView();
    }
    static ["move"]() {
      if (Player.isAlive) {
        this.x += (Player.x - this.x) / Settings.cameraSpeed;
        this.y += (Player.y - this.y) / Settings.cameraSpeed;
      } else if (this.isSpectating) {
        this.x = (29 * this.x + this.spectatePoint.x) / 30;
        this.y = (29 * this.y + this.spectatePoint.y) / 30;
      }
    }
    static ["updateView"]() {
      let aq = this.targetViewport;
      if ("on" === Settings.autoZoom) {
        aq *= this.autoZoomViewport;
      }
      this.viewport += (aq - this.viewport) / 8;
      const aer = Renderer.canvas.width / 2 / this.viewport;
      const aag = Renderer.canvas.height / 2 / this.viewport;
      this.viewBounds.left = Math.max(-aer + this.x, WorldData.left);
      this.viewBounds.right = Math.min(aer + this.x, WorldData.right);
      this.viewBounds.top = Math.max(-aag + this.y, WorldData.top);
      this.viewBounds.bottom = Math.min(aag + this.y, WorldData.bottom);
    }
  }
  const TextRenderer = new (class {
    constructor() {
      this.nickCaches = new Map();
      this.massCaches = new Map();
      this.maxCacheLife = 1000;
      this.massUpdateInterval = 500;
      this.nickShadowCtx = this.newShadowContext();
      this.massShadowCtx = this.newShadowContext();
      this.canvasPool = [];
    }
    ["nick"](cn) {
      if (cn.isUnnamed || this.isSmall(cn)) {
        return false;
      }
      let pk = cn.nick.substring(cn.nick.indexOf("}") + 1) || "";
      const key = (cn.vip ? "v:" : "") + pk;
      const xb = this.nickCaches.get(key) || this.newNickCache(key);
      xb.lastUsedAt = GameLoop.time;
      const gc = 50 > this.getScreenRadius(cn.animRadius) ? 0 : 1;
      const uj = xb.level[gc];
      if (uj) {
        return uj;
      }
      const ac = this.getNewCanvas();
      const xd = ac.getContext("2d");
      const lx = (50 * (gc + 1) * Theme.cellNickSize) / 100;
      // VIP cells render their name in gold (no crown in-game - the crown
      // stays in chat), matching the real client (cell flags bit 256 = vip).
      const disp = pk;
      ac.height = 0 | (1.2 * lx);
      ac.width = 0 | (1.2 * this.getNickWidth(disp, lx));
      xd.font = "700 " + (0 | lx) + "px " + Theme.nickFont;
      xd.textBaseline = "middle";
      xd.textAlign = "center";
      if ("normal" === Settings.nickShadow) {
        xd.strokeStyle = cn.vip ? "#6b4f00" : Theme.nickStrokeColor;
        xd.lineWidth = 6 * (gc + 1);
        xd.strokeText(disp, ac.width >> 1, ac.height >> 1);
      } else {
        if ("performance" === Settings.nickShadow) {
          xd.fillStyle = cn.vip ? "#6b4f00" : Theme.nickStrokeColor;
          xd.globalAlpha = 0.75;
          const aga = 0 | (ac.width / 1.2);
          const xj = 0 | (ac.height / 1.2);
          xd.fillRect((ac.width - aga) >> 1, (ac.height - xj) >> 1, aga, xj);
          xd.globalAlpha = 1;
        }
      }
      xd.fillStyle = cn.vip ? "#fbb040" : Theme.nickColor;
      xd.fillText(disp, ac.width >> 1, ac.height >> 1);
      xb.level[gc] = ac;
      return ac;
    }
    ["newNickCache"](adl) {
      const bn = new NickCache();
      this.nickCaches.set(adl, bn);
      return bn;
    }
    ["getNickWidth"](oi, yq) {
      return (this.nickShadowCtx.measureText(oi).width * yq) / 50;
    }
    ["setNickCtxFont"]() {
      this.nickCaches.clear();
      this.nickShadowCtx.font = "700 50px " + Theme.nickFont;
    }
    ["mass"](ch) {
      if (!ch.isVirus && this.isSmall(ch)) {
        return false;
      }
      const agk = this.massCaches.get(ch.id) || this.newMassCache(ch.id);
      const hh =
        "shortened" === Settings.cellMass && 999 < ch.staticMass ? (0 | (ch.staticMass / 100)) / 10 + "k" : ch.staticMass;
      const qw = this.getScreenRadius(ch.radius);
      const gn = hh !== agk.lastMass;
      const li = GameLoop.time - agk.lastRenderTime > this.massUpdateInterval;
      const to = 1.2 < qw / agk.lastScreenRadius || (gn && li);
      agk.lastUsedAt = GameLoop.time;
      if (!to && agk.canvas) {
        return agk.canvas;
      }
      if (!agk.canvas) {
        agk.canvas = this.getNewCanvas();
      }
      const yv = agk.canvas;
      const bj = yv.getContext("2d");
      const tn = 0 | ((qw / 2) * (Theme.cellMassSize / 100));
      yv.height = 0 | (1.2 * tn);
      yv.width = 0 | (1.2 * this.getMassWidth(hh, tn));
      bj.font = "700 " + tn + "px " + Theme.massFont;
      bj.textBaseline = "middle";
      bj.textAlign = "center";
      if ("normal" === Settings.massShadow) {
        bj.strokeStyle = Theme.massStrokeColor;
        bj.lineWidth = (6 * tn) / 50;
        bj.strokeText(hh, yv.width >> 1, yv.height >> 1);
      } else {
        if ("performance" === Settings.massShadow) {
          bj.fillStyle = Theme.massStrokeColor;
          bj.globalAlpha = 0.75;
          const lw = 0 | (yv.width / 1.2);
          const oo = 0 | (yv.height / 1.2);
          bj.fillRect((yv.width - lw) >> 1, (yv.height - oo) >> 1, lw, oo);
          bj.globalAlpha = 1;
        }
      }
      bj.fillStyle = Theme.massColor;
      bj.fillText(hh, yv.width >> 1, yv.height >> 1);
      agk.lastMass = hh;
      agk.lastScreenRadius = qw;
      agk.lastRenderTime = GameLoop.time + agk.timeShift;
      return yv;
    }
    ["newMassCache"](ab) {
      const cc = new MassCache();
      this.massCaches.set(ab, cc);
      return cc;
    }
    ["getMassWidth"](df, acu) {
      return (this.massShadowCtx.measureText(df).width * acu) / 50;
    }
    ["setMassCtxFont"]() {
      this.massCaches.clear();
      this.massShadowCtx.font = "700 50px " + Theme.massFont;
    }
    ["getScreenRadius"](wc) {
      return wc * Camera.viewport;
    }
    ["isSmall"](rf) {
      return "on" === Settings.autoHideText && 20 > this.getScreenRadius(rf.animRadius);
    }
    ["getNewCanvas"]() {
      return this.canvasPool.shift() || document.createElement("canvas");
    }
    ["newShadowContext"]() {
      const wp = document.createElement("canvas").getContext("2d");
      wp.font = "700 50px ubuntu";
      return wp;
    }
    ["cleaner"]() {
      this.nickCaches.forEach((akl, fl) => {
        if (GameLoop.time - akl.lastUsedAt > this.maxCacheLife) {
          this.nickCaches["delete"](fl);
          if (50 <= this.canvasPool.length) {
            return;
          }
          const jk = akl.level[0];
          const bv = akl.level[1];
          if (jk) {
            this.resetCanvas(jk);
            this.canvasPool.push(jk);
          }
          if (bv) {
            this.resetCanvas(bv);
            this.canvasPool.push(bv);
          }
        }
      });
      this.massCaches.forEach((ub, alw) => {
        if (GameLoop.time - ub.lastUsedAt > this.maxCacheLife) {
          this.massCaches["delete"](alw);
          if (50 <= this.canvasPool.length) {
            return;
          }
          const ajo = ub.canvas;
          if (ajo) {
            this.resetCanvas(ajo);
            this.canvasPool.push(ajo);
          }
        }
      });
    }
    ["resetCanvas"](az) {
      az.width = 0;
    }
  })();
  class MassCache {
    constructor() {
      this.lastUsedAt = GameLoop.time;
      this.timeShift = 0 | (Math.random() * TextRenderer.massUpdateInterval);
      this.lastMass = 0;
      this.lastScreenRadius = 0;
      this.lastRenderTime = GameLoop.time;
      this.canvas = null;
    }
  }
  class NickCache {
    constructor() {
      this.lastUsedAt = GameLoop.time;
      this.level = [null, null];
    }
  }
  class FoodRender {
    static ["render"]() {
      if ("off" !== Settings.food) {
        if ("monoColored" === Settings.food) {
          this.monoColored();
        } else if ("rainbow" === Settings.food) {
          this.rainbow();
        }
        if (Settings.moArenaStyle === "space") this.spaceFoodGlow();
      }
    }
    static ["spaceFoodGlow"]() {
      const ctx = Renderer.ctx, view = Camera.viewBounds;
      const zoom = Camera.viewport;
      if (!(zoom > 0) || !Number.isFinite(zoom) || !view) return;
      if (!this.spaceFoodSprites) this.spaceFoodSprites = new Map();
      let drawn = 0;
      ctx.save();
      ctx.globalAlpha = 0.75;
      try {
        for (const food of CellData.food) {
          const ox = food.cellType === 2 ? WorldData.position.x : 0;
          const oy = food.cellType === 2 ? WorldData.position.y : 0;
          const x = food.animX - ox, y = food.animY - oy;
          const radius = food.animRadius + Theme.foodSize;
          if (!(radius > 0) || !Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(radius) || radius * zoom < 1.5) continue;
          const extent = radius * 2.4;
          if (x + extent < view.left || x - extent > view.right || y + extent < view.top || y - extent > view.bottom) continue;
          const color = Settings.food === "rainbow" ? "#a6dfff" : Theme.foodColor;
          let sprite = this.spaceFoodSprites.get(color);
          if (!sprite) {
            sprite = this.cacheSpaceFoodGlow(color);
            if (this.spaceFoodSprites.size >= 16) this.spaceFoodSprites.delete(this.spaceFoodSprites.keys().next().value);
            this.spaceFoodSprites.set(color, sprite);
          }
          ctx.drawImage(sprite, x - extent, y - extent, extent * 2, extent * 2);
          if (++drawn >= 400) break;
        }
      } finally { ctx.restore(); }
    }
    static ["cacheSpaceFoodGlow"](color) {
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 64;
      const ctx = sprite.getContext("2d");
      ctx.fillStyle = "#96ddff";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 64, 64);
      const halo = ctx.createRadialGradient(32, 32, 0, 32, 32, 31);
      halo.addColorStop(0, "rgba(255,255,255,0.9)");
      halo.addColorStop(0.2, "rgba(255,255,255,0.7)");
      halo.addColorStop(0.42, "rgba(255,255,255,0.22)");
      halo.addColorStop(1, "rgba(255,255,255,0)");
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = halo; ctx.fillRect(0, 0, 64, 64);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(238,249,255,0.8)";
      ctx.beginPath(); ctx.arc(32, 32, 2.5, 0, Math.PI * 2); ctx.fill();
      return sprite;
    }
    static ["monoColored"]() {
      const pi = Renderer.ctx;
      const akt = Theme.foodSize;
      let vp = CellData.food.length;
      pi.fillStyle = Theme.foodColor;
      for (pi.beginPath(); vp--; ) {
        const aic = {
          x: 0x0,
          y: 0x0,
        };
        const e = CellData.food[vp];
        const ag = 2 === e.cellType ? WorldData.position : aic;
        const sj = e.animRadius + akt;
        pi.moveTo(e.animX - ag.x + sj, e.animY - ag.y);
        pi.arc(e.animX - ag.x, e.animY - ag.y, sj, 0, Renderer.pi2, true);
      }
      pi.closePath();
      pi.fill();
    }
    static ["rainbow"]() {
      let ny = Renderer.ctx;
      let hw = Theme.foodSize;
      for (let ct = CellData.food.length; ct--; ) {
        const abe = {
          x: 0x0,
          y: 0x0,
        };
        const zu = CellData.food[ct];
        const au = 2 === zu.cellType ? WorldData.position : abe;
        const afw = zu.animRadius + hw;
        ny.fillStyle = zu.colorHex;
        if (2 > afw * Camera.viewport) {
          ny.fillRect(zu.animX - au.x - afw, zu.animY - au.y - afw, 2 * afw, 2 * afw);
        } else {
          ny.beginPath();
          ny.arc(zu.animX - au.x, zu.animY - au.y, afw, 0, Renderer.pi2, true);
          ny.closePath();
          ny.fill();
        }
      }
    }
  }
  class BgRender {
    static ["init"]() {
      this.left = 0;
      this.top = 0;
      this.sectorEdge = 0;
      this.edge = 0;
      this.halfSectorEdge = 0;
      this.letters = ["A", "B", "C", "D", "E"];
      this.visible = new Set();
      this.bgImageUrl = null;
      this.bgImageEl = null;
    }
    static ["render"]() {
      if (Settings.moArenaStyle === "space") return this.spaceArena();
      const xf = Settings.bgSectors;
      if ("image" === xf) {
        return this.image();
      }
      if ("off" !== xf) {
        const xn = Renderer.ctx;
        const afq = Theme.gridWidth >> 1;
        this.edge = WorldData.edge - Theme.gridWidth;
        this.left = WorldData.left + afq;
        this.top = WorldData.top + afq;
        this.sectorEdge = 0 | (this.edge / 5);
        this.halfSectorEdge = 0 | (this.edge / 10);
        xn.lineWidth = Theme.gridWidth;
        xn.strokeStyle = Theme.gridColor;
        this.sectors();
        if ("onlyLines" !== xf) {
          xn.textAlign = "center";
          xn.textBaseline = "middle";
          xn.fillStyle = Theme.gridTextColor;
          this.updateViewSectors();
          if ("snowflakes" === xf) {
            this.snowflakes();
          } else if ("stars" === xf) {
            this.stars();
          } else if ("hearts" === xf) {
            this.hearts();
          } else if ("diamonds" === xf) {
            this.diamonds();
          } else {
            this.normal();
          }
        }
      }
    }
    static ["spaceArena"]() {
      const view = Camera.viewBounds, zoom = Camera.viewport;
      const left = WorldData.left, top = WorldData.top, edge = WorldData.edge;
      if (!view || !(edge > 0) || !Number.isFinite(edge) || !(zoom > 0) || !Number.isFinite(zoom)) return;
      const x0 = Math.max(left, view.left), y0 = Math.max(top, view.top);
      const x1 = Math.min(left + edge, view.right), y1 = Math.min(top + edge, view.bottom);
      if (!(x1 > x0) || !(y1 > y0)) return;
      const ctx = Renderer.ctx;
      if (!this.spaceTile) this.spaceTile = this.cacheSpaceTile();
      // The same native camera transform draws the arena. Tile count follows
      // the visible screen, rather than the full map or the number of cells.
      const tileEdge = 640 / zoom;
      const firstX = Math.floor((x0 - left) / tileEdge);
      const firstY = Math.floor((y0 - top) / tileEdge);
      const lastX = Math.ceil((x1 - left) / tileEdge);
      const lastY = Math.ceil((y1 - top) / tileEdge);
      ctx.save();
      try {
        ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.clip();
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#080e19"; ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
        for (let iy = firstY; iy < lastY; iy++) {
          for (let ix = firstX; ix < lastX; ix++) {
            ctx.drawImage(this.spaceTile, left + ix * tileEdge, top + iy * tileEdge, tileEdge, tileEdge);
          }
        }
        // Quiet sector guides retain orientation without giant background art.
        ctx.strokeStyle = "rgba(115,164,220,0.1)";
        ctx.lineWidth = 1 / zoom;
        ctx.beginPath();
        for (let i = 1; i < 5; i++) {
          const x = left + edge * i / 5, y = top + edge * i / 5;
          ctx.moveTo(x, top); ctx.lineTo(x, top + edge);
          ctx.moveTo(left, y); ctx.lineTo(left + edge, y);
        }
        ctx.stroke();
        ctx.fillStyle = "rgba(149,182,217,0.18)";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = (14 / zoom) + "px Ubuntu, sans-serif";
        for (let row = 0; row < 5; row++) {
          for (let column = 0; column < 5; column++) {
            const x = left + edge * (column + 0.5) / 5;
            const y = top + edge * (row + 0.5) / 5;
            if (x >= x0 && x <= x1 && y >= y0 && y <= y1) ctx.fillText(this.letters[row] + (column + 1), x, y);
          }
        }
      } finally { ctx.restore(); }
    }
    static ["cacheSpaceTile"]() {
      const tile = document.createElement("canvas");
      tile.width = tile.height = 640;
      const ctx = tile.getContext("2d");
      let seed = 3102026;
      const random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
      ctx.fillStyle = "#080e19"; ctx.fillRect(0, 0, 640, 640);
      const haze = ctx.createRadialGradient(310, 300, 0, 310, 300, 280);
      haze.addColorStop(0, "rgba(63,80,153,0.09)");
      haze.addColorStop(1, "rgba(63,80,153,0)");
      ctx.fillStyle = haze; ctx.fillRect(0, 0, 640, 640);
      // Stable dim points: no flashing, drifting decorations or extra loop.
      for (let i = 0; i < 55; i++) {
        const x = 8 + random() * 624, y = 8 + random() * 624;
        const radius = 0.45 + random() * 0.65;
        ctx.globalAlpha = 0.16 + random() * 0.24;
        ctx.fillStyle = i % 3 ? "#a1b9d7" : "#93a7d6";
        ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      return tile;
    }
    static ["sectors"]() {
      const qq = Renderer.ctx;
      Camera.viewBounds;
      qq.beginPath();
      qq.rect(this.left + this.sectorEdge, this.top, this.sectorEdge, this.edge);
      qq.rect(this.left + 3 * this.sectorEdge, this.top, this.sectorEdge, this.edge);
      qq.rect(this.left, this.top + this.sectorEdge, this.edge, this.sectorEdge);
      qq.rect(this.left, this.top + 3 * this.sectorEdge, this.edge, this.sectorEdge);
      qq.rect(this.left, this.top, this.edge, this.edge);
      qq.closePath();
      qq.stroke();
    }
    static ["updateViewSectors"]() {
      const r = this.visible;
      r.clear();
      const tu = Camera.viewBounds;
      const gq = 0 | ((tu.left - 200 - WorldData.left) / this.sectorEdge);
      const he = 0 | ((tu.top - 200 - WorldData.top) / this.sectorEdge);
      const cj = 5 - (0 | ((WorldData.right - tu.right - 200) / this.sectorEdge)) - gq;
      const amf = 5 - (0 | ((WorldData.bottom - tu.bottom - 200) / this.sectorEdge)) - he;
      for (let ej = 0; ej < cj; ej++) {
        for (let aja = 0; aja < amf; aja++) {
          r.add(this.letters[he + aja] + (gq + ej + 1));
        }
      }
    }
    static ["normal"]() {
      const qc = Renderer.ctx;
      qc.font = "400 " + Theme.gridTextSize + "px " + Theme.gridTextFont;
      for (let alz = 0; 5 > alz; alz++) {
        const aju = this.top + this.halfSectorEdge + alz * this.sectorEdge;
        for (let mr = 0; 5 > mr; mr++) {
          const sd = this.letters[alz] + (mr + 1);
          if (this.visible.has(sd)) {
            const ain = this.left + this.halfSectorEdge + mr * this.sectorEdge;
            qc.fillText(sd, ain, aju);
          }
        }
      }
    }
    static ["snowflakes"]() {
      this.symbolGrid("â‌†");
    }
    static ["stars"]() {
      this.symbolGrid("âœ¦");
    }
    static ["hearts"]() {
      this.symbolGrid("â‌¤");
    }
    static ["diamonds"]() {
      this.symbolGrid("â‌–");
    }
    static ["symbolGrid"](es) {
      const kd = Renderer.ctx;
      kd.font = "400 " + Theme.gridTextSize + "px Ubuntu";
      for (let ajx = 0; 5 > ajx; ajx++) {
        const aeo = this.top + this.halfSectorEdge + ajx * this.sectorEdge;
        for (let qv = 0; 5 > qv; qv++) {
          const ah = this.letters[ajx] + (qv + 1);
          if (this.visible.has(ah)) {
            const aji = this.left + this.halfSectorEdge + qv * this.sectorEdge;
            kd.fillText(es, aji, aeo);
          }
        }
      }
    }
    static ["image"]() {
      const na = Theme.backgroundImage;
      if (!na) {
        return;
      }
      const xl = this.getBackgroundImage(na);
      if (xl) {
        Renderer.ctx.drawImage(xl, WorldData.left, WorldData.top, WorldData.edge, WorldData.edge);
      }
    }
    static ["getBackgroundImage"](na) {
      if (this.bgImageUrl !== na) {
        this.bgImageUrl = na;
        this.bgImageEl = null;
        // No crossOrigin here on purpose: this image is only ever drawn to
        // the main canvas, and nothing anywhere reads pixel data back off
        // that canvas (toDataURL/getImageData), so there's no tainting risk
        // to guard against - and skipping it means image hosts that don't
        // send Access-Control-Allow-Origin (e.g. i.pinimg.com) still work,
        // instead of being blocked outright.
        const xl = new Image();
        xl.onload = () => {
          if (this.bgImageUrl === na) {
            this.bgImageEl = xl;
          }
        };
        xl.onerror = () => {};
        xl.src = na;
      }
      return this.bgImageEl;
    }
  }
  class Targeting {
    static ["init"]() {
      const aha = {
        x: 0x0,
        y: 0x0,
      };
      const ags = {
        turnedOn: false,
        nick: "",
        worldID: "",
        mass: 0x0,
        cellCount: 0x0,
        position: aha,
        outOfView: false,
      };
      const vz = {
        x: 0x0,
        y: 0x0,
      };
      const kl = {
        turnedOn: false,
        nick: "",
        worldID: "",
        mass: 0x0,
        cellCount: 0x0,
        position: vz,
        outOfView: false,
      };
      const gm = {
        x: 0x0,
        y: 0x0,
      };
      this.target1 = ags;
      this.target2 = kl;
      this.center = gm;
    }
    static ["update"]() {
      if (this.target1.turnedOn || this.target2.turnedOn) {
        const af = this.target1;
        const acc = this.target2;
        af.mass = 0;
        af.position.x = 0;
        af.position.y = 0;
        af.cellCount = 0;
        acc.mass = 0;
        acc.position.x = 0;
        acc.position.y = 0;
        acc.cellCount = 0;
        CellData.cells.forEach((adf) => {
          if (af.turnedOn && af.worldID === adf.worldID) {
            af.position.x += adf.animX;
            af.position.y += adf.animY;
            af.mass += adf.mass;
            af.cellCount++;
          } else if (acc.turnedOn && acc.worldID === adf.worldID) {
            acc.position.x += adf.animX;
            acc.position.y += adf.animY;
            acc.mass += adf.mass;
            acc.cellCount++;
          }
        });
        af.mass |= 0;
        acc.mass |= 0;
        let rr = 0;
        let sv = 0;
        let pn = 0;
        if (af.turnedOn) {
          if (0 < af.cellCount) {
            af.position.x /= af.cellCount;
            af.position.y /= af.cellCount;
            af.outOfView = false;
            sv += af.position.x;
            pn += af.position.y;
            rr++;
          } else {
            af.outOfView = true;
          }
        }
        if (acc.turnedOn) {
          if (0 < acc.cellCount) {
            acc.position.x /= acc.cellCount;
            acc.position.y /= acc.cellCount;
            acc.outOfView = false;
            sv += acc.position.x;
            pn += acc.position.y;
            rr++;
          } else {
            acc.outOfView = true;
          }
        }
        if (0 < rr) {
          this.center.x = 0 | (sv / rr);
          this.center.y = 0 | (pn / rr);
        }
      }
    }
    static ["lockTarget"](kv, ahg, us) {
      if (!Camera.freeSpectate) {
        Actions.toggleSpectate();
      }
      let ig = 199996164;
      let acl = false;
      CellData.cells.forEach((ahd) => {
        if (!(ahd.isFood || ahd.isVirus || ahd.isEjected)) {
          const ru = this.getDistanceSquare(kv, ahg, ahd.animX, ahd.animY);
          if (ru < ig) {
            ig = ru;
            acl = ahd;
          }
        }
      });
      if (acl) {
        if (acl.isUnnamed) {
          Notifications.alert("Drag+", Language.current.notif.target_unnamed);
        } else {
          const ou = this[1 === us ? "target1" : "target2"];
          ou.turnedOn = true;
          ou.nick = acl.nick;
          ou.worldID = acl.worldID;
          ou.outOfView = false;
          TargetingHud.targetMode();
        }
      }
    }
    static ["getDistanceSquare"](ade, bg, ho, ya) {
      const x = ho - ade;
      const tj = ya - bg;
      return x * x + tj * tj;
    }
    static ["reset"]() {
      if (!this.isTurnedOn) {
        Actions.toggleSpectate();
      }
      if (Camera.freeSpectate) {
        TargetingHud.mouseViewport();
      } else {
        TargetingHud.topViewport();
      }
      this.target1.turnedOn = false;
      this.target2.turnedOn = false;
    }
    static ["getMass"](acf) {
      return (acf * acf) / 100;
    }
    static get ["isTurnedOn"]() {
      return this.target1.turnedOn || this.target2.turnedOn;
    }
  }
  class RgbCycle {
    static ["init"]() {
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.targetR = 0;
      this.targetG = 0;
      this.targetB = 0;
      this.color = "#000000";
      this.lastTime = 0;
    }
    static ["update"]() {
      this.r += (this.targetR - this.r) / 80;
      this.g += (this.targetG - this.g) / 80;
      this.b += (this.targetB - this.b) / 80;
      this.color = "#" + (16777216 + (this.r << 16) + (this.g << 8) + (0 | this.b)).toString(16).slice(1);
      const oe = Math.min(GameLoop.time - this.lastTime - 2000, 33);
      if (!(0 > oe)) {
        this.lastTime = GameLoop.time + oe;
        this.newTargetRGB();
      }
    }
    static ["newTargetRGB"]() {
      let gx = [255, 7, 0 | (255 * Math.random())];
      gx.sort(() => 0.5 - Math.random());
      this.targetR = gx[0];
      this.targetG = gx[1];
      this.targetB = gx[2];
    }
    static ["getColor"](bz, aho) {
      return "rgb(" + (0 | (bz.r * aho)) + "," + (0 | (bz.g * aho)) + "," + (0 | (bz.b * aho)) + ")";
    }
  }
  class DataReader {
    constructor(xc) {
      this.dataView = xc;
      this.index = 0;
      this.maxIndex = xc.byteLength;
    }
    ["readUInt8"]() {
      const fu = this.dataView.getUint8(this.index, true);
      this.index++;
      return fu;
    }
    ["readInt8"]() {
      const eu = this.dataView.getInt8(this.index, true);
      this.index++;
      return eu;
    }
    ["readUInt16"]() {
      const aht = this.dataView.getUint16(this.index, true);
      this.index += 2;
      return aht;
    }
    ["readInt16"]() {
      const adj = this.dataView.getInt16(this.index, true);
      this.index += 2;
      return adj;
    }
    ["readUInt32"]() {
      const aje = this.dataView.getUint32(this.index, true);
      this.index += 4;
      return aje;
    }
    ["readInt32"]() {
      const ni = this.dataView.getInt32(this.index, true);
      this.index += 4;
      return ni;
    }
    ["readFloat32"]() {
      const abr = this.dataView.getFloat32(this.index, true);
      this.index += 4;
      return abr;
    }
    ["readFloat64"]() {
      const hc = this.dataView.getFloat64(this.index, true);
      this.index += 8;
      return hc;
    }
    ["readUTF8string"]() {
      let hp;
      let ve = "";
      for (; 0 !== (hp = this.readUInt8()) && !this.endOfBuffer(); ) {
        ve += String.fromCharCode(hp);
      }
      return ve;
    }
    ["readStringZeroUtf8"]() {
      let yb = "";
      let yx = 0;
      for (var abo = this.index; abo < this.dataView.byteLength; abo++) {
        if (this.dataView.getUint8(abo, true)) {
          yx++;
        } else {
          break;
        }
      }
      yb += new TextDecoder().decode(new Uint8Array(this.dataView.buffer, this.index, yx));
      this.index += yx + 1;
      return yb;
    }
    ["readEscapedUTF8string"]() {
      const rm = this.readUTF8string();
      return decodeURIComponent(escape(rm));
    }
    ["decompress"]() {
      const sn = new Uint8Array(this.dataView.buffer);
      const ku = this.readUInt32();
      const ms = new Uint8Array(ku);
      LZ4.decodeBlock(sn.slice(5), ms);
      this.dataView = new DataView(ms.buffer);
      this.index = 0;
      this.maxIndex = this.dataView.byteLength;
    }
    ["endOfBuffer"]() {
      return this.index >= this.maxIndex;
    }
  }
  class WsConnection {
    static ["init"]() {
      const yt = {
        in: 0x0,
        out: 0x0,
      };
      this.ip = null;
      this.ws = null;
      this.connected = false;
      this.ws2 = null;
      this.connected2 = false;
      this.ws3 = null;
      this.connected3 = false;
      this.backupReady = false;
      this.backupConnecting = false;
      this.backupRetryTimer = null;
      this.intentionalDisconnect = false;
      this.captchaQueue = Promise.resolve();
      this.packetCount = yt;
      this.widgetIds = {};
      this.pendingResolvers = {};
      this.restartAt = null;
      this.pendingRespawns = new Set();
      this.pendingPromotions = new Set();
      this.promotionInFlight = 0;
      this.autoRespawnGeneration = 0;
      this.recycleLocks = new Set();
      this.backupPhase = "Waiting";
      this.backupPhaseSince = Date.now();
      this.tab1Authed = false;
      this.tab2Queued = false;
      this.tab2GuestKicks = 0;
      this.tab2Gen = (this.tab2Gen || 0) + 1;
      // 2026 Shield (hello/HelloAck/attest) state, one entry per tab.
      this._shield = {};
      this._shieldQueue = {};
      this.registerKeyBindings();
      this.startConnectionStatus();
      window.DRAG_PLUS = {
        status: () => this.statusSnapshot(),
        kill: () => this.recycleActiveCell(),
        accounts: () => Account.slots(),
        setAccount: (slot, uuid, accessToken) => Account.setSlot(slot, uuid, accessToken),
        clearAccounts: () => Account.clearSlots(),
      };
      WorldData.init();
    }
    // ------------------------------------------------------------------
    // 2026 Shield handshake. The game server now rejects any connection that
    // does not complete the WASM hello exchange first ("No session"). After
    // the server answers with opcode 209 (HelloAck) every packet we send must
    // be `seal()`ed and every game frame arrives inside opcode 210 frames.
    // A fresh ShieldSession is created per tab/socket.
    // ------------------------------------------------------------------
    static ["shieldEntry"](slot) {
      if (!this._shield) this._shield = {};
      if (!this._shieldQueue) this._shieldQueue = {};
      if (!this._shield[slot]) {
        this._shield[slot] = { session: null, established: false };
      }
      return this._shield[slot];
    }
    static ["shieldReadyPromise"](timeout = 15000) {
      return new Promise((resolve) => {
        if (window.__SHIELD__ && window.__SHIELD__.ready) {
          return resolve(window.__SHIELD__);
        }
        const started = Date.now();
        const poll = () => {
          if (window.__SHIELD__ && window.__SHIELD__.ready) {
            return resolve(window.__SHIELD__);
          }
          if (Date.now() - started > timeout) {
            return resolve(window.__SHIELD__ || null);
          }
          setTimeout(poll, 100);
        };
        poll();
      });
    }
    static ["shieldHello"](slot) {
      this.shieldReadyPromise()
        .then((sh) => {
          if (!sh || !sh.ready || !this.ip) { MoDiagnostics.note("Player " + slot, "Shield library not ready"); return; }
          const entry = this._shield && this._shield[slot];
          if (!entry || entry.session) return;
          let session;
          try {
            session = new sh.ShieldSession(sh.shield_build_id());
          } catch (e) {
            MoDiagnostics.note("Player " + slot, "Shield session creation failed");
            console.log("[Drag+] shield session error (tab " + slot + ")", e);
            return;
          }
          MoDiagnostics.note("Player " + slot, "Shield session created");
          entry.session = session;
          let hello = null;
          try {
            hello = session.hello();
          } catch (e) {
            MoDiagnostics.note("Player " + slot, "Shield hello failed");
            console.log("[Drag+] shield hello error (tab " + slot + ")", e);
            return;
          }
          const socket = 1 === slot ? this.ws : 2 === slot ? this.ws2 : this.ws3;
          if (socket && socket.readyState === socket.OPEN) {
            socket.send(hello);
            MoDiagnostics.note("Player " + slot, "Shield hello sent");
            console.log("[Drag+] shield hello sent (tab " + slot + ") len=" + hello.length);
          }
        })
        .catch((e) => console.log("[Drag+] shield hello failed (tab " + slot + ")", e));
    }
    static ["flushShieldQueue"](slot) {
      const q = (this._shieldQueue && this._shieldQueue[slot]) || [];
      if (this._shieldQueue) this._shieldQueue[slot] = [];
      for (const p of q) {
        this.send(p, slot);
      }
    }
    static ["resetShield"](slot) {
      if (this._shield && this._shield[slot]) {
        const entry = this._shield[slot];
        if (entry.session && entry.session.free) {
          try {
            entry.session.free();
          } catch (e) {}
        }
        this._shield[slot] = null;
      }
      if (this._shieldQueue) this._shieldQueue[slot] = [];
    }
    static ["shieldHandleFrame"](ev, slot) {
      const entry = this._shield && this._shield[slot];
      if (!entry || !entry.session) return false;
      const raw = new Uint8Array(ev.data);
      if (!raw.length) return false;
      const first = raw[0];
      if (209 === first) {
        // HelloAck -> session established, flush queued (login/captcha/ping).
        try {
          entry.session.onHelloAck(raw, "");
        } catch (e) {
          console.log("[Drag+] shield onHelloAck error (tab " + slot + ")", e);
          return true;
        }
        entry.established = true;
        MoDiagnostics.note("Player " + slot, "Shield handshake established");
        if (this._protoWaiting && this._protoWaiting[slot]) {
          this._protoWaiting[slot] = false;
          clearTimeout(this["_protoTimer" + slot]);
          this.flushProtoQueue(slot);
        }
        this.flushShieldQueue(slot);
        console.log("[Drag+] shield established (tab " + slot + ")");
        return true;
      }
      if (210 === first) {
        // Sealed game frame.
        let inner;
        try {
          inner = entry.session.open(raw);
        } catch (e) {
          console.log("[Drag+] shield open error (tab " + slot + ")", e);
          return true;
        }
        if (inner && inner.length > 1 && 212 === inner[0]) {
          // Attestation challenge: answer with a clean (0) bitmask.
          try {
            const sh = window.__SHIELD__;
            const attest = sh.shield_attest(() => 0, inner.subarray(1));
            this.send(attest, slot);
            console.log("[Drag+] shield attestation answered (tab " + slot + ")");
          } catch (e) {
            console.log("[Drag+] shield attest error (tab " + slot + ")", e);
          }
          return true;
        }
        if (inner && inner.length && 123 === inner[0]) {
          try {
            JSON.parse(new TextDecoder().decode(inner));
          } catch (e) {}
          return true;
        }
        if (inner && inner.length) {
          const dv = new DataView(inner.buffer, inner.byteOffset, inner.byteLength);
          PacketParser.parse(dv, slot);
        }
        return true;
      }
      return false;
    }
    // Each tab needs its OWN Cloudflare Turnstile widget/container. Rendering
    // the same container twice targets the same single element, so the 2nd
    // render() silently fails to bind and tab 2's promise never resolves ->
    // handshake2 never completes -> ws2 never sends its auth packet -> server
    // drops it as idle.
    // The captcha queue serializes token requests so the standby tab never
    // renders a third widget while an earlier one is still pending.
    static ["getToken"](slot) {
      MoDiagnostics.note("Player " + slot, "Verification queued");
      const socket = 1 === slot ? this.ws : 2 === slot ? this.ws2 : this.ws3;
      const task = this.captchaQueue.then(() => {
        if (socket !== (1 === slot ? this.ws : 2 === slot ? this.ws2 : this.ws3)) throw new Error("Queued verification belongs to a closed connection");
        return this._getToken(slot);
      });
      this.captchaQueue = task.catch(() => {});
      return task;
    }
    static ["cancelVerification"](slot) {
      const pending = this.pendingResolvers && this.pendingResolvers[slot];
      if (pending) pending.reject(new Error("Connection closed during verification"));
      const id = this.widgetIds && this.widgetIds[slot];
      if (id !== undefined && id !== null) {
        try { if (window.turnstile) window.turnstile.remove(id); } catch (_) {}
        delete this.widgetIds[slot];
      }
    }
    static ["loadTurnstileScript"]() {
      if (document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) return;
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async = true;
      s.defer = true;
      (document.head || document.documentElement).appendChild(s);
    }
    static async ["_getToken"](slot) {
      return new Promise((resolve, reject) => {
        const container = document.getElementById("cf-turnstile-" + slot);
        if (!container) { reject(new Error("Verification container missing for player " + slot)); return; }
        if (slot === 1) Notifications.warn("Drag+", "Verifying Player 1 connection, please wait..");
        let settled = false, sdkTimer, timeout;
        const finish = (error, token) => {
          if (settled) return;
          settled = true;
          clearTimeout(timeout); clearTimeout(sdkTimer);
          if (this.pendingResolvers[slot] === pending) delete this.pendingResolvers[slot];
          MoDiagnostics.note("Player " + slot, error ? "Verification failed or cancelled" : "Verification completed");
          if (error) reject(error); else resolve(token);
        };
        const pending = { resolve: token => finish(null, token), reject: error => finish(error) };
        this.pendingResolvers[slot] = pending;
        timeout = setTimeout(() => pending.reject(new Error("Verification timed out for player " + slot)), 120000);
        this.loadTurnstileScript();
        let attempts = 0;
        const render = () => {
          if (settled) return;
          if (!window.turnstile || !window.turnstile.render) {
            if (++attempts > 40) { pending.reject(new Error("Verification service failed to load")); return; }
            sdkTimer = setTimeout(render, 300); return;
          }
          try {
            const old = this.widgetIds[slot];
            if (old !== undefined && old !== null) { window.turnstile.remove(old); delete this.widgetIds[slot]; }
            container.innerHTML = "";
            container.style.visibility = "visible";
            container.style.display = "block";
            MoDiagnostics.note("Player " + slot, "Verification widget rendering");
            const id = window.turnstile.render(container, {
              sitekey: "0x4AAAAAAEkQx2FZR28MuMJC",
              execution: "execute", appearance: "interaction-only",
              callback: token => {
                if (settled || this.pendingResolvers[slot] !== pending) return;
                if (!token) { pending.reject(new Error("Empty verification token")); return; }
                const loading = document.getElementById("loading-screen");
                if (loading) $(loading).fadeOut(500, function () { $(this).remove(); });
                Notifications.warn("Drag+", "Verification complete for Player " + slot);
                pending.resolve(token);
              },
              "expired-callback": () => pending.reject(new Error("Verification expired for player " + slot)),
              "error-callback": () => pending.reject(new Error("Verification failed for player " + slot))
            });
            this.widgetIds[slot] = id;
            window.turnstile.execute(id);
          } catch (error) { pending.reject(new Error("Could not start verification: " + error.message)); }
        };
        render();
      });
    }
    static ["connect"](hy, aff) {
      if ("string" != typeof hy) {
        return Notifications.warn("Drag+", "Server IP is invalid");
      }
      if (!hy) return;
      const go = () => {
        this.disconnect();
        this.resetData();
        this.ip = hy;
        this.intentionalDisconnect = false;
        this.tab1Authed = false;
        this.tab2Queued = false;
        this.tab2GuestKicks = 0;
        this.tab2Gen = (this.tab2Gen || 0) + 1;
        this.createSocket(1);
        console.log("Connecting to: " + hy + " (Tab 1 first, Tab 2 follows after Tab 1 auth)");
      };
      this.shieldReadyPromise().then((sh) => {
        if (sh && sh.ready) {
          sh.ready.then(go).catch(go);
        } else {
          go();
        }
      });
    }
    static serverReady(slot) {
      slot = Number(slot);
      if (slot !== 1 && slot !== 2) return false;
      const socket = slot === 1 ? this.ws : this.ws2;
      if (!socket || socket.readyState !== socket.OPEN || this.intentionalDisconnect) return false;
      if (slot === 1 ? this.connected : this.connected2) return true;
      MoDiagnostics.note("Player " + slot, "Server confirmed ready (254)");
      if (slot === 1) {
        this.connected = true;
        this.tab1Authed = true;
        this.queueTab2();
      } else {
        this.connected2 = true;
        if (Player._isAlive) setTimeout(() => {
          if (this.ws2 === socket && this.connected2 && this.ws2Open) PacketSender.spawnTab(2);
        }, 400);
      }
      PacketSender.handleDisabledProperty(!this.connected);
      this.connectionStatus();
      return true;
    }
    static ["queueTab2"]() {
      // The 2026 game server now kicks every other connection from the same
      // IP ("New connection from this browser") unless the existing
      // connections are authenticated accounts. Tab 2 therefore never opens
      // until Tab 1 has finished its full handshake AND carries a valid
      // account game token, so the two sockets can never kick each other
      // in a loop. If no account is logged in yet, keep retrying so Tab 2
      // connects as soon as the user logs in.
      if (this.tab2Queued || this.ws2) return;
      this.tab2Queued = true;
      this.tab2WarnedGuest = false;
      const gen = this.tab2Gen;
      const attempt = () => {
        if (this.tab2Gen !== gen || this.intentionalDisconnect || !this.ip) {
          if (this.tab2Gen === gen) this.tab2Queued = false;
          return;
        }
        if (this.ws2) return;
        if (!this.tab1Authed || !this.connected) {
          setTimeout(attempt, 600);
          return;
        }
        if (!Account.loginStringFor(1)) {
          if (!this.tab2WarnedGuest) {
            this.tab2WarnedGuest = true;
            Notifications.warn("Drag+", "3rb.io now blocks two guest tabs from the same IP. Log in with an account to enable Tab 2.");
          }
          setTimeout(attempt, 3000);
          return;
        }
        if (!Account.gameToken1) {
          Account.fetchSlotToken(1);
          setTimeout(attempt, 700);
          return;
        }
        this.createSocket(2);
      };
      setTimeout(attempt, 1500);
    }
    static ["retryTab2Later"]() {
      this.tab2Queued = false;
      if (this.intentionalDisconnect || !this.ip) return;
      if (!Account.loginStringFor(2) && 3 <= (this.tab2GuestKicks || 0)) {
        Notifications.warn("Drag+", "Tab 2 keeps getting kicked as guest - log in with a second account to keep Tab 2 alive.");
        return;
      }
      this.queueTab2();
    }
    static ["createSocket"](slot) {
      if (!this.ip) return null;
      // 2026 proto-map negotiation state (see handleProto). Each socket starts
      // "waiting" for the server's MapInit packet; every packet we send while
      // waiting is queued and flushed once the mapping is resolved.
      this._protoWaiting = this._protoWaiting || {};
      this._protoQueue = this._protoQueue || {};
      this._protoSend = this._protoSend || {};
      this._protoRecv = this._protoRecv || {};
      this._protoWaiting[slot] = true;
      this._protoQueue[slot] = [];
      this._protoSend[slot] = null;
      this._protoRecv[slot] = null;
      clearTimeout(this["_protoTimer" + slot]);
      this["_protoTimer" + slot] = setTimeout(() => {
        if (this._protoWaiting && this._protoWaiting[slot]) {
          this._protoWaiting[slot] = false;
          this._protoSend[slot] = null;
          this._protoRecv[slot] = null;
          this.flushProtoQueue(slot);
        }
      }, 700);
      MoDiagnostics.note("Player " + slot, "Opening socket");
      const socket = new WebSocket(this.ip, "d1elnjtfbyzq7a");
      if (1 === slot) this.ws = socket;
      else if (2 === slot) this.ws2 = socket;
      else this.ws3 = socket;
      this.resetShield(slot);
      this.shieldEntry(slot);
      this.bindSocket(socket, slot);
      return socket;
    }
    static ["bindSocket"](socket, slot) {
      socket.binaryType = "arraybuffer";
      const current = () => socket === (slot === 1 ? this.ws : slot === 2 ? this.ws2 : this.ws3);
      socket.onopen = () => { if (current()) this.onOpen(slot); };
      socket.onmessage = (ev) => { if (current()) this.onMessage(ev, slot); };
      socket.onclose = (ev) => this.onClose(slot, socket, ev);
      socket.onerror = () => this.onError(slot);
    }
    // Standby Tab 3 was removed: the new 3rb.io server kicks any extra
    // connection from the same IP, so a third socket can never survive.
    static ["scheduleBackup"](delay = 1500) {
      return false;
    }
    static ["connectBackup"]() {
      return false;
    }
    static ["disconnect"]() {
      this.intentionalDisconnect = true;
      [1, 2, 3].forEach(slot => this.cancelVerification(slot));
      clearTimeout(this.backupRetryTimer);
      [this.ws, this.ws2, this.ws3].forEach((socket) => {
        if (!socket) return;
        socket.onopen = socket.onmessage = socket.onclose = socket.onerror = null;
        try {
          socket.close();
        } catch (e) {}
      });
      PacketSender.stopAllPingLoops();
      this.ws = null;
      this.connected = false;
      this.ws2 = null;
      this.connected2 = false;
      this.ws3 = null;
      this.connected3 = false;
      this.backupReady = false;
      this.backupConnecting = false;
      this.pendingPromotions.clear();
      this.pendingRespawns.clear();
      this.promotionInFlight = 0;
      this.setBackupPhase("Waiting");
      this.ip = null;
      this.resetShield(1);
      this.resetShield(2);
      this.resetShield(3);
    }
    static ["resetData"]() {
      CellData.cells.clear();
      CellData.myCellsIDs.clear();
      CellData.myCells.clear();
      CellData.cells2.clear();
      CellData.myCellsIDs2.clear();
      CellData.myCells2.clear();
      CellData.cells3.clear();
      CellData.myCellsIDs3.clear();
      CellData.myCells3.clear();
      Player._isAlive = false;
      Player._isAlive2 = false;
      // dead()/dead2() leave `type` pointed at whichever tab was still
      // alive when the OTHER one died, so it can be stuck on 2 from the
      // previous session. spawn() spawns whichever tab `typeID` currently
      // points at, so without this a reconnect (auto or manual server
      // switch) would silently route every "Play" click to tab 2 only,
      // making tab 1 look completely unplayable.
      Player.type = 1;
    }
    static ["send"](acr, yj) {
      this.packetCount.out++;
      if (this._protoWaiting && this._protoWaiting[yj]) {
        (this._protoQueue[yj] = this._protoQueue[yj] || []).push(acr);
        return;
      }
      let payload = acr;
      if (this._protoSend && this._protoSend[yj]) {
        const remap = new Uint8Array(acr.byteLength);
        remap.set(new Uint8Array(acr));
        remap[0] = this._protoSend[yj][remap[0]];
        payload = remap.buffer;
      }
      // 2026 Shield: before the session is established, buffer packets; after
      // it is established, seal every packet (seal() output carries its own
      // 0xD2 envelope tag, exactly like the real client).
      const entry = this._shield && this._shield[yj];
      if (entry) {
        if (!entry.session || !entry.established) {
          (this._shieldQueue[yj] = this._shieldQueue[yj] || []).push(payload);
          return;
        }
        try {
          payload = entry.session.seal(new Uint8Array(payload));
        } catch (e) {
          console.log("[Drag+] shield seal error (tab " + yj + ")", e);
        }
      }
      if ((1 === yj && this.wsOpen) || (2 === yj && this.ws2Open) || (3 === yj && this.ws3Open)) MoDiagnostics.packet(yj, "out", acr, payload);
      if (1 === yj && this.wsOpen) {
        this.ws.send(payload);
      } else if (2 === yj && this.ws2Open) {
        this.ws2.send(payload);
      } else if (3 === yj && this.ws3Open) {
        this.ws3.send(payload);
      }
    }
    static ["onOpen"](nq) {
      MoDiagnostics.note("Player " + nq, "Socket opened");
      RelaySender.ip();
      if (1 === nq) SpamDetect.init();
      // 2026 Shield: the server requires the WASM hello before anything else.
      this.shieldHello(nq);
      PacketSender.init(nq);
      if (3 !== nq) Notifications.alert("Drag+", "Tab " + nq + " connected");
    }
    static ["onMessage"](alh, adu) {
      this.packetCount["in"]++;
      if ("string" === typeof alh.data) {
        try {
          const o = JSON.parse(alh.data);
          if (o && "ban_ui" === o.type) {
            console.log("[Drag+] ban_ui received");
          }
        } catch (e) {}
        return;
      }
      MoDiagnostics.packet(adu, "in", alh.data);
      // 2026 Shield frames (209 HelloAck / 210 sealed game frame).
      if (this.shieldHandleFrame(alh, adu)) {
        return;
      }
      // 2026 proto-map negotiation: the server may open with a MapInit packet
      // (opcode 240, 546 bytes, byte[1]===1). While we haven't resolved it,
      // check the FIRST incoming frame - if it's MapInit, apply the opcode
      // remap tables and ack; if it's anything else the server is legacy and
      // we flush the queued handshake untouched. A consumed MapInit frame is
      // not fed into the normal parser.
      if (this._protoWaiting && this._protoWaiting[adu] && this.handleProto(alh, adu)) {
        return;
      }
      // Slot 3 no longer exists (removed): only tabs 1 and 2 are parsed.
      if (3 === adu) return;
      PacketParser.getBuffer(alh, adu);
    }
    static ["handleProto"](alh, adu) {
      const raw = new Uint8Array(alh.data);
      if (240 !== raw[0] || 546 !== raw.length || 1 !== raw[1]) {
        // Legacy server: no opcode remapping. Flush what we queued, then let
        // this first frame be parsed normally.
        this._protoWaiting[adu] = false;
        this._protoSend[adu] = null;
        this._protoRecv[adu] = null;
        clearTimeout(this["_protoTimer" + adu]);
        this.flushProtoQueue(adu);
        console.log("[proto] Tab " + adu + ": legacy (no opcode map)");
        return false;
      }
      // MapInit: sendMap[r] = raw[18+r]; recvMap[raw[274+r]] = r.
      const sm = new Uint8Array(256);
      const rm = new Uint8Array(256);
      for (let r = 0; r < 256; r++) {
        sm[r] = raw[18 + r];
        rm[raw[274 + r]] = r;
      }
      this._protoSend[adu] = sm;
      this._protoRecv[adu] = rm;
      this._protoWaiting[adu] = false;
      clearTimeout(this["_protoTimer" + adu]);
      console.log("[proto] Tab " + adu + ": MapInit applied, opcode remap active");
      // Ack with the raw 17-byte MapAck (opcode 241 + raw[530..546)) - it is
      // sent directly, NOT through send(), so the map itself never remaps it.
      const ack = new Uint8Array(17);
      ack[0] = 241;
      ack.set(raw.subarray(530, 546), 1);
      const ws = 1 === adu ? this.ws : 2 === adu ? this.ws2 : this.ws3;
      if (ws && ws.readyState === ws.OPEN) {
        ws.send(ack.buffer);
      }
      this.flushProtoQueue(adu);
      return true;
    }
    static ["flushProtoQueue"](adu) {
      const q = this._protoQueue[adu] || [];
      this._protoQueue[adu] = [];
      for (const p of q) {
        this.send(p, adu);
      }
    }
    static ["onClose"](cq, socket, ev) {
      const numericTab = Number(cq);
      const current = numericTab === 1 ? this.ws : numericTab === 2 ? this.ws2 : this.ws3;
      if (current !== socket) return false;
      this.cancelVerification(numericTab);
      PacketSender.stopPingLoop(numericTab);
      clearTimeout(this["_protoTimer" + numericTab]);
      if (this.intentionalDisconnect) return false;
      if (numericTab !== 1 && numericTab !== 2) return false;
      const reason = ev && ev.reason ? String(ev.reason) : "";
      MoDiagnostics.packetClose(numericTab, ev && ev.code);
      MoDiagnostics.note("Player " + numericTab, "Socket closed (code " + Number(ev && ev.code || 0) + "). " + MoDiagnostics.closeReason(reason));
      if (/new connection/i.test(reason)) {
        Notifications.warn("Drag+", "Tab " + numericTab + " was replaced by another connection from this IP (new 3rb.io rule)");
        if (2 === numericTab) {
          this.tab2GuestKicks = (this.tab2GuestKicks || 0) + 1;
        }
      }
      if (numericTab === 1) {
        this.ws = null;
        this.connected = false;
        this.tab1Authed = false;
      } else {
        this.ws2 = null;
        this.connected2 = false;
      }
      PacketSender.handleDisabledProperty(!this.connected);
      this.resetShield(numericTab);
      PacketParser.clearCells(numericTab);
      Notifications.alert("Drag+", "Tab " + numericTab + " disconnected");
      console.log("Websocket " + numericTab + " closed" + (reason ? " (" + reason + ")" : ""));
      if (1 === numericTab) {
        setTimeout(() => {
          if (this.intentionalDisconnect || !this.ip || this.ws) return;
          this.createSocket(1);
        }, 1000);
      } else {
        this.retryTab2Later();
      }
      if (!(this.wsOpen || this.ws2Open)) {
        MainMenu.open();
      }
      this.connectionStatus();
      return true;
    }
    static ["onError"](alo) {
      MoDiagnostics.note("Player " + alo, "WebSocket error; browser console has network details");
      if (!(this.wsOpen || this.ws2Open)) {
        MainMenu.open();
      }
      if (1 === alo) {
        this.connected = false;
        this.tab1Authed = false;
      } else if (2 === alo) {
        this.connected2 = false;
      }
      PacketSender.handleDisabledProperty(!this.connected);
      console.log("Websocket " + alo + " errored out!");
    }
    static get ["wsOpen"]() {
      return this.ws && this.ws.readyState === this.ws.OPEN;
    }
    static get ["ws2Open"]() {
      return this.ws2 && this.ws2.readyState === this.ws2.OPEN;
    }
    static get ["ws3Open"]() {
      return this.ws3 && this.ws3.readyState === this.ws3.OPEN;
    }
    // Close a single tab's WebSocket (leaves other tabs intact)
    static ["closeTab"](tab) {
      this.cancelVerification(tab);
      const ws = tab === 1 ? this.ws : tab === 2 ? this.ws2 : this.ws3;
      if (ws && ws.close) {
        ws.close();
      }
      if (tab === 1) { this.ws = null; this.connected = false; }
      else if (tab === 2) { this.ws2 = null; this.connected2 = false; }
      else { this.ws3 = null; this.connected3 = false; this.backupReady = false; }
      PacketParser.clearCells(tab);
    }
    // ------------------------------------------------------------------
    // Standby Tab 3 was removed: only Tab 1 and Tab 2 remain. These stubs
    // keep the old hotkeys and call sites harmless.
    // ------------------------------------------------------------------
    static ["setBackupPhase"](phase) {
      this.backupPhase = String(phase || "Waiting");
      this.backupPhaseSince = Date.now();
      this.connectionStatus();
    }
    static ["promoteBackup"](tab, reason = "Standby promotion") {
      // Standby Tab 3 was removed (the new server kicks a third connection).
      return false;
    }
    static ["queuePromotion"](tab, reason = "Playable tab died") {
      return false;
    }
    static ["pumpPromotionQueue"]() {
      return false;
    }
    static ["recycleActiveCell"]() {
      // Standby Tab 3 was removed: K / /kill now just respawns the active
      // tab's cell instead of promoting a hidden third socket.
      const tab = Number(Player.typeID || 1);
      const alive = tab === 2 ? Player._isAlive2 : Player._isAlive;
      if (!alive) {
        Notifications.warn("Drag+", "Tab " + tab + " is not alive.");
        return false;
      }
      if (this.recycleLocks.has(tab)) return false;
      this.recycleLocks.add(tab);
      PacketSender.spawnTab(tab);
      setTimeout(() => this.recycleLocks.delete(tab), 1800);
      return true;
    }
    static ["statusSnapshot"]() {
      const tabStatus = (socket, connected, alive, pending) => {
        if (alive) return "Alive";
        if (!socket) return this.ip ? "Reconnecting" : "Offline";
        if (socket.readyState === WebSocket.CONNECTING) return "Connecting";
        if (socket.readyState === WebSocket.OPEN) return connected ? (pending ? "Spawning" : "Ready") : "Verifying";
        return "Reconnecting";
      };
      return {
        activeTab: Player.typeID,
        tab1: tabStatus(this.ws, this.connected, Player._isAlive, this.pendingRespawns.has(1)),
        tab2: tabStatus(this.ws2, this.connected2, Player._isAlive2, this.pendingRespawns.has(2)),
      };
    }
    static ["connectionStatus"]() {
      const status = this.statusSnapshot();
      let hud = document.getElementById("drag-plus-connection-status");
      if (!hud && document.body) {
        hud = document.createElement("div");
        hud.id = "drag-plus-connection-status";
        hud.style.cssText = "position:fixed;right:5px;z-index:2147483000;text-align:center;font-family:ubuntu,sans-serif;font-size:11px;color:rgba(255,255,255,.75);pointer-events:none;white-space:nowrap;text-shadow:0 1px 2px #000;padding-bottom:3px";
        hud.title = "Drag+ Multibox - Tab 1 and Tab 2 connection status.";
        document.body.appendChild(hud);
      }
      if (hud) {
        const restartEl = document.getElementById("server-restart-countdown");
        if (restartEl) {
          const restartBottom = parseInt(window.getComputedStyle(restartEl).bottom) || 235;
          hud.style.bottom = (restartBottom + 20) + "px";
        } else {
          hud.style.bottom = "255px";
        }
        hud.style.width = (Minimap.size || 200) + "px";
        hud.textContent = "Tab1:" + status.tab1 + " | Tab2:" + status.tab2;
      }
      return status;
    }
    static ["startConnectionStatus"]() {
      if (this.connectionStatusTimer) clearInterval(this.connectionStatusTimer);
      this.connectionStatusTimer = setInterval(() => this.connectionStatus(), 500);
      setTimeout(() => this.connectionStatus(), 0);
    }
    static ["registerKeyBindings"]() {
      if (this.keyBindingsRegistered) return;
      this.keyBindingsRegistered = true;
      document.addEventListener("keydown", (event) => {
        if (event.code !== "KeyK" || event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;
        if (event.target && event.target.matches && event.target.matches("input, textarea, select, [contenteditable='true']")) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        this.recycleActiveCell();
      }, true);
    }
  }
  class SpamDetect {
    static ["init"]() {
      this.messages = new Map();
      this.spammers = [];
    }
    static ["checkSpam"](gf, dm) {
      if (-1 !== this.spammers.indexOf(gf)) {
        return true;
      }
      if (this.messages.has(gf)) {
        const ajb = this.messages.get(gf);
        if ((ajb == dm && dm.length >= 30) || (ajb.length >= 30 && dm.length >= 30)) {
          this.spammers.push(gf);
          Notifications.alert("Drag+", "Spammer Catched -> " + gf);
          return true;
        }
      } else if (dm.length >= 30) {
        this.messages.set(gf, dm);
      }
      if (this.messages.size >= 10) {
        this.messages.clear();
      }
      return false;
    }
  }
  class PacketParser {
    static ["getBuffer"](oj, zt) {
      const adr = new DataView(oj.data);
      this.parse(adr, zt);
    }
    static ["parse"](amd, ii) {
      const aam = new DataReader(amd);
      let ahy = aam.readUInt8();
      // 2026 proto-map: incoming opcodes are remapped through the receive
      // table once the server negotiated a map for this socket.
      if (WsConnection._protoRecv && WsConnection._protoRecv[ii]) {
        ahy = WsConnection._protoRecv[ii][ahy];
      }
      if (254 === ahy) {
        // The original client marks verification accepted on server Restart (254).
        WsConnection.serverReady(ii);
      } else if (16 === ahy) {
        this.worldUpdate(aam, ii);
      } else if (17 === ahy) {
        this.getSpectateData(aam);
      } else if (18 === ahy) {
        this.clearCells(ii);
      } else if (20 === ahy) {
        this.clearMyCells(ii);
      } else if (32 === ahy) {
        this.getMyCellId(aam, ii);
      } else if (50 === ahy && 1 === ii) {
        this.getLeaderboard(aam);
      } else if (49 === ahy && 1 === ii) {
        this.getLeaderboardFFA(aam);
      } else if (65 === ahy) {
        this.borderUpdate(aam, ii);
      } else if (85 === ahy) {
        this.handlePartyCode(aam);
      } else if (87 === ahy) {
        this.handleParty(aam);
      } else if (88 === ahy && 1 === ii) {
        this.handleLevel(aam);
      } else if (154 === ahy && 1 === ii) {
        this.handleSweets(aam);
      }
      if (86 === ahy && 1 === ii) {
        this.handleChat(aam);
      }
    }
    static ["handlePartyCode"](ajj) {
      const fg = ajj.readStringZeroUtf8();
      if ("invalid" === fg) {
        if (PartyManager.awaitingResponse) {
          PartyManager.awaitingResponse = false;
          PartyManager.awaitingCreate = false;
          Notifications.warn("Party", "Invalid party code.");
        }
        return;
      }
      const aia = PartyManager.awaitingCreate;
      if (PartyManager.awaitingResponse) {
        PartyManager.awaitingResponse = false;
        PartyManager.awaitingCreate = false;
        $("#party-token").val(fg);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(fg).catch(() => {});
        }
        Notifications.warn("Party", aia ? "Party created - code " + fg + " copied to clipboard." : "Joined party " + fg + ".");
      }
      PartyManager.code = fg;
      PartyManager.inParty = true;
      RelayWs.updateRoom();
      if (aia && PacketSender.chekConnection(2)) {
        PacketSender.joinParty(fg, 2);
      }
    }
    static ["handleSweets"](akl) {
      // Opcode 154: sweet pickup (uint16 count + x/y). Track the running
      // total for the status line; refresh is throttled by updateUI call.
      const gained = akl.readUInt16();
      if (0 < gained) {
        Account.sweets += gained;
        Account.updateUI();
      }
    }
    static ["handleLevel"](ajz) {
      // Opcode 88: server pushes the account's total XP (uint32, little
      // endian) + optional bonus coins (uint8 flag + uint32). We only need
      // the XP to track the current level and detect level-ups.
      Account.setXp(ajz.readUInt32());
    }
    static ["handleParty"](akb) {
      const tc = akb.readUInt16();
      const aix = new Set();
      const aig = [];
      for (let el = 0; el < tc; el++) {
        const aac = akb.readUInt32();
        const ajp = akb.readStringZeroUtf8();
        const mf = akb.readUInt8();
        const afm = akb.readUInt8();
        const akf = akb.readUInt8();
        const rb = akb.readInt32();
        const aie = akb.readInt32();
        const fn = akb.readInt32();
        aig.push({ id: aac, nick: ajp, mass: rb, x: aie, y: fn });
        if (ajp === Player.nick) {
          // Both tabs spawn under the same nick, and tab1/tab2 already see
          // each other via the multibox relay (RelayData.teamPlayers) - if
          // the server includes your own connection(s) in this roster too,
          // rendering them again here would just be a redundant/confusing
          // second dot for your own other tab. Still counts as "seen" so a
          // stale entry (from before this filter existed) gets pruned below.
          aix.add(aac);
          continue;
        }
        const yr = PartyManager.getMember(aac);
        yr.nick = ajp;
        yr.colorHex = "#" + (0x1000000 + (mf << 16) + (afm << 8) + akf).toString(16).slice(1);
        yr.mass = rb;
        yr.x = aie;
        yr.y = fn;
        yr.isAlive = 1;
        yr.timeStamp = GameLoop.time;
        aix.add(aac);
      }
      for (const ky of PartyManager.members.keys()) {
        if (!aix.has(ky)) {
          PartyManager.members.delete(ky);
        }
      }
    }
    static ["handleChat"](yn) {
      // 2026 chat packet: int32 senderId, int32 target, uint8 r, string a,
      // uint8x3 color, string msg, string nick, string l, uint8 c, uint8 u,
      // string d. id1 is the sender's real player id (matches cell.ownerId/
      // WorldData.pID namespace) - needed so a chat message's nick can be
      // right-clicked into the same party-invite menu as a map cell.
      const mz = yn.readInt32();
      yn.readInt32();
      const vip = yn.readUInt8();
      yn.readStringZeroUtf8();
      const cr = yn.readUInt8();
      const cg = yn.readUInt8();
      const cb2 = yn.readUInt8();
      var cb = yn.readStringZeroUtf8().replace("[]", "");
      var pv = yn.readStringZeroUtf8();
      yn.readStringZeroUtf8();
      yn.readUInt8();
      const muted = yn.readUInt8();
      yn.readStringZeroUtf8();
      Notifications.gameChat(cb, pv, mz, { r: cr, g: cg, b: cb2, vip: !!vip, muted: !!muted });
    }
    static ["worldUpdate"](vi, vd = 1) {
      GameLoop.refreshTime();
      var xh;
      var adi;
      var hl;
      var jd = false;
      var akq = null;
      var ajl = null;
      var ox = undefined;
      var we = undefined;
      var ci = undefined;
      var eb = undefined;
      var tz = undefined;
      var wn = undefined;
      var alx = undefined;
      var alm = undefined;
      var sf = undefined;
      var ale = undefined;
      var wa = "on" === Settings.eatAnimation;
      var akj = vi.readUInt16();
      for (var akx = 0; akx < akj; akx++) {
        var xh;
        var adi;
        var hl;
        var jd;
        var akq;
        var ajl;
        var ox;
        var we;
        var ci;
        var eb;
        var tz;
        var wn;
        var alx;
        var alm;
        var sf;
        var ale;
        var wa;
        var akj;
        var akx;
        ox = vi.readUInt32();
        we = vi.readUInt32();
        if (wa) {
          CellData.eatCell(ox, we, vd);
        }
      }
      for (; 0 !== (ci = vi.readUInt32()); ) {
        akq = CellData.getCell(ci, vd);
        eb = vi.readInt32();
        tz = vi.readInt32();
        wn = vi.readUInt16();
        if (akq.init) {
          akq.animate();
          akq.x = akq.animX;
          akq.y = akq.animY;
          akq.radius = akq.animRadius;
        } else {
          akq.animX = akq.x = eb;
          akq.animY = akq.y = tz;
          akq.radius = akq.animRadius = wn;
          akq.lastUpdateTime = GameLoop.time;
          akq.init = true;
        }
        akq.x = eb;
        akq.y = tz;
        akq.radius = wn;
        akq.lastUpdateTime = GameLoop.time;
        // The 2026 protocol widened the per-cell flags word from 8 to 16
        // bits (adds vip/gold/sweet bits at 256/512/1024) - must read 16.
        ajl = vi.readUInt16();
        sf = !!(1 & ajl);
        alm = !!(4 & ajl);
        alx = !!(8 & ajl);
        xh = !!(16 & ajl);
        adi = !!(32 & ajl);
        hl = !!(64 & ajl);
        ale = !!(128 & ajl);
        if (xh) {
          vi.readUInt32();
          vi.readUInt8();
        }
        if (hl) {
          // owner/"parent" player id - see the ownerId comment in Cell's
          // constructor. Only resent when it changes, so only overwrite when
          // this delta actually carries it (matches nick/skin below).
          akq.ownerId = vi.readInt32();
        }
        if (2 & ajl) {
          akq.setColor(vi.readUInt8(), vi.readUInt8(), vi.readUInt8());
        } else {
          null;
        }
        jd = !!(32 & ajl);
        if (alm) {
          // readStringZeroUtf8 (TextDecoder), NOT readEscapedUTF8string - the
          // original client (3rb.js handleNodes) reads skin/nick this way for
          // exactly this packet. readEscapedUTF8string's escape()/
          // decodeURIComponent() trick throws URIError on any byte sequence
          // that isn't strictly valid UTF-8, and that throw is uncaught here,
          // silently aborting the rest of this packet's cell loop - leaving
          // whichever cell was mid-parse (and everyone after it) stuck with
          // stale nick/skin/isFood forever, even though its x/y/radius (read
          // earlier above) keep updating fine. That's the "white, no name,
          // still moving" cell bug.
          akq.skin = vi.readStringZeroUtf8();
          if (akq.skin.split("/")[1] !== "undefined") {
            Renderer.get3rbSkin(akq.skin);
          }
        }
        akq.nick = alx ? vi.readStringZeroUtf8() : null;
        akq.bNick = ale ? vi.readStringZeroUtf8() : null;
        akq.vip = !!(256 & ajl);
        akq.isVirus = sf;
        akq.isEjected = jd;
        // classify AFTER isVirus/isEjected/ownerId are up to date for this
        // packet - doing this earlier misclassified brand-new cells (e.g.
        // fresh split pieces) as food for one tick, since they still had
        // stale defaults at that point.
        akq.isFood = this.checkIsFood(akq);
      }
      akj = vi.readUInt16();
      for (akx = 0; akx < akj; akx++) {
        we = vi.readUInt32();
        CellData.removeCell(we, vd);
      }
    }
    static ["checkIsFood"](vn) {
      // Matches 3rb.js's handleNodes exactly: a cell is Food unless the
      // server attached an owner/parent player id to it (and it's not a
      // virus/ejected mass). NOT based on whether it currently has a
      // nickname - real players can be legitimately unnamed, and a cell's
      // nick can lag its ownerId by a packet or two, both of which used to
      // get misclassified as food (flat single-color render, no name/skin/
      // mass) until the next full resync, e.g. on split.
      return !vn.isMine && !vn.isVirus && !vn.isEjected && -1 === vn.ownerId;
    }
    static ["getSpectateData"](m) {
      Camera.spectatePoint.x = m.readFloat32();
      Camera.spectatePoint.y = m.readFloat32();
      Camera.autoZoomViewport = m.readFloat32();
    }
    static ["clearCells"](tp) {
      if (1 === tp) {
        CellData.cells.clear();
        CellData.myCellsIDs.clear();
        CellData.myCells.clear();
      } else if (2 === tp) {
        CellData.cells2.clear();
        CellData.myCellsIDs2.clear();
        CellData.myCells2.clear();
      } else {
        CellData.cells3.clear();
        CellData.myCellsIDs3.clear();
        CellData.myCells3.clear();
      }
    }
    static ["clearMyCells"](mp) {
      if (1 === mp) {
        CellData.myCellsIDs.clear();
        CellData.myCells.clear();
      } else if (2 === mp) {
        CellData.myCellsIDs2.clear();
        CellData.myCells2.clear();
      } else {
        CellData.myCellsIDs3.clear();
        CellData.myCells3.clear();
      }
    }
    static ["getMyCellId"](agp, aft) {
      const ago = 1 === aft ? CellData.myCellsIDs : 2 === aft ? CellData.myCellsIDs2 : CellData.myCellsIDs3;
      const hq = agp.readUInt32();
      ago.add(hq);
    }
    static ["getLeaderboard"](abx) {
      Leaderboard.clear();
      let fo;
      let im;
      let aeh = abx.readUInt16();
      for (fo = 0; fo < aeh; fo++) {
        im = (im = abx.readStringZeroUtf8()) || "unnamed cell";
        Leaderboard.add(im, fo + 1, false, false, false);
      }
      Leaderboard.update();
    }
    static ["getLeaderboardFFA"](ew) {
      Leaderboard.clear();
      let uf;
      let pl;
      let acp;
      let cv;
      let vs = ew.readUInt16();
      for (uf = 0; uf < vs; uf++) {
        pl = ew.readUInt16();
        acp = ew.readUInt32();
        cv = ew.readStringZeroUtf8() || "unnamed cell";
        Leaderboard.add(cv, pl || 1, false, false, false, acp);
      }
      Leaderboard.update();
    }
    static ["getLeaderboardTeam"](ajy) {
      Leaderboard.clear();
      let aex;
      let aa = ajy.readUInt32();
      let hi = [];
      for (aex = 0; aex <= aa && !ajy.endOfBuffer(); aex++) {
        hi.push(ajy.readFloat32());
      }
      Leaderboard.team(hi[0], hi[1], hi[2]);
    }
    static ["borderUpdate"](hf, ee) {
      const zc = 0 | hf.readFloat64();
      const aax = 0 | hf.readFloat64();
      const afv = 0 | hf.readFloat64();
      const tk = 0 | hf.readFloat64();
      // Trailing field 3rb.js's own handleBorder also reads (this.game.pID)
      // - this connection's own real player id, used to tell "my own cell"
      // apart from everyone else's for the right-click party-invite menu.
      const ajr = hf.readUInt32();
      if (1 === ee) {
        WorldData.update(zc, aax, afv, tk);
        WorldData.pID = ajr;
      } else if (2 === ee) {
        WorldData.update2(zc, aax, afv, tk);
        WorldData.pID2 = ajr;
      }
    }
    static ["bytesToColor"](cr, un, ix) {
      return (
        "#" +
        ("00" + (~~cr).toString(16)).slice(-2) +
        ("00" + (~~un).toString(16)).slice(-2) +
        ("00" + (~~ix).toString(16)).slice(-2)
      );
    }
  }
  class PacketSender {
    static async ["init"](adx) {
      if (3 !== adx) {
        this.handleDisabledProperty(!WsConnection.connected);
      }
      this.stopPingLoop(adx);
      const socket = 1 === adx ? WsConnection.ws : WsConnection.ws2;
      const account = 1 === adx ? Account.slot1 : Account.slot2;
      if ((1 === adx || 2 === adx) && account && account.uuid) await Account.fetchSlotToken(adx);
      if (socket !== (1 === adx ? WsConnection.ws : WsConnection.ws2)) return;
      this.handshake1(adx);
      const ok = await this.handshake2(adx);
      if (socket !== (1 === adx ? WsConnection.ws : WsConnection.ws2)) return;
      if (!ok) {
        const target = 1 === adx ? WsConnection.ws : 2 === adx ? WsConnection.ws2 : WsConnection.ws3;
        try {
          target && target.close();
        } catch (e) {}
        return;
      }
      MoDiagnostics.note("Player " + adx, "Verification submitted; waiting for server ready (254)");
      this.initPingLoop(adx);
      this.accountPacketSent = false;
      Camera.isSpectating = false;
      Camera.freeSpectate = false;
      console.log("Connected to: " + WsConnection.ip);
      this.handleDisabledProperty(!WsConnection.connected);
    }
    static ["handleDisabledProperty"](du) {
      document.querySelector("#button-play").disabled = du;
      document.querySelector("#button-spectate").disabled = du;
    }
    static ["createView"](dc) {
      return new DataView(new ArrayBuffer(dc));
    }
    static ["chekConnection"](iz) {
      return (1 === iz && WsConnection.connected) || (2 === iz && WsConnection.connected2);
    }
    static ["sendPacket"](yl, abl) {
      WsConnection.send(yl.buffer, abl);
    }
    static ["initPingLoop"](cm) {
      this["pingInterval" + cm] = setInterval(() => {
        WsConnection.send(new Uint8Array([100]).buffer, cm);
      }, 1000);
    }
    static ["stopPingLoop"](cm) {
      const key = "pingInterval" + cm;
      if (this[key]) {
        clearInterval(this[key]);
        this[key] = null;
      }
    }
    static ["stopAllPingLoops"]() {
      [1, 2, 3].forEach((slot) => this.stopPingLoop(slot));
    }
    static ["handshake1"](ahn) {
      // Login packet: [255] + UTF-16LE(string) + zero terminator (00 00).
      // Guest (no account) sends an empty string -> [255, 0, 0]. A logged-in
      // account sends [255, unicode(uuid|gameToken), 0, 0].
      // Each tab carries its OWN account: the game server allows a single
      // connection per account (concurrent-login protection) and, since the
      // last update, kicks every second guest connection from the same IP
      // ("New connection from this browser"). Tab 1 uses slot 1, Tab 2 uses
      // slot 2 (falling back to guest).
      const str = 1 === Number(ahn) ? Account.loginStringFor(1) : Account.loginStringFor(2);
      console.log("Drag+ Login packet (tab " + ahn + "): " + (str ? "account, " + (3 + str.length * 2) + " bytes" : "guest"));
      if (!str) {
        const px = new Uint8Array([255, 0, 0]);
        WsConnection.send(px, ahn);
        return;
      }
      const bytes = new Uint8Array(3 + str.length * 2);
      bytes[0] = 255;
      for (let i = 0; i < str.length; i++) {
        const cc = str.charCodeAt(i);
        bytes[1 + i * 2] = cc & 0xff;
        bytes[2 + i * 2] = (cc >> 8) & 0xff;
      }
      WsConnection.send(bytes, ahn);
    }
    static ["resendLogin"]() {
      [1, 2].forEach((tab) => {
        if ((1 === tab && WsConnection.connected) || (2 === tab && WsConnection.connected2)) {
          this.handshake1(tab);
        }
      });
    }
    static async ["handshake2"](oq) {
      if (3 !== oq && WsConnection.connected && WsConnection.connected2) {
        return true;
      }
      const socket = 1 === oq ? WsConnection.ws : 2 === oq ? WsConnection.ws2 : WsConnection.ws3;
      var add;
      try {
        add = await WsConnection.getToken(oq);
      } catch (nb) {
        console.log("Multibox: failed to get captcha token for tab " + oq + ":", nb);
        Notifications.warn("Drag+", "Captcha failed for Tab " + oq + " - retrying the connection.");
        return false;
      }
      if (socket !== (1 === oq ? WsConnection.ws : 2 === oq ? WsConnection.ws2 : WsConnection.ws3)) return false;
      var fj = new DataView(new ArrayBuffer(add.length + 6));
      var ip = 0;
      fj.setUint8(ip++, 123);
      fj.setUint8(ip++, 6);
      // The 2026 server validates Cloudflare Turnstile tokens and expects the
      // "ts:" provider prefix (the same `prefix + ":" + token` the official
      // client sends inside the Protocol packet).
      ("ts:" + add).split("").forEach((cw) => fj.setUint8(ip++, cw.charCodeAt(0)));
      fj.setUint8(ip++, 0);
      WsConnection.send(fj.buffer, oq);
      return true;
    }
    // The standby tab is transport-only: it must never spawn a visible cell.
    static ["spawnTab"](tab) {
      tab = Number(tab);
      if (tab !== 1 && tab !== 2) return false;
      this.spawn(tab);
      return true;
    }
    static ["mouse"](afk, u) {
      const afj = Player.typeID;
      if (this.chekConnection(afj)) {
        const fa = this.createView(17);
        fa.setUint8(0, 16, true);
        fa.setFloat64(1, Math.fround(~~afk), true);
        fa.setFloat64(9, Math.fround(~~u), true);
        this.sendPacket(fa, afj);
      }
    }
    static ["chat"](am, jj = Player.typeID) {
      const command = String(am || "").trim().toLowerCase();
      if (command === "/kill" || command === "/recycle") {
        WsConnection.recycleActiveCell();
        return;
      }
      // Only Tab 1 carries the logged-in account, so route chat there
      // (guests on Tabs 2/3 get rejected by the server anyway). Fall back
      // to the active tab if Tab 1 is not currently connected.
      if (Account.loggedIn) {
        jj = 1;
        if (!this.chekConnection(jj)) {
          jj = Player.typeID;
        }
      }
      if (this.chekConnection(jj)) {
        const gh = unescape(encodeURIComponent(am));
        const ex = this.createView(6 + gh.length);
        ex.setUint8(0, 86);
        ex.setUint8(1, 255);
        ex.setUint8(2, 255);
        ex.setUint8(3, 255);
        ex.setUint8(4, 255);
        for (let ald = gh.length; ald--; ) {
          ex.setUint8(ald + 5, gh.charCodeAt(ald), true);
        }
        ex.setUint8(5 + gh.length, 0, true);
        this.sendPacket(ex, jj);
      }
    }
    static ["spectate"](aik) {
      const nf = aik || 1;
      if (this.chekConnection(nf) || (!Player.isAlive && !Camera.isSpectating) || aik) {
        const pt = this.createView(1);
        pt.setUint8(0, 1, true);
        this.sendPacket(pt, nf);
        Camera.isSpectating = true;
        if (!Player.isAlive) {
          Camera.targetViewport = 0.1;
        }
      }
    }
    static ["spectateBackground"](xp) {
      // Same request packet as spectate(), but deliberately skips touching
      // Camera.isSpectating/targetViewport - those drive the visible
      // camera and spectate UI, and this is only meant to make an idle tab
      // feed spectatePoint in the background while the other tab is being
      // actively played.
      if (this.chekConnection(xp)) {
        const fs = this.createView(1);
        fs.setUint8(0, 1, true);
        this.sendPacket(fs, xp);
      }
    }
    static ["spawn"](bTab) {
      const n = bTab || Player.typeID;
      if (this.chekConnection(n) && ((1 === n && !Player._isAlive) || (2 === n && !Player._isAlive2))) {
        Camera.isSpectating = false;
        let xnick = 2 === n && Player.nick2 ? Player.nick2 : Player.nick;
        if ("" === xnick) {
          xnick = "An unnamed cell";
        }
        let xt = unescape(encodeURIComponent(xnick));
        let h = unescape(encodeURIComponent("free/" + TeamList.arbSkin));
        const ul = {
          n: xt,
        };
        if (Player.arbSkin) {
          ul.s = h;
          ul.w = "";
        }
        // VIP flag: the real client sends v:true in the spawn/Name packet so
        // the server marks the connection as VIP (gold color + crown on the
        // cell, isVip on its chat messages). Tab 1 carries the account.
        if (1 === n && Account.isVip()) {
          ul.v = true;
        }
        const ur = JSON.stringify(ul);
        const ng = ur.length;
        const nv = this.createView(2 + ng);
        nv.setUint8(0, 0, true);
        for (let mm = 0; mm < ng; mm++) {
          nv.setUint8(mm + 1, ur.charCodeAt(mm), true);
        }
        nv.setUint8(ng + 1, 0, true);
        this.sendPacket(nv, n);
        // Re-sync identity with the relay on every spawn. RelaySender.init()
        // (which fires on relay connect) can run before Player.init() has
        // populated _nick from the #nick input - that race leaves the relay
        // broadcasting an empty nick forever, even though this very spawn
        // just used the real name (so the game server/leaderboard shows it
        // while teammates see a blank roster entry + nameless minimap dot).
        // nick()/skin() are no-ops when the relay isn't connected.
        RelaySender.nick();
        RelaySender.skin();
      }
    }
    static ["split"]() {
      const fv = Player.typeID;
      if (this.chekConnection(fv)) {
        const kp = this.createView(1);
        kp.setUint8(0, 17, true);
        this.sendPacket(kp, fv);
      }
    }
    static ["eject"]() {
      const is = Player.typeID;
      if (this.chekConnection(is)) {
        const ed = this.createView(1);
        ed.setUint8(0, 21, true);
        this.sendPacket(ed, is);
      }
    }
    static ["freeSpectate"]() {
      if (this.chekConnection(1)) {
        Camera.freeSpectate = !Camera.freeSpectate;
        const hk = this.createView(1);
        hk.setUint8(0, 18, true);
        this.sendPacket(hk, 1);
      }
    }
    // Native party protocol (opcode 85/0x55, matches 3rb.js's own
    // `sendParty`): byte 1 is the sub-type - 0 = create, 1 = join (followed
    // by the zero-terminated party code, "#" included).
    static ["createParty"](ajt) {
      if (this.chekConnection(ajt)) {
        const lq = this.createView(2);
        lq.setUint8(0, 85, true);
        lq.setUint8(1, 0, true);
        this.sendPacket(lq, ajt);
      }
    }
    static ["joinParty"](ahz, ajt) {
      if (this.chekConnection(ajt)) {
        const zj = unescape(encodeURIComponent(ahz));
        const akk = this.createView(2 + zj.length + 1);
        akk.setUint8(0, 85, true);
        akk.setUint8(1, 1, true);
        for (let dj = 0; dj < zj.length; dj++) {
          akk.setUint8(2 + dj, zj.charCodeAt(dj), true);
        }
        akk.setUint8(2 + zj.length, 0, true);
        this.sendPacket(akk, ajt);
      }
    }
    static ["leaveParty"](aiv) {
      if (this.chekConnection(aiv)) {
        const rn = this.createView(2);
        rn.setUint8(0, 85, true);
        rn.setUint8(1, 2, true);
        this.sendPacket(rn, aiv);
      }
    }
  }
  class Account {
    static ["init"]() {
      this.uuid = localStorage.getItem("active_session_id") || "";
      this.nick = localStorage.getItem("active_session_nick") || "";
      this.gameToken = null;
      this.gameTokenAt = 0;
      this.levels = null;
      this.xp = -1;
      this.level = 0;
      this.levelAnnounced = false;
      this.coins = 0;
      this.sweets = 0;
      this.vipEndAt = null;
      this.xpBoost = null;
      this.massBoost = null;
      this._xpPoll = null;
      this._tokenLoop = null;
      this.slot1 = this.readSlot("dragplus_account_1");
      this.slot2 = this.readSlot("dragplus_account_2");
      this.gameToken1 = null;
      this.gameTokenAt1 = 0;
      this.gameToken2 = null;
      this.gameTokenAt2 = 0;
      window.authResponse = (res) => {
        try {
          this.onAuthResponse(res);
        } catch (e) {
          console.log("authResponse error", e);
        }
      };
      window.addEventListener("storage", (e) => this.handleStorageChange(e));
      this.bindUI();
      this.updateUI();
      if (this.loggedIn) {
        this.refreshGameToken();
        this.loadLevels();
        this.startXpPoll();
      }
      this.captureCurrentSession();
      this.startTokenLoop();
      this.updateUI();
    }
    static ["readCookie"](name) {
      const parts = ("; " + document.cookie).split("; " + name + "=");
      return 2 === parts.length ? parts.pop().split(";").shift() : "";
    }
    static ["readSlot"](key) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const obj = JSON.parse(raw);
        if (obj && obj.uuid) return obj;
      } catch (e) {}
      return null;
    }
    static ["writeSlot"](key, obj) {
      try {
        localStorage.setItem(key, JSON.stringify(obj));
      } catch (e) {}
    }
    static ["captureCurrentSession"]() {
      // The php/Auth.php popup logs the browser into one account at a time
      // (PHPSESSID + optional access_token cookie). Every successful login
      // is captured here: the first account becomes slot 1 (Tab 1), a
      // DIFFERENT account becomes slot 2 (Tab 2). Game tokens are fetched
      // right away while the browser session belongs to that account.
      const uuid = this.uuid;
      if (!uuid || "logout" === uuid) return 0;
      let slot;
      if (this.slot1 && this.slot1.uuid === uuid) {
        slot = 1;
      } else if (!this.slot1) {
        slot = 1;
      } else {
        slot = 2;
      }
      const entry = { uuid: uuid, nick: this.nick, accessToken: "" };
      entry.accessToken = this.lastAuthAccessToken || this.readCookie("access_token") || "";
      const previous = 1 === slot ? this.slot1 : this.slot2;
      if (!previous || previous.uuid !== entry.uuid || (previous.accessToken || "") !== entry.accessToken) {
        this["gameToken" + slot] = null;
        this["gameTokenAt" + slot] = 0;
      }
      if (1 === slot) {
        this.slot1 = entry;
        this.writeSlot("dragplus_account_1", entry);
      } else {
        this.slot2 = entry;
        this.writeSlot("dragplus_account_2", entry);
        this.gameToken2 = null;
        this.gameTokenAt2 = 0;
      }
      this.fetchSlotToken(slot);
      // The access_token cookie can land a moment after the popup callback
      // fires - retry reading it a few times and upgrade the slot if found.
      const retries = [800, 2500, 6000];
      for (const delay of retries) {
        setTimeout(() => {
          const at = this.readCookie("access_token");
          if (!at) return;
          const cur = 1 === slot ? this.slot1 : this.slot2;
          if (!cur || cur.uuid !== uuid) return;
          if (!cur.accessToken) {
            cur.accessToken = at;
            this.writeSlot(1 === slot ? "dragplus_account_1" : "dragplus_account_2", cur);
            this.fetchSlotToken(slot);
          }
        }, delay);
      }
      this.updateUI();
      // Account captured mid-game: kick the Tab 2 connection gate so it
      // opens as soon as Tab 1 carries this account.
      if (WsConnection && WsConnection.connected && !WsConnection.ws2) {
        WsConnection.queueTab2();
      }
      return slot;
    }
    static ["startTokenLoop"]() {
      if (this._tokenLoop) return;
      const tick = () => {
        this.fetchSlotToken(1);
        this.fetchSlotToken(2);
        this.warnStaleSlot(1);
        this.warnStaleSlot(2);
      };
      tick();
      this._tokenLoop = setInterval(tick, 180000);
    }
    static ["warnStaleSlot"](slot) {
      const entry = 1 === slot ? this.slot1 : this.slot2;
      const tk = 1 === slot ? this.gameToken1 : this.gameToken2;
      const at = 1 === slot ? this.gameTokenAt1 : this.gameTokenAt2;
      if (!entry || !tk) return;
      this._staleWarned = this._staleWarned || {};
      if (!entry.accessToken && this.uuid && "logout" !== this.uuid && this.uuid !== entry.uuid && 300000 < Date.now() - at) {
        if (!this._staleWarned[slot]) {
          this._staleWarned[slot] = true;
          Notifications.warn("Login", "Tab " + slot + " account game token expired and cannot auto-refresh (browser session is on the other account). Login again with that account to refresh it.");
        }
      } else {
        this._staleWarned[slot] = false;
      }
    }
    static ["fetchSlotToken"](slot) {
      const entry = 1 === slot ? this.slot1 : this.slot2;
      if (!entry || !entry.uuid) return Promise.resolve(null);
      const key = entry.uuid + "\0" + (entry.accessToken || "");
      this._slotRequests = this._slotRequests || {};
      const pending = this._slotRequests[slot];
      if (pending && pending.key === key) return pending.promise;
      const token = 1 === slot ? this.gameToken1 : this.gameToken2;
      const at = 1 === slot ? this.gameTokenAt1 : this.gameTokenAt2;
      if (token && Date.now() - at < 150000) return Promise.resolve(token);
      if (!entry.accessToken && this.uuid && "logout" !== this.uuid && this.uuid !== entry.uuid) return Promise.resolve(null);
      const request = { key, promise: null };
      this._slotRequests[slot] = request;
      const current = () => {
        const saved = 1 === slot ? this.slot1 : this.slot2;
        return this._slotRequests[slot] === request && saved && saved.uuid + "\0" + (saved.accessToken || "") === key;
      };
      const opts = entry.accessToken
        ? { credentials: "omit", headers: { Authorization: "Bearer " + entry.accessToken } }
        : { credentials: "include" };
      request.promise = fetch("https://3rb.io/api/auth/game-token", opts)
        .then(r => { MoDiagnostics.note("Account slot " + slot, "Token HTTP " + Number(r.status || 0)); return r.ok ? r.json() : null; })
        .then(d => {
          if (!current()) return null;
          const tk = d && (d.token || (d.data && d.data.token));
          this._slotFetchFail = this._slotFetchFail || {};
          if (!tk) {
            this._slotFetchFail[slot] = (this._slotFetchFail[slot] || 0) + 1;
            Notifications.warn("Login", "Account session needs signing in again. Open Account to log in.");
            return null;
          }
          MoDiagnostics.note("Account slot " + slot, "Fresh token received");
          this._slotFetchFail[slot] = 0;
          this["gameToken" + slot] = tk;
          this["gameTokenAt" + slot] = Date.now();
          if (this.uuid === entry.uuid) { this.gameToken = tk; this.gameTokenAt = Date.now(); }
          Notifications.command("Login", "Game token ready (Tab " + slot + " account)");
          PacketSender.resendLogin();
          if (WsConnection && WsConnection.connected && !WsConnection.ws2) WsConnection.queueTab2();
          return tk;
        })
        .catch(() => { MoDiagnostics.note("Account slot " + slot, "Token request failed"); return null; })
        .finally(() => { if (this._slotRequests[slot] === request) delete this._slotRequests[slot]; });
      return request.promise;
    }
    static ["loginStringFor"](slot) {
      if (1 === slot) {
        if (!this.slot1 || !this.slot1.uuid) return "";
        return this.gameToken1 ? this.slot1.uuid + "|" + this.gameToken1 : this.slot1.uuid;
      }
      if (!this.slot2 || !this.slot2.uuid) return "";
      // The server allows one connection per account: never send the same
      // account from Tab 2 or it will be kicked in a reconnect loop.
      if (this.slot1 && this.slot1.uuid === this.slot2.uuid) return "";
      return this.gameToken2 ? this.slot2.uuid + "|" + this.gameToken2 : this.slot2.uuid;
    }
    static ["slots"]() {
      return {
        tab1: this.slot1 ? { uuid: this.slot1.uuid, nick: this.slot1.nick, hasToken: !!this.slot1.accessToken, gameToken: !!this.gameToken1 } : null,
        tab2: this.slot2 ? { uuid: this.slot2.uuid, nick: this.slot2.nick, hasToken: !!this.slot2.accessToken, gameToken: !!this.gameToken2 } : null,
      };
    }
    static ["setSlot"](slot, uuid, accessToken) {
      const entry = { uuid: String(uuid || ""), nick: "", accessToken: String(accessToken || "") };
      if (1 === slot) {
        this.slot1 = entry.uuid ? entry : null;
        this.writeSlot("dragplus_account_1", this.slot1);
        this.gameToken1 = null;
        this.gameTokenAt1 = 0;
      } else {
        this.slot2 = entry.uuid ? entry : null;
        this.writeSlot("dragplus_account_2", this.slot2);
        this.gameToken2 = null;
        this.gameTokenAt2 = 0;
      }
      this.fetchSlotToken(slot);
      this.updateUI();
      PacketSender.resendLogin();
    }
    static ["clearSlots"]() {
      this._slotRequests = {};
      this.slot1 = null;
      this.slot2 = null;
      this.gameToken1 = null;
      this.gameToken2 = null;
      localStorage.removeItem("dragplus_account_1");
      localStorage.removeItem("dragplus_account_2");
      this.updateUI();
      PacketSender.resendLogin();
    }
    static get ["loggedIn"]() {
      return !!this.uuid && "logout" !== this.uuid;
    }
    static ["buildLoginString"](u) {
      if (!u) {
        return "";
      }
      if ("logout" === u || 0 === u.indexOf("locked-")) {
        return u;
      }
      return this.gameToken ? u + "|" + this.gameToken : u;
    }
    static ["openLogin"](provider) {
      // Match the game's own popup (createWindow) exactly: same window name
      // "3rb.io", same "scrollbars=yes, width=..., height=..., top=..., left=..."
      // features string. window.open from a Tampermonkey sandbox is often a
      // no-op (silently returns null, nothing opens), so route through the
      // real page window (unsafeWindow) when available - the popup needs the
      // real opener so php/Auth.php can call window.opener.authResponse().
      const w = "undefined" !== typeof unsafeWindow ? unsafeWindow : window;
      const top = (w.screenTop || w.screenY || 0) + ((w.outerHeight || w.innerHeight || 0) - 520) / 2;
      const left = (w.screenLeft || w.screenX || 0) + ((w.outerWidth || w.innerWidth || 0) - 400) / 2;
      const features = "scrollbars=yes, width=400, height=520, top=" + top + ", left=" + left;
      const win = w.open("php/Auth.php?provider=" + provider, "3rb.io", features);
      if (!win) {
        Notifications.warn("Login", "Login popup was blocked - please allow popups for 3rb.io and try again.");
      }
      return win;
    }
    static ["onAuthResponse"](e) {
      if (!e || e.error) {
        Notifications.warn("Login", (e && e.error) || "Login error!");
        return;
      }
      this.lastAuthAccessToken = e.access_token || e.accessToken || "";
      this.uuid = e.uuid || "";
      this.nick = e.Name || "";
      if (this.uuid) {
        localStorage.setItem("active_session_id", this.uuid);
        localStorage.setItem("active_session_nick", this.nick);
      }
      if (e && (e.access_token || e.accessToken)) {
        this.lastAuthAccessToken = e.access_token || e.accessToken;
      }
      this.captureCurrentSession();
      this.gameToken = null;
      this.gameTokenAt = 0;
      this.levels = (e && e.Shop && e.Shop.Levels) || this.levels;
      this.coins = parseInt(e && e.Coins) || 0;
      this.sweets = parseInt(e && e.Sweets) || 0;
      if (e && e.vipEndAt) this.vipEndAt = e.vipEndAt;
      if (e && e["XP Boost"]) this.xpBoost = e["XP Boost"];
      if (e && e["Mass Boost"]) this.massBoost = e["Mass Boost"];
      this.refreshGameToken();
      this.updateUI();
      PacketSender.resendLogin();
      const axp = parseInt(e && e.XP);
      if (!isNaN(axp) && 0 <= axp) {
        this.setXp(axp);
      }
      this.loadLevels();
      this.startXpPoll();
    }
    static ["refreshGameToken"]() {
      if (!this.loggedIn) { this.gameToken = null; return Promise.resolve(null); }
      let slot = this.slot1 && this.slot1.uuid === this.uuid ? 1 : this.slot2 && this.slot2.uuid === this.uuid ? 2 : 0;
      if (!slot) slot = this.captureCurrentSession();
      if (!slot) return Promise.resolve(null);
      const uuid = this.uuid;
      return this.fetchSlotToken(slot).then(token => {
        if (token && this.uuid === uuid) { this.gameToken = token; this.gameTokenAt = this["gameTokenAt" + slot]; }
        return token;
      });
    }
    static ["loadLevels"]() {
      // Level thresholds come from the account's Shop.Levels table. Prefer
      // what php/Auth.php returns in authResponse; fall back to auth/me.
      if (!this.loggedIn) return;
      if (this.levels && this.levels.length) {
        this.announceLevel();
        return;
      }
      this.refreshAccountData();
    }
    static ["startXpPoll"]() {
      // Lightweight live account refresh (one small request every 40s) so the
      // XP/level updates while playing without needing a logout/login. Safe
      // for guests: only runs while logged in. Kept tiny to avoid any lag.
      if (this._xpPoll || !this.loggedIn) return;
      this._xpPoll = setInterval(() => {
        if (!this.loggedIn) {
          this.stopXpPoll();
          return;
        }
        this.refreshAccountData();
      }, 40000);
    }
    static ["stopXpPoll"]() {
      if (this._xpPoll) {
        clearInterval(this._xpPoll);
        this._xpPoll = null;
      }
    }
    static ["refreshAccountData"]() {
      if (!this.loggedIn) return;
      fetch("https://3rb.io/api/auth/me", { credentials: "include" })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error("status " + r.status))))
        .then((d) => {
          const body = d && d.data ? d.data : d;
          if (body) {
            this.applyAccountData(body);
          }
        })
        .catch(() => {});
    }
    static ["applyAccountData"](body) {
      if (body.Shop && body.Shop.Levels && body.Shop.Levels.length) {
        this.levels = body.Shop.Levels;
      }
      const xp = parseInt(body.XP);
      if (!isNaN(xp) && 0 <= xp) {
        this.setXp(xp);
      }
      const coins = parseInt(body.Coins);
      if (!isNaN(coins) && 0 <= coins) {
        this.coins = coins;
      }
      const sweets = parseInt(body.Sweets);
      if (!isNaN(sweets) && 0 <= sweets) {
        this.sweets = sweets;
      }
      if (body.vipEndAt) this.vipEndAt = body.vipEndAt;
      if (body["XP Boost"]) this.xpBoost = body["XP Boost"];
      if (body["Mass Boost"]) this.massBoost = body["Mass Boost"];
      this.updateUI();
    }
    static ["isVip"]() {
      if (!this.vipEndAt) return false;
      const t = new Date(this.vipEndAt).getTime();
      return !isNaN(t) && t > Date.now();
    }
    static ["boostActive"](val) {
      if (!val) return false;
      const t = new Date(val).getTime();
      return isNaN(t) || t > Date.now();
    }
    static ["levelForXp"](xp) {
      let cur = null;
      for (let i = 0; i < this.levels.length; i++) {
        if (this.levels[i].XP <= xp) {
          cur = this.levels[i];
        } else {
          break;
        }
      }
      return cur;
    }
    static ["setXp"](xp) {
      if (0 > xp || !this.levels || !this.levels.length) return;
      const wasKnown = 0 <= this.xp;
      const oldLevel = this.level;
      this.xp = xp;
      const cur = this.levelForXp(xp);
      if (!cur) return;
      this.level = cur.Level;
      if (wasKnown && oldLevel && cur.Level > oldLevel) {
        const coins = parseInt(cur.Coins);
        if (0 < coins) {
          this.coins += coins;
          this.updateUI();
        }
        Notifications.command(
          "Level",
          "Level Up! You reached level " + cur.Level + (0 < coins ? " (+" + coins.toLocaleString() + " Coins)" : "")
        );
      }
      this.announceLevel();
    }
    static ["announceLevel"]() {
      if (!this.levels || !this.levels.length) return;
      if (this.levelAnnounced || 0 > this.xp) return;
      this.levelAnnounced = true;
      Notifications.command("Level", "Your level: " + this.level + " (" + this.xp + " XP)");
    }
    static ["logout"]() {
      this.stopXpPoll();
      this.lastAuthAccessToken = "";
      this.uuid = "logout";
      this.gameToken = null;
      PacketSender.resendLogin();
      this.uuid = "";
      this.nick = "";
      this.gameTokenAt = 0;
      localStorage.removeItem("active_session_id");
      localStorage.removeItem("active_session_nick");
      fetch("php/Auth.php?logout", { credentials: "include" }).catch(() => {});
      this.clearSlots();
      this.updateUI();
    }
    static ["handleStorageChange"](e) {
      if ("active_session_id" !== e.key) {
        return;
      }
      const v = localStorage.getItem("active_session_id");
      if (v === this.uuid) {
        return;
      }
      this.lastAuthAccessToken = "";
      this.uuid = v || "";
      this.nick = this.uuid ? localStorage.getItem("active_session_nick") || "" : "";
      this.gameToken = null;
      this.gameTokenAt = 0;
      if (this.loggedIn) {
        this.refreshGameToken();
        this.startXpPoll();
      }
      this.updateUI();
      PacketSender.resendLogin();
    }
    static ["bindUI"]() {
      // Google/Discord login are native anchors (href + target="_blank" +
      // rel="opener") so the browser opens the Auth.php popup itself - no
      // window.open needed (the Tampermonkey sandbox swallows those). The
      // relay/authResponse still wires up through window.opener on the page.
      $(document).on("click", "#account-status-logout", (e) => {
        e.preventDefault();
        this.logout();
      });
    }
    static ["updateUI"]() {
      const tab2 = document.getElementById("account-tab2");
      if (tab2) {
        const s1 = this.slot1 ? (this.slot1.nick || this.slot1.uuid.slice(0, 12)) : "none";
        const s2 = this.slot2 ? (this.slot2.nick || this.slot2.uuid.slice(0, 12)) : "none";
        tab2.textContent = "Tab1: " + s1 + "   |   Tab2: " + s2;
      }
      if (!this.loggedIn) {
        $("#account-login").show();
        $("#account-login2").hide();
        $("#account-status-info").text("Anonymous");
        $("#account-status-logout").hide();
        return;
      }
      $("#account-login").hide();
      $("#account-login2").show();
      const parts = [];
      parts.push("👤 " + (this.nick || (this.uuid.length > 10 ? this.uuid.slice(0, 10) + "..." : this.uuid)));
      if (this.isVip()) {
        parts.push("[VIP]");
      }
      parts.push("💰 " + (this.coins || 0).toLocaleString());
      if (0 < this.sweets) {
        parts.push("🍬 " + this.sweets.toLocaleString());
      }
      if (this.boostActive(this.xpBoost)) {
        parts.push("⚡ XP Boost");
      } else if (this.boostActive(this.massBoost)) {
        parts.push("⚡ Mass Boost");
      }
      $("#account-status-info").text(parts.join(" │ "));
      $("#account-status-logout").show();
    }
  }
  class RelayWs {
    static ["init"]() {
      this.ip = "";
      this.ws = null;
      this.connected = false;
      // Plain browser WebSocket now (was socket.io-client) - every
      // Socket.IO-specific bug hunted down this session (version/EIO
      // handshake mismatches, ping/pong tuning, the Manager's own opaque
      // reconnect state machine dropping in-flight sends) was a symptom of
      // that abstraction layer, not the actual network. A raw WebSocket
      // has none of that hidden machinery - what you see here IS the
      // connection logic. MUST be wss:// (not https://): 3rb.io is
      // loaded over HTTPS, and browsers silently drop any plain ws://
      // connection an HTTPS page tries to open (mixed content) - the
      // socket just never opens, no error is ever thrown. If this is
      // pointed at a self-signed cert, open that URL once directly in this
      // browser first and click through the "not secure" warning,
      // otherwise this will never connect.
      this.url = "wss://157.180.84.143:8443";
      // The relay is a single shared deployment - everyone who connects
      // without a room ends up seeing everyone else. Tab 1 + tab 2 share
      // one relay connection (see RelaySender), so a private per-browser room
      // is the default (only your own two tabs see each other). Two other,
      // independent things can override that default room selection - see
      // updateRoom(): a shared "tag" (ambient, persists across sessions,
      // set once and just works with anyone else using the same tag) and a
      // native party (explicit invite/accept, takes priority over tag
      // while active - see PartyManager).
      this.privateRoom = Storage.get("multibox", "privateRoom") || this.generateCode(16);
      Storage.set("multibox", "privateRoom", this.privateRoom);
      this.room = this.computeRoom();
      this.reconnectAttempt = 0;
      this.reconnectTimer = null;
      this.connect();
    }
    static ["generateCode"](mw) {
      const ajq = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let zn = "";
      for (let rl = 0; rl < mw; rl++) {
        zn += ajq[0 | (Math.random() * ajq.length)];
      }
      return zn;
    }
    static ["connect"]() {
      if ("undefined" === typeof WebSocket) {
        return console.log("Multibox sync: WebSocket is not available in this page, cannot connect to " + this.url);
      }
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
      const lk = this.url + "?room=" + encodeURIComponent(this.room);
      this.ws = new WebSocket(lk);
      this.ws.binaryType = "arraybuffer";
      this.ws.onopen = () => {
        console.log("Multibox sync: connected to " + this.url);
        this.reconnectAttempt = 0;
        this.onOpen();
      };
      this.ws.onmessage = (xm) => {
        this.onMessage(xm);
      };
      this.ws.onclose = (lc) => {
        console.log("Multibox sync: disconnected (code " + lc.code + ")");
        this.onClose();
        this.scheduleReconnect();
      };
      this.ws.onerror = (dp) => {
        console.log("Multibox sync: socket error", dp);
        this.onError();
      };
    }
    static ["scheduleReconnect"]() {
      if (this.reconnectTimer) {
        return;
      }
      // Simple capped exponential backoff, entirely our own and visible -
      // no library-internal heuristics deciding when/whether to retry.
      const sc = Math.min(1000 * Math.pow(2, this.reconnectAttempt), 15000);
      this.reconnectAttempt++;
      this.reconnectTimer = setTimeout(() => {
        this.reconnectTimer = null;
        this.connect();
      }, sc);
    }
    static ["switchRoom"](ff) {
      if (this.room === ff) {
        return;
      }
      this.room = ff;
      this.reconnectAttempt = 0;
      this.disconnect();
      this.connect();
    }
    static ["sanitize"](ky, ahi) {
      // The relay's own room sanitizer only accepts [A-Z0-9_-], so strip
      // anything else first (native party codes look like "#NAKO6UI") -
      // otherwise it'd reject the room id and silently fall back to one
      // shared default for everyone, defeating isolation. Prefixed per
      // source so a tag can never collide with an unrelated party code (or
      // vice versa) that happens to sanitize to the same string.
      const ajh = String(ahi || "")
        .replace(/[^A-Za-z0-9_-]/g, "")
        .toUpperCase();
      return ajh ? ky + ajh : null;
    }
    static ["computeRoom"]() {
      // Native party (explicit invite/accept) takes priority over tag - a
      // party is a deliberate, one-off grouping; tag is the ambient,
      // persistent one that just works with anyone else using the same
      // value, no invite step needed. Falls back to the private room when
      // neither applies.
      if (PartyManager.inParty && PartyManager.code) {
        const aka = this.sanitize("P_", PartyManager.code);
        if (aka) {
          return aka;
        }
      }
      const zf = this.sanitize("T_", Player.tag);
      return zf || this.privateRoom;
    }
    static ["updateRoom"]() {
      this.switchRoom(this.computeRoom());
    }
    static ["disconnect"]() {
      // Strip handlers before closing so a late event from the old socket
      // (e.g. its "close" firing after switchRoom() has already opened a
      // new one) can't stomp on the new connection's state through onOpen/
      // onClose, which both write to this same static class either way.
      if (this.ws) {
        this.ws.onopen = this.ws.onmessage = this.ws.onclose = this.ws.onerror = null;
        this.ws.close();
      }
      this.ws = null;
      this.connected = false;
    }
    static ["isOpen"]() {
      return !!(this.ws && this.connected && this.ws.readyState === WebSocket.OPEN);
    }
    static ["send"](ar) {
      if (this.isOpen()) {
        this.ws.send(ar);
      }
    }
    static ["sendVolatile"](ar) {
      // A raw WebSocket has no "volatile" concept to delegate to (that was
      // Socket.IO-specific) - readyState===OPEN is the only "is this safe
      // to write right now" signal actually available, which is exactly
      // what send() already checks, so this is just an alias. Kept as its
      // own method so call sites (commander) still read as "this one is
      // fine to drop, no retry needed" rather than implying reliability.
      this.send(ar);
    }
    static ["onOpen"]() {
      this.connected = true;
      RelaySender.init();
    }
    static ["onMessage"](fy) {
      RelayParser.parse(fy);
    }
    static ["onClose"]() {
      this.connected = false;
      console.log("Disconnected from networks.");
    }
    static ["onError"]() {
      this.connected = false;
      console.log("Connection to networks errored out!");
    }
  }
  class RelayData {
    static ["init"]() {
      const qy = {
        totalMass: 0x0,
        alive: 0x0,
        spectate: 0x0,
      };
      const aav = {
        totalMass: 0x0,
        alive: 0x0,
        spectate: 0x0,
      };
      const ahe = {
        1: qy,
        2: aav,
      };
      RelayWs.init();
      this.teamPlayers = new Map();
      this.selfID = -1;
      this.isSpectator = false;
      this.teamAlternator = true;
      this.teamData = ahe;
      this.biggestIsOn = false;
      this.biggest = new TeamPlayer(0);
    }
    static ["clear"]() {
      this.teamPlayers.clear();
      console.log("cleared");
    }
    static ["remove"](pw) {
      this.teamPlayers["delete"](pw);
    }
    static ["getPlayer"](wu) {
      if (wu === this.selfID) {
        return {};
      }
      let bt = this.teamPlayers.get(wu);
      if (undefined === bt) {
        bt = this.newPlayer(wu);
      }
      return bt;
    }
    static ["newPlayer"](at) {
      const ay = new TeamPlayer(at);
      this.teamPlayers.set(at, ay);
      return ay;
    }
  }
  class RelayParser {
    static ["parse"](acm) {
      const pa = new DataView(acm.data);
      const ov = new DataReader(pa);
      const vb = ov.readUInt8();
      if (1 === vb) {
        this.update(ov);
      } else if (3 === vb) {
        this.commander(ov);
      } else if (4 === vb) {
        this.selfID(ov);
      } else if (5 === vb) {
        this.prePlayers(ov);
      }
    }
    static ["update"](ri) {
      // Do NOT re-send positionMass()/biggest() here in response to an
      // incoming update: the relay broadcasts to everyone in the room
      // *except* the sender, so a reactive resend here creates a
      // self-sustaining feedback loop the instant a second real client is
      // in the room (their update triggers your resend, which triggers
      // the relay to broadcast to them, which triggers their resend,
      // forever, bounded only by round-trip latency) - this was the cause
      // of the CPU/traffic spike that only appeared once a teammate
      // joined. The 250ms heartbeat (see Renderer's interval setup)
      // already keeps both fresh on a fixed, bounded schedule without
      // depending on teammate traffic to trigger it, so this reactive
      // path is redundant on top of being a footgun.
      const y = RelayData.teamAlternator ? 1 : 2;
      const l = RelayData.teamData[y];
      l.totalMass = 0;
      l.alive = 0;
      l.spectate = 0;
      let aej = ri.readUInt8();
      for (; aej--; ) {
        const ke = ri.readUInt32();
        RelayData.remove(ke);
      }
      for (aej = ri.readUInt8(); aej--; ) {
        const aaj = ri.readUInt32();
        const afb = RelayData.getPlayer(aaj);
        const abw = ri.readUInt8();
        if (1 & abw) {
          const vf = ri.readStringZeroUtf8();
          const vg = vf.split("|");
          afb.nick = vg[0] || "";
          afb.nick2 = vg[1] || "";
        }
        if (2 & abw) {
          const aey = ri.readUInt8();
          const abi = ri.readUInt8();
          const og = ri.readUInt8();
          afb.colorHex = "#" + (16777216 + (aey << 16) + (abi << 8) + og).toString(16).slice(1);
        }
        if (4 & abw) {
          const aey = ri.readUTF8string().split("|");
          afb.skin = aey[0] || "";
          afb.skin2 = aey[1] || "";
          afb.skin2Color = /^[0-9a-fA-F]{6}$/.test(aey[2] || "") ? "#" + aey[2].toLowerCase() : "";
        }
        if (16 & abw) {
          afb.x = ri.readInt16();
          afb.y = ri.readInt16();
          afb.mass = ri.readUInt32();
        }
        if (32 & abw) {
          afb.isAlive = ri.readUInt8();
        }
        if (64 & abw) {
          afb.isRGB = ri.readUInt8();
        }
        afb.team = y;
        if (afb.isAlive) {
          l.totalMass += afb.mass;
          l.alive++;
        } else {
          l.spectate++;
        }
      }
      const kg = ri.readUInt8();
      RelayData.biggestIsOn = kg;
      if (kg) {
        RelayData.biggest.x = ri.readInt16();
        RelayData.biggest.y = ri.readInt16();
      }
    }
    static ["prePlayers"](vy) {
      RelayData.clear();
      for (let xg = vy.readUInt8(); xg--; ) {
        const ada = vy.readUInt32();
        const ami = RelayData.newPlayer(ada);
        const avn = vy.readStringZeroUtf8().split("|");
        ami.nick = avn[0] || "";
        ami.nick2 = avn[1] || "";
        const rk = vy.readUInt8();
        const kz = vy.readUInt8();
        const jh = vy.readUInt8();
        ami.colorHex = "#" + (16777216 + (rk << 16) + (kz << 8) + jh).toString(16).slice(1);
        const aek = vy.readUTF8string().split("|");
        ami.skin = aek[0] || "";
        ami.skin2 = aek[1] || "";
        ami.skin2Color = /^[0-9a-fA-F]{6}$/.test(aek[2] || "") ? "#" + aek[2].toLowerCase() : "";
        ami.x = vy.readInt16();
        ami.y = vy.readInt16();
        ami.mass = vy.readUInt32();
        ami.isAlive = vy.readUInt8();
        ami.isRGB = vy.readUInt8();
      }
    }
    static ["commander"](acs) {
      // Raw world coordinates, no offset - same fix as positionMass()/
      // biggest(): WorldData.offset assumes the border is always -8000,
      // which isn't guaranteed for every server. Adding it back here (when
      // the sender no longer subtracts anything but a tab2 visual-shift,
      // if any) was producing wildly out-of-bounds points, e.g. y=-11279.
      const vg = acs.readInt16();
      const re = acs.readInt16();
      const agh = GameLoop.time;
      const bd = {
        x: vg,
        y: re,
        time: agh,
      };
      Renderer.commanderPoints.add(bd);
    }
    static ["selfID"](ln) {
      const aab = ln.readUInt32();
      RelayData.selfID = aab;
    }
  }
  class RelaySender {
    static ["init"]() {
      console.log("Connected to Networks.");
      // connected is already set true by RelayWs.onOpen() before this runs.
      this.nick();
      this.skin();
      this.tag();
      this.color();
      this.ip();
      this.aliveStatus();
      this.rgbMode();
      if (RelayData.isSpectator) {
        this.spectator(true);
      }
    }
    static ["createView"](se) {
      return new DataView(new ArrayBuffer(se));
    }
    static ["nick"]() {
      if (RelayWs.connected) {
        const id = unescape(encodeURIComponent([Player.nick, Player.nick2].join("|")));
        let aes = id.length;
        const vo = this.createView(2 + id.length);
        for (vo.setUint8(0, 1, true); aes--; ) {
          vo.setUint8(aes + 1, id.charCodeAt(aes), true);
        }
        vo.setUint8(1 + id.length, 0, true);
        RelayWs.send(vo.buffer);
      }
    }
    static ["color"]() {
      if (RelayWs.connected) {
        const alc = this.createView(4);
        alc.setUint8(0, 2, true);
        alc.setUint8(1, Player.colorObject.r, true);
        alc.setUint8(2, Player.colorObject.g, true);
        alc.setUint8(3, Player.colorObject.b, true);
        RelayWs.send(alc.buffer);
      }
    }
    static ["skin"]() {
      if (RelayWs.connected) {
        // Tab-2 skin and its player color ride along as "SKIN1|SKIN2|RRGGBB"
        // in the same opcode-4 field. The color is the discriminator the far
        // side needs: every cell of a player carries that player's color on
        // ANY socket, so each of our tabs maps to exactly one skin key - the
        // old worldID+cellType keying failed because a multibox teammate's
        // cells arrive on both of the friend's sockets (cellType 1 AND 2
        // copies), so both tabs' cells got both skins and the overlap picked
        // one at random. Colors are server-assigned per spawn and stay fixed
        // for the player's whole life, so the key is stable.
        const parts = [Player.skin];
        if (Player.skin2) {
          parts.push(Player.skin2);
          if (/^#[0-9a-fA-F]{6}$/.test(Player.colorHex2)) {
            parts.push(Player.colorHex2.slice(1));
          }
        }
        const ahc = parts.join("|");
        let aeb = ahc.length;
        const bk = this.createView(2 + ahc.length);
        for (bk.setUint8(0, 4, true); aeb--; ) {
          bk.setUint8(aeb + 1, ahc.charCodeAt(aeb), true);
        }
        bk.setUint8(1 + ahc.length, 0, true);
        RelayWs.send(bk.buffer);
      }
    }
    static ["ip"]() {
      if (RelayWs.connected && WsConnection.ip) {
        // WsConnection.ip is a "wss://host:port/path" URL (this game's servers
        // are hostnames like alpha2.3rb.io, never a raw dotted-quad IPv4
        // address) - splitting that on "." never yields 4 octets, so
        // agf[3] was always undefined and ".split(':')" on it threw.
        // That exception fired inside onOpen(), BEFORE it ever reached
        // PacketSender.init(tabNum) (which sends the actual handshake and
        // marks the tab connected) - so as soon as the relay socket was up,
        // every real-game connection silently stopped authenticating.
        // There's also nothing downstream that reads this once sent (the
        // relay's inbound update() decoder has no field bit for it), so if
        // the address isn't a real IPv4 host there's nothing useful to send
        // at all - just skip it instead of guessing.
        const abu = WsConnection.ip.match(/^wss?:\/\/([^:/]+)(?::(\d+))?/i);
        if (!abu) {
          return;
        }
        const agf = abu[1].split(".");
        if (4 !== agf.length) {
          return;
        }
        const lo = this.createView(8);
        lo.setUint8(0, 8, true);
        lo.setUint8(1, 1, true);
        lo.setUint8(2, 0 | agf[0], true);
        lo.setUint8(3, 0 | agf[1], true);
        lo.setUint8(4, 0 | agf[2], true);
        lo.setUint8(5, 0 | agf[3], true);
        lo.setUint16(6, 0 | abu[2], true);
        RelayWs.send(lo.buffer);
      }
    }
    static ["tag"]() {
      if (RelayWs.connected) {
        const po = Player.tag;
        let ha = po.length;
        const up = this.createView(3 + po.length);
        up.setUint8(0, 8, true);
        for (up.setUint8(1, 2, true); ha--; ) {
          up.setUint8(ha + 2, po.charCodeAt(ha), true);
        }
        up.setUint8(2 + po.length, 0, true);
        RelayWs.send(up.buffer);
      }
    }
    static ["positionMass"]() {
      if (RelayWs.connected) {
        const adq = this.createView(9);
        adq.setUint8(0, 16, true);
        // Send the raw world position, NOT offset-adjusted: `WorldData.offset`
        // reflects *this* player's own border rect, which the receiving
        // client has no way to reverse (it never adds any offset back before
        // handing the value to mapX/mapY). Sending it pre-shifted by a
        // sender-only value that never gets undone is exactly what caused
        // teammates to show up in the wrong minimap sector.
        adq.setInt16(1, 0 | Player.x, true);
        adq.setInt16(3, 0 | Player.y, true);
        adq.setUint32(5, Player.mass, true);
        RelayWs.send(adq.buffer);
      }
    }
    static ["aliveStatus"]() {
      if (RelayWs.connected) {
        const um = this.createView(2);
        const xk = Player.isAlive ? 1 : 0;
        um.setUint8(0, 32, true);
        um.setUint8(1, xk, true);
        RelayWs.send(um.buffer);
      }
    }
    static ["commander"]() {
      if (RelayWs.connected) {
        // Only remove tab2's visual-separation shift (WorldData.position -
        // the delta used to draw tab2's cells apart from tab1's on the
        // shared canvas), not the border-derived offset/offset2 - same
        // fix as positionMass()'s own Player.x/y, which already only
        // subtracts this same shift. canvasX/Y is otherwise already a raw
        // world coordinate.
        const qf = { x: 0, y: 0 };
        const afr = 2 === Player.typeID ? WorldData.position : qf;
        const ali = Mouse.canvasX - afr.x;
        const ol = Mouse.canvasY - afr.y;
        const pg = this.createView(5);
        pg.setUint8(0, 128, true);
        pg.setInt16(1, 0 | ali, true);
        pg.setInt16(3, 0 | ol, true);
        RelayWs.sendVolatile(pg.buffer);
      }
    }
    static ["spectator"]() {}
    static ["rgbMode"]() {
      if (RelayWs.connected) {
        const mg = Player.isRGB ? 1 : 0;
        const xq = this.createView(3);
        xq.setUint8(0, 0, true);
        xq.setUint8(1, 8, true);
        xq.setUint8(2, mg, true);
        RelayWs.send(xq.buffer);
      }
    }
    static ["biggest"]() {
      if (RelayWs.connected) {
        // Send the raw world position, same fix as positionMass() above -
        // spectatePoint.x/y comes straight from the real server's opcode 17
        // (getSpectateData), already a raw world coordinate. Subtracting
        // WorldData.offset here pre-shifted it by a sender-only value that
        // the receiving side (RelayParser.update -> RelayData.biggest.x/y)
        // never adds back, which is what put the #1 marker in the wrong
        // minimap spot.
        const aat = this.createView(6);
        aat.setUint8(0, 0, true);
        aat.setUint8(1, 16, true);
        aat.setInt16(2, 0 | Camera.spectatePoint.x, true);
        aat.setInt16(4, 0 | Camera.spectatePoint.y, true);
        RelayWs.send(aat.buffer);
      }
    }
  }
  const accountData = {
    gold: "https://i.imgur.com/UaUVo47.png",
    blue: "https://i.imgur.com/hfYVnJ1.png",
    red: "https://i.imgur.com/WLOBWEh.png",
    purple: "https://i.imgur.com/sQTniJp.png",
    green: "https://i.imgur.com/MGZW8Qv.png",
    yellow: "https://i.imgur.com/Z84sBmj.png",
    orange: "https://i.imgur.com/tTDI9L8.png",
    turquoise: "https://i.imgur.com/bpT4ELJ.png",
    pink: "https://i.imgur.com/19Yl3H3.png",
    rainbow: "https://i.imgur.com/e8OLq9q.png",
  };
  class MoEmotes {
    static init() {
      this.choices = [
        { label: "Angry red", crop: [139, 71, 65, 64] },
        { label: "Star eyes", crop: [139, 139, 65, 64] },
        { label: "Dizzy", crop: [208, 207, 64, 65] },
        { label: "Laughing tiger", crop: [2, 276, 64, 64] },
        { label: "Blue happy", crop: [208, 276, 64, 64] }
      ];
      this.labels = this.choices.map(choice => choice.label);
      this.states = new Map(); this.sprites = new Map();
      this.root = document.createElement("div");
      this.root.id = "mo-emotes"; this.root.hidden = true;
      this.toggle = document.createElement("button");
      this.toggle.type = "button"; this.toggle.className = "mo-emote-toggle";
      this.toggle.textContent = "☺ Emotes";
      this.toggle.disabled = true;
      this.toggle.title = "Loading emote faces";
      this.toggle.setAttribute("aria-expanded", "false");
      this.toggle.setAttribute("aria-controls", "mo-emote-picker");
      this.panel = document.createElement("div");
      this.panel.id = "mo-emote-picker"; this.panel.hidden = true;
      this.panel.setAttribute("role", "group");
      this.panel.setAttribute("aria-label", "Choose an emote");
      this.buttons = this.choices.map((emoji, index) => {
        const button = document.createElement("button");
        button.type = "button"; button.className = "mo-emote-choice";
        button.setAttribute("aria-label", this.labels[index]);
        button.title = this.labels[index];
        button.addEventListener("click", () => { if (this.choose(index)) this.setOpen(false); });
        this.panel.appendChild(button); return button;
      });
      const hint = document.createElement("small");
      hint.textContent = "Visible to you · lasts 4 seconds"; this.panel.appendChild(hint);
      this.atlas = new Image(); this.ready = false;
      this.atlas.onload = () => {
        if (this.atlas.naturalWidth !== 344 || this.atlas.naturalHeight !== 408) { this.atlas.onerror(); return; }
        this.ready = true;
        for (let index = 0; index < this.choices.length; index++) {
          const sprite = this.cache(index); this.sprites.set(index, sprite);
          const preview = document.createElement("canvas"); preview.width = preview.height = 64;
          preview.setAttribute("aria-hidden", "true");
          preview.getContext("2d").drawImage(sprite, 0, 0, 64, 64);
          this.buttons[index].appendChild(preview);
        }
        this.toggle.disabled = false; this.toggle.title = "Cover your skin with an emote";
      };
      this.atlas.onerror = () => { hint.textContent = "Faces could not load · refresh to retry"; this.toggle.title = "Emote faces could not load"; };
      this.atlas.src = "data:image/png;base64,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";
      this.root.appendChild(this.panel); this.root.appendChild(this.toggle);
      document.body.appendChild(this.root);
      this.toggle.addEventListener("click", () => this.setOpen(this.panel.hidden));
      this.root.addEventListener("pointerdown", event => event.stopPropagation());
      this.root.addEventListener("keydown", event => {
        event.stopPropagation();
        if (event.key === "Escape") { event.preventDefault(); this.setOpen(false); }
      });
      document.addEventListener("pointerdown", event => { if (!this.root.contains(event.target)) this.setOpen(false); });
    }
    static setOpen(open) {
      if (!this.panel) return;
      this.panel.hidden = !open;
      this.toggle.setAttribute("aria-expanded", String(open));
      if (open) this.buttons[0].focus();
      else if (this.root.contains(document.activeElement)) document.activeElement.blur();
    }
    static biggest(type) {
      let biggest = null;
      for (const cell of CellData.sortedCells) {
        if (!cell.isMine || cell.cellType !== type || cell.isVirus || cell.isFood || cell.isEjected || cell.fadeStartTime) continue;
        if (!biggest || cell.radius > biggest.radius) biggest = cell;
      }
      return biggest;
    }
    static sync() {
      if (!this.root) return;
      const available = !MainMenu.isOpened && !!this.biggest(Player.typeID);
      this.root.hidden = !available;
      if (!available) this.setOpen(false);
      for (const [type, state] of this.states) {
        if (performance.now() >= state.until || !this.biggest(type)) this.states.delete(type);
      }
    }
    static choose(index) {
      if (!this.ready || !Number.isInteger(index) || !this.choices[index] || MainMenu.isOpened || !this.biggest(Player.typeID)) return false;
      this.states.set(Player.typeID, { index, started: performance.now(), until: performance.now() + 4000 });
      return true;
    }
    static target() {
      const state = this.states && this.states.get(Player.typeID);
      if (!state || performance.now() >= state.until) return null;
      return this.biggest(Player.typeID);
    }
    static activeType() {
      const state = this.states && this.states.get(Player.typeID);
      return state && performance.now() < state.until ? Player.typeID : null;
    }
    static cache(index) {
      const sprite = document.createElement("canvas"); sprite.width = sprite.height = 256;
      const ctx = sprite.getContext("2d");
      ctx.beginPath(); ctx.arc(128,128,128,0,Math.PI*2); ctx.clip();
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
      const crop = this.choices[index].crop;
      ctx.drawImage(this.atlas, crop[0], crop[1], crop[2], crop[3], 0, 0, 256, 256);
      return sprite;
    }
    static draw(cell, origin, opacity) {
      const state = this.states.get(Player.typeID), zoom = Camera.viewport;
      if (!this.ready || !state || performance.now() >= state.until || !(zoom > 0) || !Number.isFinite(zoom) || cell.animRadius * zoom < 4) return;
      const radius = cell.animRadius + 5, x = cell.animX - origin.x, y = cell.animY - origin.y;
      if (!(radius > 0) || !Number.isFinite(radius) || !Number.isFinite(x) || !Number.isFinite(y)) return;
      let sprite = this.sprites.get(state.index);
      if (!sprite) { sprite = this.cache(state.index); this.sprites.set(state.index, sprite); }
      const now = performance.now();
      const size = radius * 2;
      const ctx = Renderer.ctx;
      ctx.save();
      try {
        ctx.globalAlpha = Math.min(1, (state.until - now) / 350);
        ctx.drawImage(sprite, x - radius, y - radius, size, size);
      } finally { ctx.restore(); }
    }
  }
  class Renderer {
    static ["init"]() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.pi2 = 2 * Math.PI;
      this.moReducedMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      this.moCellLight = this.cacheMoCellLight();
      this.skinMap = new Map();
      this.downloadedSkins = new Map();
      this.knownSkins = {};
      this.commanderPoints = new Set();
      this.rgbTeammates = new Set();
      this.borderImages = new Map();
      this.indicator = this.cacheIndicator();
      this.getKnownSkins();
      BgRender.init();
      RgbCycle.init();
      MoEmotes.init();
      this.resizeCanvas();
      window.onresize = () => {
        this.resizeCanvas();
      };
    }
    static ["resizeCanvas"]() {
      this.canvas.width = 0 | window.innerWidth;
      this.canvas.height = 0 | window.innerHeight;
    }
    static ["run"]() {
      MoEmotes.sync();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.save();
      try {
        this.vanillaGrid();
        const ajd = (this.canvas.width >> 1) / Camera.viewport - Camera.x;
        const ma = (this.canvas.height >> 1) / Camera.viewport - Camera.y;
        this.ctx.scale(Camera.viewport, Camera.viewport);
        this.ctx.translate(ajd, ma);
        RgbCycle.update();
        BgRender.render();
        this.border();
        FoodRender.render();
        this.createSkinMap();
        this.createRGBset();
        this.mouseTracker();
        this.cells();
        this.commands();
        TextRenderer.cleaner();
      } finally {
        this.ctx.restore();
      }
    }
    static ["vanillaGrid"]() {
      if ("off" !== Settings.vanillaGrid) {
        const ahx = this.ctx;
        const kn = Camera.viewport;
        const qs = this.canvas.width / kn;
        const yc = this.canvas.height / kn;
        let zg = (-Camera.x + qs / 2) % 50;
        let ce = (-Camera.y + yc / 2) % 50;
        ahx.strokeStyle = Theme.gridColor;
        ahx.lineWidth = 0 | (Math.min(Theme.gridWidth, 20) * Camera.viewport);
        ahx.globalAlpha = 0.2 * kn;
        for (ahx.beginPath(); zg < qs; ) {
          ahx.moveTo(zg * kn, 0);
          ahx.lineTo(zg * kn, yc * kn);
          zg += 50;
        }
        for (; ce < yc; ) {
          ahx.moveTo(0, ce * kn);
          ahx.lineTo(qs * kn, ce * kn);
          ce += 50;
        }
        ahx.closePath();
        ahx.stroke();
        ahx.globalAlpha = 1;
      }
    }
    static ["border"]() {
      if ("default" === Theme.borderStyle) {
        const sy = this.ctx;
        const dw = Theme.borderWidth >> 1;
        sy.strokeStyle = Theme.borderColor;
        sy.lineWidth = Theme.borderWidth;
        sy.strokeRect(
          WorldData.left - dw,
          WorldData.top - dw,
          WorldData.edge + Theme.borderWidth,
          WorldData.edge + Theme.borderWidth,
        );
      } else {
        this.animatedBorder(Theme.borderStyle);
      }
    }
    static ["animatedBorder"](kq) {
      const dl = accountData[kq];
      if (!dl) {
        return;
      }
      const aaf = this.getBorderImage(kq, dl);
      if (!aaf) {
        return;
      }
      const sy = this.ctx;
      const dw = Theme.borderWidth >> 1;
      const akc = WorldData.left - dw;
      const mx = WorldData.top - dw;
      const aid = WorldData.edge + Theme.borderWidth;
      // Clip to a rectangular ring (outer border box minus the inner map
      // area) so the texture only ever paints the border band - regardless
      // of the source image's actual transparency, the play area itself
      // can never get covered.
      sy.save();
      sy.beginPath();
      sy.rect(akc, mx, aid, aid);
      sy.rect(
        WorldData.left + dw,
        WorldData.top + dw,
        WorldData.edge - Theme.borderWidth,
        WorldData.edge - Theme.borderWidth,
      );
      sy.clip("evenodd");
      // NOTE: this used to rotate an oversized (~1.45x) copy of the image
      // through the clip to guarantee corner coverage at every angle.
      // Chromium silently draws nothing when drawImage's destination rect
      // extends past the clip's own outer edge (confirmed: fillRect with
      // the exact same oversized rect + clip renders fine, drawImage does
      // not - a real rendering quirk, not a logic bug). Animating via a
      // hue-rotate filter instead sidesteps it entirely: no oversizing, no
      // rotation, the image is drawn once at its exact bounding box (the
      // same draw that already works), and the color itself cycles - which
      // reads as "shimmering" at least as well as a spinning frame would.
      // Only "rainbow" gets the full 0-360 sweep - a full hue cycle on any
      // OTHER color eventually passes through every other color too, so
      // picking e.g. "Pink" would drift through gold/green/blue over time
      // and look indistinguishable from every other style. Named colors
      // instead get a small back-and-forth wobble around their own hue.
      const ys = "rainbow" === kq ? ((GameLoop.time / 6000) % 1) * 360 : Math.sin(GameLoop.time / 1500) * 15;
      sy.filter = "hue-rotate(" + ys + "deg)";
      sy.drawImage(aaf, akc, mx, aid, aid);
      sy.filter = "none";
      sy.restore();
    }
    static ["getBorderImage"](kq, dl) {
      const sm = this.borderImages.get(kq);
      if (sm) {
        return sm.ready ? sm.img : null;
      }
      const aaf = new Image();
      const ahq = { img: aaf, ready: false };
      this.borderImages.set(kq, ahq);
      aaf.onload = () => {
        ahq.ready = true;
      };
      aaf.onerror = () => {};
      aaf.src = dl;
      return null;
    }
    static ["cells"]() {
      const amh = this.ctx;
      const ait = Settings.cellMass !== "off";
      const acv = Settings.cellNick !== "off";
      const ajs = Settings.hideOwnNick === "on";
      const afz = Settings.hideOwnMass === "on";
      const jy = Settings.urlSkins === "on";
      const arb = Settings.arbSkins === "on";
      const aal = Settings.teamIndicator === "on";
      const nl = Settings.multiboxRing === "on";
      const mc = Settings.multiboxCellColor === "on";
      const en = Theme.indicatorSize;
      const afc = Theme.cellTransparency / 100;
      const b = Theme.cellNickSize / 100;
      const io = Theme.cellMassSize / 100;
      const xe = Settings.cellTextAnimation;
      const ph = Theme.multiboxActive;
      const bm = Theme.multiboxInactive;
      const iv = Theme.multiboxRingWidth;
      const no = Theme.lightenCellColor / 100;
      const moEmoteType = MoEmotes.activeType();
      amh.strokeStyle = Theme.virusBorderColor;
      amh.lineWidth = Theme.virusBorderWidth;
      for (const aeq of CellData.sortedCells) {
        const wx = !aeq.isVirus && !aeq.isEjected && this.skinMap.has(this.skinKey(aeq.nick, aeq.colorHex));
        aeq.animate();
        let gu = 1;
        const alp = {
          x: 0x0,
          y: 0x0,
        };
        const w = aeq.cellType === 2 ? WorldData.position : alp;
        if (aeq.fadeStartTime) {
          gu = 1 - (GameLoop.time - aeq.fadeStartTime) / Settings.CellAnimation;
          gu = Math.max(0, Math.min(1, gu));
        }
        // Only the cell body, skin and active-player ring follow the visual
        // deformation. Labels stay upright and server coordinates stay intact.
        const moDeformed = this.beginMoCellMotion(aeq, w);
        amh.beginPath();
        amh.arc(aeq.animX - w.x, aeq.animY - w.y, aeq.animRadius + 5, 0, this.pi2, true);
        amh.closePath();
        if (aeq.isVirus) {
          amh.fillStyle = Theme.virusColor;
          amh.globalAlpha = 0.7;
          amh.fill();
          amh.globalAlpha = 1;
          amh.stroke();
        } else if ("radiant" === Theme.cellTransparencyStyle) {
          const mn = 0 | (aeq.colorObject.r * no);
          const ajn = 0 | (aeq.colorObject.g * no);
          const aih = 0 | (aeq.colorObject.b * no);
          const akg = afc * gu;
          const eo = aeq.animRadius + 5;
          const xy = aeq.animX - w.x;
          const aiu = aeq.animY - w.y;
          const ti = amh.createRadialGradient(xy, aiu, 0, xy, aiu, eo);
          ti.addColorStop(0, "rgba(" + mn + "," + ajn + "," + aih + "," + akg * 0.6 + ")");
          ti.addColorStop(1, "rgba(" + mn + "," + ajn + "," + aih + "," + akg + ")");
          amh.fillStyle = ti;
          amh.fill();
        } else {
          amh.fillStyle =
            mc && aeq.isMine ? (aeq.cellType === Player.typeID ? ph : bm) : RgbCycle.getColor(aeq.colorObject, no);
          if (afc * gu < 1) {
            amh.globalAlpha = afc * gu;
            amh.fill();
            amh.globalAlpha = 1;
          } else {
            amh.fill();
          }
        }
        if (aeq.isEjected) {
          continue;
        }
        if (!aeq.isVirus && gu === 1 && aal && !aeq.isMine && wx && aeq.animRadius * Camera.viewport < 50) {
          amh.drawImage(
            this.indicator,
            aeq.animX - w.x - en / 2,
            aeq.animY - w.y - aeq.animRadius - 10 - en,
            en,
            en,
          );
        }
        let gk = Renderer.code2Url(Renderer.getImgurCode(aeq.skin || "")).includes("XXXXXXX") ? aeq.skin : aeq.arbSkin;
        const dk = wx && jy && this.getCustomSkin(this.skinKey(aeq.nick, aeq.colorHex));
        const akw =
          arb && !dk && gk && this.knownSkins.hasOwnProperty(gk.replace(/free\/|.png/, "")) && this.get3rbSkin(gk);
        if (dk) {
          amh.drawImage(
            dk,
            aeq.animX - w.x - (aeq.animRadius + 5),
            aeq.animY - w.y - (aeq.animRadius + 5),
            2 * (aeq.animRadius + 5),
            2 * (aeq.animRadius + 5),
          );
        } else if (akw) {
          amh.drawImage(
            akw,
            aeq.animX - w.x - (aeq.animRadius + 5),
            aeq.animY - w.y - (aeq.animRadius + 5),
            2 * (aeq.animRadius + 5),
            2 * (aeq.animRadius + 5),
          );
        }
        if (!aeq.isVirus && !dk && !akw && Settings.moMotionStyle === "cinematic") {
          this.drawMoCellLight(aeq, w, afc * gu);
        }
        if (aeq.isMine && aeq.cellType === moEmoteType && !aeq.isVirus && !aeq.isFood && gu === 1) MoEmotes.draw(aeq, w, afc);
        if (aeq.isMine && nl && aeq.cellType === Player.typeID && Settings.moMotionStyle !== "classic") {
          this.drawMoActiveGlow(aeq, w, afc * gu, ph);
        }
        if (aeq.isMine && nl) {
          const jm = (aeq.animRadius * iv) / 100;
          amh.beginPath();
          amh.arc(aeq.animX - w.x, aeq.animY - w.y, aeq.animRadius + 5 - (jm >> 1), 0, this.pi2, true);
          amh.closePath();
          amh.lineWidth = jm | 0;
          amh.strokeStyle = aeq.cellType === Player.typeID ? ph : bm;
          amh.stroke();
          amh.strokeStyle = Theme.virusBorderColor;
          amh.lineWidth = Theme.virusBorderWidth;
        }
        if (moDeformed) amh.restore();
        if (gu === 1 && ((aeq.isMine && !ajs) || (!aeq.isMine && acv))) {
          const ax = TextRenderer.nick(aeq);
          if (ax) {
            const ik =
              xe === "on" ? aeq.animRadius : xe === "stepped" ? 50 + 75 * ((aeq.animRadius / 75) | 0) : aeq.radius;
            const qh = (ik * b * 0.3 + 6 / Camera.viewport) / ax.height;
            const nn = ax.width * qh;
            const aem = ax.height * qh;
            if (nn > 0 && aem > 0) {
              amh.drawImage(
                ax,
                aeq.animX - w.x - (nn >> 1),
                aeq.animY - w.y - (aem >> 1),
                nn,
                aem,
              );
            }
          }
        }
        if (gu === 1 && ((aeq.isMine && !afz) || (!aeq.isMine && ait))) {
          const mk = TextRenderer.mass(aeq);
          if (mk) {
            const ep =
              xe === "on" ? aeq.animRadius : xe === "stepped" ? 50 + 75 * ((aeq.animRadius / 75) | 0) : aeq.radius;
            const lg = (ep * io * 0.3 + 6 / Camera.viewport) / mk.height;
            const oz = mk.width * lg;
            const ue = mk.height * lg;
            const gj =
              aeq.isUnnamed || (aeq.isMine && ajs) || (!aeq.isMine && !acv) ? -(ue >> 1) : ue >> 2;
            if (oz > 0 && ue > 0) {
              amh.drawImage(
                mk,
                aeq.animX - w.x - (oz >> 1),
                aeq.animY - w.y + gj,
                oz,
                ue,
              );
            }
          }
        }
      }
    }
    static ["beginMoCellMotion"](cell, origin) {
      if (Settings.moMotionStyle !== "cinematic" || this.moReducedMotion || cell.isVirus || cell.isFood || cell.isEjected) return false;
      const stretch = Math.min(0.035, Math.max(0, cell._moStretch || 0));
      if (stretch < 0.0002 || cell.animRadius * Camera.viewport < 16) return false;
      const x = cell.animX - origin.x, y = cell.animY - origin.y;
      const vx = cell._moVX || 0, vy = cell._moVY || 0;
      if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(vx) || !Number.isFinite(vy) || !Number.isFinite(stretch)) return false;
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.rotate(Math.atan2(vy, vx));
      this.ctx.scale(1 + stretch, 1 / (1 + stretch));
      this.ctx.translate(-x, -y);
      return true;
    }
    static ["cacheMoCellLight"]() {
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 128;
      const ctx = sprite.getContext("2d");
      const glow = ctx.createRadialGradient(42, 34, 2, 64, 64, 64);
      glow.addColorStop(0, "rgba(255,255,255,0.7)");
      glow.addColorStop(0.4, "rgba(255,255,255,0.12)");
      glow.addColorStop(0.72, "rgba(0,0,0,0)");
      glow.addColorStop(1, "rgba(0,0,0,0.28)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(64, 64, 63, 0, Math.PI * 2); ctx.fill();
      return sprite;
    }
    static ["drawMoCellLight"](cell, origin, opacity) {
      const r = cell.animRadius + 5;
      if (!(r > 0) || !Number.isFinite(r) || r * Camera.viewport < 16 || !(opacity > 0)) return;
      this.ctx.save();
      this.ctx.globalAlpha = Math.min(1, opacity) * 0.32;
      this.ctx.drawImage(this.moCellLight, cell.animX - origin.x - r, cell.animY - origin.y - r, r * 2, r * 2);
      this.ctx.restore();
    }
    static ["drawMoActiveGlow"](cell, origin, opacity, color) {
      const radius = cell.animRadius + 5;
      const x = cell.animX - origin.x, y = cell.animY - origin.y;
      if (cell.isVirus || cell.isFood || cell.isEjected || !Number.isFinite(radius) || !Number.isFinite(x) || !Number.isFinite(y) || !(opacity > 0) || radius * Camera.viewport < 14) return;
      if (!this.moActiveGlow || this.moActiveGlow.color !== color) {
        this.moActiveGlow = { color, sprite: this.cacheMoActiveGlow(color) };
      }
      const extent = radius * 1.25;
      this.ctx.save();
      this.ctx.globalAlpha = Math.min(1, opacity) * 0.7;
      this.ctx.drawImage(this.moActiveGlow.sprite, x - extent, y - extent, extent * 2, extent * 2);
      this.ctx.restore();
    }
    static ["cacheMoActiveGlow"](color) {
      // Cache the colored halo once; avoid a per-cell, per-frame shadow blur.
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 256;
      const ctx = sprite.getContext("2d");
      const halo = ctx.createRadialGradient(128, 128, 80, 128, 128, 125);
      halo.addColorStop(0, "rgba(255,255,255,0)");
      halo.addColorStop(0.32, "rgba(255,255,255,0.04)");
      halo.addColorStop(0.45, "rgba(255,255,255,0.65)");
      halo.addColorStop(0.62, "rgba(255,255,255,0.18)");
      halo.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, 256, 256);
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = "#ff61f8";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 256, 256);
      return sprite;
    }
    static ["createSkinMap"]() {
      this.arbSkin = $("#arbSkin").val();
      this.skinMap.clear();
      // Keys are "base nick + player color" (see skinKey). Every cell of a
      // player carries that player's color, whichever socket it arrived on,
      // so each tab maps to exactly one key and renders one skin - unlike
      // worldID+cellType keying, where a multibox teammate's cells arrive on
      // both of the friend's sockets (cellType 1 AND 2 copies), so both
      // tabs' cells received both skins and the overlapping copies drew one
      // of them at random. Colors are server-assigned per spawn and stable
      // for the player's whole life.
      const u1 = Player.skin.includes("XXXXXXX") ? "" : this.code2Url(Player.skin);
      const u2 = Player.skin2 ? this.code2Url(Player.skin2) : u1;
      const arb = this.arbSkin
        ? "./res/skins/free/" + this.arbSkin.replace(/free\/|.png/g, "") + ".png"
        : "";
      const k1 = this.skinKey(Player.nick, Player.colorHex);
      const k2 = this.skinKey(Player.nick2 || Player.nick, Player.colorHex2);
      if (u1) {
        this.skinMap.set(k1, u1);
      } else if (arb) {
        this.skinMap.set(k1, arb);
      }
      if (u2) {
        this.skinMap.set(k2, u2);
      } else if (arb) {
        this.skinMap.set(k2, arb);
      }
      for (const agl of RelayData.teamPlayers.values())
        if (agl.isAlive) {
          const t1 = !agl.skin.includes("XXXXXXX") ? this.code2Url(agl.skin) : "";
          if (agl.skin2Color) {
            // No tab-2 skin: tab-1's skin doubles for tab-2 cells, mirroring
            // the sender's own map (createSkinMap sets both its keys to the
            // same URL when skin2 is empty). Tab-1's invalid sentinel must
            // not swallow tab-2: a teammate with a valid tab-2 skin but no
            // tab-1 skin still gets their tab-2 cells skinned.
            const t2 =
              agl.skin2 && !agl.skin2.includes("XXXXXXX") ? this.code2Url(agl.skin2) : t1;
            if (t2) {
              this.skinMap.set(this.skinKey(agl.nick2 || agl.nick, agl.skin2Color), t2);
            }
          }
          if (t1) {
            this.skinMap.set(this.skinKey(agl.nick, agl.colorHex), t1);
          }
        }
    }
    static ["skinKey"](nick, colorHex) {
      let base = nick.substring(nick.indexOf("}") + 1);
      base = base.replace(/^\[[^\]]*\]\s*/, "");
      base = base.replace("%*^", "");
      return base + colorHex;
    }
    static ["createRGBset"]() {
      this.rgbTeammates.clear();
      if (Player.isRGB) {
        this.rgbTeammates.add(Player.worldID);
      }
      for (const ok of RelayData.teamPlayers.values())
        if (ok.isAlive && ok.isRGB) {
          this.rgbTeammates.add(ok.worldID);
        }
    }
    static ["getCustomSkin"](aks) {
      const pr = this.skinMap.get(aks);
      if (!pr) {
        return false;
      }
      const ym = this.downloadedSkins.get(pr);
      return undefined === ym ? (this.downloadSkin(pr), false) : ym;
    }
    static ["get3rbSkin"](fd) {
      const rs = this.downloadedSkins.get(fd);
      return undefined === rs ? (this.download3rbSkin(fd), false) : rs;
    }
    static ["download3rbSkin"](jc) {
      this.downloadedSkins.set(jc, false);
      const oc = new Image();
      oc.crossOrigin = "anonymous";
      oc.onload = () => {
        this.cropSkinBitmap(oc, (bit) => {
          this.downloadedSkins.set(jc, bit);
        });
      };
      oc.src = "./res/skins/free/" + jc.replace(/free\/|.png/g, "") + ".png";
    }
    static ["downloadSkin"](oa) {
      this.downloadedSkins.set(oa, false);
      const il = new Image();
      il.crossOrigin = "anonymous";
      il.onload = () => {
        this.cropSkinBitmap(il, (bit) => {
          this.downloadedSkins.set(oa, bit);
        });
      };
      il.src = oa;
    }
    static ["cropSkinBitmap"](img, done) {
      // Circular-crop + PNG encode OFF the main thread. The old canvas +
      // toDataURL() path ran its multi-hundred-ms PNG encode synchronously on
      // the render thread whenever a skin image finished loading - and that
      // load fires at arbitrary times (every respawn/color change for you,
      // your tabs, or a skinned friend), which is exactly the recurring
      // random ~1s freeze. OffscreenCanvas rasterizes in a worker thread;
      // drawImage accepts the resulting ImageBitmap directly.
      if ("undefined" === typeof OffscreenCanvas) {
        done(null);
        return;
      }
      try {
        const adv = new OffscreenCanvas(512, 512);
        const acz = adv.getContext("2d");
        acz.beginPath();
        acz.arc(256, 256, 256, 0, 2 * Math.PI, true);
        acz.closePath();
        acz.clip();
        acz.drawImage(img, 0, 0, 512, 512);
        adv
          .convertToBlob({ type: "image/png" })
          .then((blob) => createImageBitmap(blob))
          .then(done)
          .catch(() => done(null));
      } catch (e) {
        done(null);
      }
    }
    static ["getImgurCode"](ajz) {
      if (!ajz) {
        return "XXXXXXX";
      }
      // Accepts the direct-image link (i.imgur.com/CODE.png), the plain
      // webpage link people actually copy by default (imgur.com/CODE, no
      // "i." subdomain, no extension), and album/gallery links - the old
      // regex only matched the first form, so pasting the normal share
      // link silently fell through to "invalid" every time.
      const ahb = ajz.match(/(?:https?:\/\/)?(?:i\.)?imgur\.com\/(?:a\/|gallery\/)?([a-zA-Z0-9]{5,8})(?:\.(?:png|jpe?g|gifv?|webp))?/i);
      return null === ahb ? "XXXXXXX" : ahb[1];
    }
    static ["getRaindowFlag"](xx) {
      return null !== xx.match(/#hue\s??=\s??auto\s??,\s??blend\s??=\s??auto/i);
    }
    static ["code2Url"](aae) {
      return "https://i.imgur.com/" + aae + ".png";
    }
    static ["commands"]() {
      const afn = this.ctx;
      const ui = "off" === Settings.commander;
      afn.strokeStyle = "#ffffff";
      afn.lineWidth = 5;
      for (const acg of this.commanderPoints.values()) {
        const ack = acg.x;
        const ai = acg.y;
        const iw = GameLoop.time - acg.time;
        if (iw > 1250) {
          this.commanderPoints["delete"](acg);
        } else {
          if (!(ui || 1 > iw)) {
            const ako = (1000 * iw) / 1250;
            afn.globalAlpha = ako > 333 ? (1000 - ako) / 667 : 1;
            const ut = afn.createRadialGradient(ack, ai, 0.7 * ako, ack, ai, ako);
            ut.addColorStop(0, "rgba(0,0,0,0)");
            ut.addColorStop(1, Theme.commanderColor);
            afn.fillStyle = ut;
            afn.beginPath();
            afn.arc(ack, ai, ako, 0, this.pi2, true);
            afn.closePath();
            afn.fill();
            afn.stroke();
          }
        }
      }
    }
    static ["mouseTracker"]() {
      if ("off" !== Settings.cursorLine) {
        const om = this.ctx;
        om.strokeStyle = "#fff";
        om.lineWidth = 4;
        om.lineCap = "round";
        om.lineJoin = "round";
        const aln = (Mouse.x - this.canvas.width / 2) / Camera.viewport + Camera.x;
        const bo = (Mouse.y - this.canvas.height / 2) / Camera.viewport + Camera.y;
        om.beginPath();
        const wv = {
          x: 0x0,
          y: 0x0,
        };
        const abg = 1 === Player.typeID ? CellData.myCells : CellData.myCells2;
        const abz = 1 === Player.typeID ? wv : WorldData.position;
        for (const act of abg.values()) {
          om.moveTo(act.animX - abz.x, act.animY - abz.y);
          om.lineTo(aln, bo);
        }
        om.closePath();
        om.stroke();
      }
    }
    static async ["getKnownSkins"]() {
      var ne = await fetch("https://3rb.io/php/Skins.php?type=free");
      var acb = await ne.json();
      var ts = Date.now();
      for (let nh = 0; nh < acb.length; nh++) {
        Renderer.knownSkins[acb[nh]] = ts;
      }
      for (let aak in Renderer.knownSkins)
        if (Renderer.knownSkins[aak] != ts) {
          delete Renderer.knownSkins[aak];
        }
    }
    static ["cacheIndicator"]() {
      const ak = document.createElement("canvas");
      ak.width = 150;
      ak.height = 150;
      const uy = ak.getContext("2d");
      uy.textAlign = "center";
      uy.textBaseline = "middle";
      uy.font = "600 150px FontAwesome";
      uy.fillStyle = "rgba(255,255,255,1)";
      uy.fillText("âڈ·آ¸", 75, 75);
      return ak;
    }
  }
  class GameLoop {
    static ["init"]() {
      this.time = Date.now();
      WsConnection.init();
      Storage.init();
      MainMenu.init();
      CellData.init();
      Player.init();
      Camera.init();
      RelayData.init();
      PartyManager.init();
      Account.init();
      Renderer.init();
      this.loop = new RafLoop(() => {
        this.run();
      });
      setInterval(() => {
        Mouse.send();
      }, 40);
      // The relay re-broadcasts every update to every room member, so the
      // heartbeat's cost scales with members × cadence. aliveStatus() is
      // tiny (2 bytes) and still goes out on every tick to keep the
      // server's 6s staleness purge from kicking an idle-but-connected
      // player, while positionMass() (the heavy 9-byte one) only fires
      // when the position/mass actually changed. biggest() stays
      // scouting-only, same condition as before.
      const hbPos = { x: 0, y: 0, m: 0 };
      let hbAlive = -1;
      setInterval(() => {
        RelaySender.aliveStatus();
        const x = 0 | Player.x;
        const y = 0 | Player.y;
        const m = Player.mass;
        if (x !== hbPos.x || y !== hbPos.y || m !== hbPos.m) {
          RelaySender.positionMass();
          hbPos.x = x;
          hbPos.y = y;
          hbPos.m = m;
        }
        if (Player.scouting || (!Player.isAlive && Camera.isSpectating && !Camera.freeSpectate)) {
          RelaySender.biggest();
        }
      }, 500);
      setInterval(() => {
        this.updateRestartCountdown();
      }, 1000);
    }
    static ["updateRestartCountdown"]() {
      const em = $("#server-restart-countdown");
      if (!WsConnection.restartAt) {
        em.text("").removeClass("warning");
        return;
      }
      const zx = WsConnection.restartAt - Date.now();
      if (0 >= zx) {
        em.text("Server restarting...").addClass("warning");
        return;
      }
      const rd = Math.floor(zx / 1000);
      const nc = Math.floor(rd / 60);
      const agr = rd % 60;
      em.text("Server restart in " + nc + ":" + (10 > agr ? "0" : "") + agr);
      em.toggleClass("warning", 60000 > zx);
    }
    static ["run"]() {
      GameLoop.refreshTime();
      CellData.update();
      Player.update();
      Camera.update();
      Renderer.run();
      Minimap.run();
      TeamList.update();
      Stats.update();
      TargetingHud.update();
    }
    static ["browserVersion"]() {
      const air = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
      return !!air && parseInt(air[2], 10);
    }
    static ["refreshTime"]() {
      this.time = Date.now();
    }
  }
  window.onload = () => (
    $("#loading-screen").html(
      '<div class="ls-title">Drag+</div><div class="ls-spinner"><span id="ls-icon"><i class="fa fa-solid fa-circle-notch fa-spin"></i></span><span style="display:block;" id="ls-message">Loading...</span></div>',
    ),
    49 > GameLoop.browserVersion()
      ? ($("#ls-icon").html('<i class="fa fa-chrome" aria-hidden="true"></i>'),
        void $("#ls-message").text(" Only Chrome version 49 or higher are supported."))
      : (Language.init(),
        GameLoop.init(),
        class {
          static ["init"]() {
            this.apiUrl = "";
            this.codeChecked = false;
            this.salt = Storage.get("profiles", "salt") || "";
            this.Code = Storage.get("profiles", "MXCode") || "";
            $("#private-code").val(this.Code);
            this.addEvents();
            this.checkCode();
          }
          static ["addCode"]() {
            this.salt = this.generateCode(5);
            Storage.set("profiles", "salt", this.salt);
            this.MXCode = this.generateCode(10);
            Storage.set("profiles", "Code", this.Code);
            this.sendAddCode();
          }
          static ["addEvents"]() {
            $("#user-code-check").click(() => {
              $("#userCode").fadeOut(250);
              this.checkCode();
            });
          }
          static ["sendAddCode"]() {}
          static ["checkCode"]() {}
          static ["generateCode"](qo) {
            var gp = "";
            for (var alk = 0; alk < qo; alk++) {
              var lf = Math.floor(62 * Math.random());
              var vx = (lf += lf > 9 ? (lf < 36 ? 55 : 61) : 48);
              gp += String.fromCharCode(vx);
            }
            return gp;
          }
          static ["getApiUrl"]() {
            return window.atob(window.atob(window.atob(this.apiUrl)));
          }
        }.init())
  );
})(window, $, document);
