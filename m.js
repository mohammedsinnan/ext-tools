(function crestDependencyGate(factory) {
  const state=window.__crestLaunch||(window.__crestLaunch={});
  if(state.factoryAccepted)return;
  state.factoryAccepted=true;
  let deadline=Date.now()+60000,timer;
  const status=(message)=>{const el=document.getElementById('ls-message');if(el)el.textContent=message};
  const check=()=>{
    clearTimeout(timer);
    const jq=window.jQuery;
    const dom=document.getElementById('crest-dom-ready')&&document.getElementById('canvas')&&document.getElementById('button-play');
    if(dom&&jq&&jq.fn&&typeof jq.fn.perfectScrollbar==='function'&&typeof jq.fn.minicolors==='function'){
      if(state.factoryStarted)return;state.factoryStarted=true;
      try{factory(window,jq,document)}catch(error){state.error=String(error.message||error);status('The client could not start. '+state.error);const retry=document.getElementById('crest-start-retry');if(retry){retry.hidden=false;retry.onclick=()=>location.reload()}}
      return;
    }
    status(dom?'Preparing the interface library…':'Preparing your arena…');
    if(Date.now()>=deadline){status('An interface resource did not finish loading. Retry the startup or install the updated Crest loader below.');const retry=document.getElementById('crest-start-retry');if(retry){retry.hidden=false;retry.onclick=()=>{deadline=Date.now()+60000;retry.hidden=true;check()}}return}
    timer=setTimeout(check,100);
  };
  window.addEventListener('load',check);
  document.addEventListener('DOMContentLoaded',check);
  check();
})(function(window,$,document){
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
    title: "Crest",
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
      this.moMotionStyle = ["classic", "smooth", "cinematic", "fluid", "snappy"].includes(motionStyle) ? motionStyle : "cinematic";
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
      const moPerformance = Storage.get("settings", "moPerformance");
      this.moPerformance = ["quality","balanced","performance"].includes(moPerformance) ? moPerformance : "quality";
      const arenaStyle = Storage.get("settings", "moArenaStyle");
      this.moArenaStyle = ["classic","space","abyss","obsidian"].includes(arenaStyle) ? arenaStyle : "space";
      const arenaEffects = Storage.get("settings", "moArenaEffects");
      this.moArenaEffects = typeof arenaEffects === "number" && Number.isFinite(arenaEffects) ? Math.max(0,Math.min(1,arenaEffects)) : 0.7;
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
        Notifications.alert("Crest", "Please rejoin the server!");
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
        Notifications.alert("Crest", Language.current.notif.nickChangeInGame);
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
    static async prepare(){
      if(this.bootstrapInfo)return this.bootstrapInfo;
      if(this.preparing)return this.preparing;
      this.preparing=(async()=>{let lastError;for(let attempt=0;attempt<3;attempt++){window.__crestStatus?.(attempt?'Retrying the server directory…':'Finding available arenas…',2);try{const info=await this.requestServerinfo();this.bootstrapInfo=info;return info}catch(error){lastError=error;if(attempt<2)await new Promise(resolve=>setTimeout(resolve,1000*(attempt+1)))}}throw lastError})();
      try{return await this.preparing}finally{this.preparing=null}
    }
    static requestServerinfo(){return new Promise((resolve,reject)=>{const xhr=new XMLHttpRequest();xhr.open('GET','https://3rb.io/php/Servers.php',true);xhr.timeout=8000;xhr.onload=()=>{try{if(xhr.status<200||xhr.status>=300)throw Error('Server directory returned '+xhr.status);const data=JSON.parse(xhr.responseText);if(!data||typeof data.ip!=='string'||!data.ip||!data.modes||!Object.keys(data.modes).length||!Object.values(data.modes).every(m=>m&&Array.isArray(m.servers)&&m.servers[0]&&m.servers[0].port))throw Error('The server directory response was incomplete');resolve(data)}catch(error){reject(error)}};xhr.onerror=()=>reject(Error('Could not reach the server directory'));xhr.ontimeout=()=>reject(Error('The server directory timed out'));xhr.onabort=()=>reject(Error('Server directory request was cancelled'));xhr.send()})}
    static ["fetchServerinfo"](){if(!this.bootstrapInfo)throw Error('Server directory is not ready');return this.bootstrapInfo}
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
        Notifications.warn("Crest", "Unexpected error occured while parsing servers info.");
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
      const lines = ["MO connection report 5", "Server selected: " + Boolean(W.ip), "Browser verification SDK: " + Boolean(window.turnstile && window.turnstile.render), "Shield library: " + Boolean(window.__SHIELD__), "Signed-in session: " + Boolean(A.loggedIn), "Tag relay connected: " + Boolean(RelayWs.connected), "Tag relay socket: " + (RelayWs.ws ? ["connecting", "open", "closing", "closed"][RelayWs.ws.readyState] : "none")];
      const sh = window.__SHIELD__;
      lines.push("Shield loaded: " + Boolean(sh && sh.isReady));
      if (sh && sh.isReady) {
        try { lines.push("Shield build: " + sh.shield_build_id() + ", protocol: " + sh.shield_protocol_version() + ", file: " + String(sh.wasmFile || "unknown")); } catch (_) {}
      }
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
  class MoPerformance {
    static mode(){const mode=typeof Settings!=='undefined'?Settings.moPerformance:'quality';return ['quality','balanced','performance'].includes(mode)?mode:'quality'}
    static full(){return this.mode()==='quality'}
    static low(){return this.mode()==='performance'}
    static animated(){return !this.low()}
    static foodLimit(){return this.full()?400:this.low()?0:100}
    static shouldRender(now=performance.now()){if(this.full()){this.lastFrame=null;return true}const interval=1000/60;if(this.lastFrame==null||now<this.lastFrame||now-this.lastFrame>250){this.lastFrame=now;return true}const elapsed=now-this.lastFrame;if(elapsed+0.001<interval)return false;this.lastFrame+=Math.floor((elapsed+0.001)/interval)*interval;return true}
    static init(hub){this.hub=hub;const p=hub.views.performance;p.innerHTML='<div class="moi-muted" style="margin:18px 0 24px">Choose the graphics workload that suits your device.</div><div class="moi-grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))"><button type="button" class="moi-card" data-performance="quality"><strong>Quality</strong><small>Full effects and smooth cosmetic animation. Rendering follows your display.</small></button><button type="button" class="moi-card" data-performance="balanced"><strong>Balanced</strong><small>60 FPS render limit, fewer food halos, simpler animated skins and less cell lighting.</small></button><button type="button" class="moi-card" data-performance="performance"><strong>Performance</strong><small>60 FPS render limit, still cosmetic skins, no food halos or background decoration. Bright spiked viruses stay visible.</small></button></div><div class="moi-note" id="mo-performance-status" role="status"></div><div class="moi-muted">Try Performance if your device struggles, or Balanced to keep more effects. Your choice saves on this device.</div>';p.querySelectorAll('[data-performance]').forEach(b=>b.addEventListener('click',()=>this.select(b.dataset.performance)));this.refresh()}
    static select(mode){if(!['quality','balanced','performance'].includes(mode))return;Settings.moPerformance=mode;Storage.set('settings','moPerformance',mode);this.lastFrame=null;this.refresh()}
    static refresh(){if(!this.hub)return;const p=this.hub.views.performance,mode=this.mode();p.querySelectorAll('[data-performance]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.performance===mode)));p.querySelector('#mo-performance-status').textContent=({quality:'Quality active · full graphics',balanced:'Balanced active · lighter graphics',performance:'Performance active · minimum decoration'}[mode])}
  }

  class MoSkeletonSkin {
    static frames=48;
    static draw(cell,origin,opacity,white,speed=.65,glow=.8){const r=cell.animRadius+5,x=cell.animX-origin.x,y=cell.animY-origin.y;if(!(r>0)||![r,x,y,opacity].every(Number.isFinite)||opacity<=0)return;const ctx=Renderer.ctx;ctx.save();try{ctx.translate(x,y);ctx.globalAlpha=Math.min(1,opacity);this.paint(ctx,r,performance.now()/1000,white,speed,glow)}finally{ctx.restore()}}
    static paint(ctx,r,time,white=false,speed=.65,glow=.8){if(!(r>0)||![r,time,speed,glow].every(Number.isFinite))return;white=Boolean(white);speed=Math.max(0,Math.min(1.5,speed));glow=Math.max(.2,Math.min(1,glow));const reduced=Renderer.moReducedMotion||!MoPerformance.animated()||r*(Camera.viewport||1)<18;ctx.save();try{ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.clip();if(reduced){ctx.drawImage(this.still(white,glow),-r,-r,r*2,r*2);return}this.layers(ctx,r,time,white,speed,glow)}finally{ctx.restore()}}
    static layers(ctx,r,time,white,speed,glow){const alpha=ctx.globalAlpha;ctx.drawImage(this.base(white),-r,-r,r*2,r*2);ctx.save();ctx.rotate(time*.55*(speed/.65));ctx.globalAlpha=alpha*(.4+.6*glow);ctx.drawImage(this.wheel(),-r,-r,r*2,r*2);ctx.restore();const phase=((time/2.8*this.frames)%this.frames+this.frames)%this.frames,frame=Math.floor(phase),blend=MoPerformance.full()?phase-frame:0;ctx.globalAlpha=alpha*(1-blend);ctx.drawImage(this.figure(frame,white),-r,-r,r*2,r*2);if(blend){ctx.globalAlpha=alpha*blend;ctx.drawImage(this.figure((frame+1)%this.frames,white),-r,-r,r*2,r*2)}ctx.globalAlpha=alpha}
    static canvas(){const s=document.createElement('canvas');s.width=s.height=256;return s}
    static base(white){this.bases=this.bases||new Map();if(this.bases.has(white))return this.bases.get(white);const s=this.canvas(),c=s.getContext('2d');c.translate(128,128);const g=c.createRadialGradient(-30,-40,2,0,0,145);g.addColorStop(0,white?'#fbfdff':'#26345d');g.addColorStop(.52,white?'#dfeaf2':'#151b36');g.addColorStop(1,white?'#a8c0d2':'#050c1c');c.fillStyle=g;c.beginPath();c.arc(0,0,128,0,Math.PI*2);c.fill();const halo=c.createRadialGradient(0,-10,5,0,0,116);halo.addColorStop(0,white?'rgba(255,255,255,.8)':'rgba(50,218,206,.1)');halo.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=halo;c.fillRect(-128,-128,256,256);c.strokeStyle=white?'rgba(91,122,157,.17)':'rgba(127,167,224,.14)';c.lineWidth=.7;for(const radius of [105,111]){c.beginPath();c.arc(0,0,radius,0,Math.PI*2);c.stroke()}for(let i=0;i<18;i++){const a=i*2.399963,r=51+(i*31%54),x=Math.cos(a)*r,y=Math.sin(a)*r;c.fillStyle=white?'rgba(74,124,158,.25)':'rgba(141,203,239,.42)';c.beginPath();c.arc(x,y,i%4===0?1.2:.6,0,Math.PI*2);c.fill()}const floor=c.createRadialGradient(0,93,1,0,93,51);floor.addColorStop(0,white?'rgba(74,104,143,.2)':'rgba(29,230,199,.23)');floor.addColorStop(1,'rgba(0,0,0,0)');c.save();c.scale(1,.22);c.fillStyle=floor;c.fillRect(-70,300,140,240);c.restore();this.bases.set(white,s);return s}
    static wheel(){if(this.ring)return this.ring;const s=this.canvas(),c=s.getContext('2d');c.translate(128,128);c.lineCap='round';c.lineJoin='round';for(let i=0;i<12;i++){const a=i*Math.PI/6,accent=i%3===0?'#d2a0ff':'#75f5e2';c.strokeStyle=accent;c.shadowColor=accent;c.shadowBlur=7;c.lineWidth=2.6;c.beginPath();c.arc(0,0,119,a+.065,a+.43);c.stroke();c.shadowBlur=0;c.strokeStyle=i%3===0?'#f4e4ff':'#d5fff4';c.lineWidth=.8;c.beginPath();c.arc(0,0,119,a+.1,a+.35);c.stroke();c.save();c.rotate(a);c.strokeStyle='#8db9d1';c.lineWidth=.8;c.beginPath();c.moveTo(111,0);c.lineTo(114,0);c.stroke();if(i%3===0){c.fillStyle='#e7d9ff';c.beginPath();c.moveTo(119,-3);c.lineTo(123,0);c.lineTo(119,3);c.lineTo(115,0);c.closePath();c.fill()}c.restore()}c.strokeStyle='rgba(140,227,223,.27)';c.lineWidth=.7;c.beginPath();c.arc(0,0,125,0,Math.PI*2);c.stroke();this.ring=s;return s}
    static figure(frame,white){this.figures=this.figures||new Map();frame=Number.isFinite(frame)?((Math.floor(frame)%this.frames)+this.frames)%this.frames:0;white=Boolean(white);const key=frame+':'+white;if(this.figures.has(key))return this.figures.get(key);const s=this.canvas(),c=s.getContext('2d');c.translate(128,128);const t=frame/this.frames*Math.PI*2,sway=Math.sin(t),beat=Math.sin(t*2),bob=beat*2.7;c.translate(sway*5,bob);c.rotate(sway*.055);c.lineCap='round';c.lineJoin='round';const outline=white?'#698aa3':'#335b72',joint=white?'#faffff':'#c5f6eb';const bone=c.createLinearGradient(-30,-85,30,90);bone.addColorStop(0,'#fffce7');bone.addColorStop(.5,white?'#f4fcff':'#e1f5ee');bone.addColorStop(1,white?'#d9e8f1':'#9edbda');
      const path=points=>{c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));};const limb=(a,b,width=5)=>{path([a,b]);c.strokeStyle=outline;c.lineWidth=width+2.7;c.stroke();c.strokeStyle=bone;c.lineWidth=width;c.stroke();};const ball=(x,y,r=3)=>{c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=joint;c.fill();c.strokeStyle=outline;c.lineWidth=1;c.stroke();};
      // Footwork and knees remain comfortably inside the circular silhouette.
      const hipL=[-12,32],hipR=[12,32],kneeL=[-23-9*sway,61+4*Math.cos(t)],kneeR=[23+9*sway,61-4*Math.cos(t)],footL=[-31-12*sway,89+4*beat],footR=[31+12*sway,89-4*beat];
      for(const [hip,knee,foot,side]of [[hipL,kneeL,footL,-1],[hipR,kneeR,footR,1]]){limb(hip,knee,5.7);limb(knee,foot,4.5);limb([knee[0]+3*side,knee[1]+6],[foot[0]+3*side,foot[1]-3],1.5);ball(...knee,3.8);limb(foot,[foot[0]+side*12,foot[1]+2],5.7);for(let j=0;j<3;j++)limb([foot[0]+side*(6+j*3),foot[1]-1],[foot[0]+side*(6+j*3),foot[1]+4],1.2);}
      const shoulderL=[-19,-28],shoulderR=[19,-28],elbowL=[-43-5*Math.cos(t),-7-17*sway],elbowR=[43+5*Math.cos(t),-7+17*sway],handL=[-61-5*Math.cos(t),-35-24*sway],handR=[61+5*Math.cos(t),-35+24*sway];
      for(const [shoulder,elbow,hand,side]of [[shoulderL,elbowL,handL,-1],[shoulderR,elbowR,handR,1]]){limb(shoulder,elbow,5);limb(elbow,hand,4);limb([elbow[0]+side*3,elbow[1]-1],[hand[0]+side*3,hand[1]+3],1.5);ball(...elbow,3.3);c.save();c.translate(...hand);c.rotate(side*(.5+sway*.35));limb([0,0],[0,-6],4.5);for(let j=0;j<4;j++){const x=-5+j*3;limb([x,-5],[x-1,-12-j%2*2],1.5);ball(x,-7,1);}limb([4,-2],[9,-6],2);c.restore();}
      limb([0,-39],[0,21],4);for(let i=0;i<4;i++){const y=-18+i*9;ball(0,y,2.6);for(const side of [-1,1]){c.beginPath();c.moveTo(side*3,y-3);c.bezierCurveTo(side*15,y-7,side*(26-i*2),y-5,side*(23-i*2),y+1);c.bezierCurveTo(side*22,y+7,side*12,y+9,side*7,y+7);c.strokeStyle=outline;c.lineWidth=5;c.stroke();c.strokeStyle=bone;c.lineWidth=3.2;c.stroke();}}
      limb([0,-27],shoulderL,3.5);limb([0,-27],shoulderR,3.5);for(const side of [-1,1]){c.beginPath();c.moveTo(side*2,20);c.quadraticCurveTo(side*25,18,side*21,31);c.quadraticCurveTo(side*17,43,side*10,35);c.lineTo(side*4,29);c.closePath();c.fillStyle=bone;c.fill();c.strokeStyle=outline;c.lineWidth=2;c.stroke();c.fillStyle=outline;c.beginPath();c.ellipse(side*13,29,4,5,side*.5,0,Math.PI*2);c.fill();}
      // Oversized, expressive skull makes the dancer readable at game scale.
      c.save();c.translate(sway*2,-65);c.rotate(-sway*.12);c.shadowColor=white?'rgba(93,142,171,.2)':'rgba(119,241,219,.35)';c.shadowBlur=7;c.beginPath();c.moveTo(-18,14);c.bezierCurveTo(-32,7,-32,-12,-24,-23);c.bezierCurveTo(-17,-35,17,-35,24,-23);c.bezierCurveTo(32,-12,32,7,18,14);c.lineTo(15,25);c.quadraticCurveTo(0,33,-15,25);c.closePath();c.fillStyle=bone;c.fill();c.shadowBlur=0;c.strokeStyle=outline;c.lineWidth=2.7;c.stroke();for(const side of [-1,1]){c.save();c.translate(side*11,-5);c.rotate(side*.16+sway*.06);c.fillStyle=white?'#5c788f':'#10283b';c.beginPath();c.ellipse(0,0,8.8,10,0,0,Math.PI*2);c.fill();c.shadowColor='#65f9dc';c.shadowBlur=5;c.fillStyle=white?'#bee4e5':'#72f9d8';c.beginPath();c.arc(-1.7,-1.5,2.6,0,Math.PI*2);c.fill();c.shadowBlur=0;c.fillStyle='#fff';c.beginPath();c.arc(-3,-4,1.2,0,Math.PI*2);c.fill();c.restore();}c.fillStyle=outline;c.beginPath();c.moveTo(0,4);c.lineTo(-4,11);c.quadraticCurveTo(0,9,4,11);c.closePath();c.fill();c.strokeStyle=outline;c.lineWidth=2;c.beginPath();c.moveTo(-16,17);c.quadraticCurveTo(0,23,16,17);c.stroke();for(let x=-12;x<=12;x+=6){c.beginPath();c.moveTo(x,18);c.lineTo(x*.92,25);c.stroke()}c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=2;c.beginPath();c.moveTo(-18,-19);c.quadraticCurveTo(-11,-28,-1,-27);c.stroke();c.restore();this.figures.set(key,s);return s}
    static still(white,glow){this.stills=this.stills||new Map();const level=Math.round(glow*4)/4,key=white+':'+level;if(this.stills.has(key))return this.stills.get(key);const s=this.canvas(),c=s.getContext('2d');c.translate(128,128);this.layers(c,128,0,white,0,level);this.stills.set(key,s);return s}
  }

  class MoFireSkin {
    static draw(cell,origin,opacity,white){const r=cell.animRadius+5,x=cell.animX-origin.x,y=cell.animY-origin.y;if(!(r>0)||![r,x,y,opacity].every(Number.isFinite)||opacity<=0)return;const ctx=Renderer.ctx;ctx.save();try{ctx.translate(x,y);ctx.globalAlpha=Math.min(1,opacity);this.paint(ctx,r,performance.now()/1000,white)}finally{ctx.restore()}}
    static paint(ctx,r,time,white=false){if(!(r>0)||![r,time].every(Number.isFinite))return;const alpha=ctx.globalAlpha,reduced=Renderer.moReducedMotion||!MoPerformance.animated()||r*(Camera.viewport||1)<18,phase=reduced?0:((time*9)%16+16)%16,frame=Math.floor(phase),blend=MoPerformance.full()?phase-frame:0;ctx.save();try{ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.clip();ctx.drawImage(this.sprite(frame,white),-r,-r,r*2,r*2);if(blend){ctx.globalAlpha=alpha*blend;ctx.drawImage(this.sprite((frame+1)%16,white),-r,-r,r*2,r*2)}}finally{ctx.restore()}}
    static sprite(frame,white){this.cache=this.cache||new Map();const key=frame+':'+white;if(this.cache.has(key))return this.cache.get(key);const s=document.createElement('canvas');s.width=s.height=192;const c=s.getContext('2d'),image=c.createImageData(192,192),pixels=image.data,phase=frame/16*Math.PI*2;const stops=[[0,18,3,11],[.22,111,13,13],[.43,220,39,7],[.62,255,108,11],[.8,255,211,54],[1,255,250,188]];
      for(let y=0;y<192;y++)for(let x=0;x<192;x++){const nx=(x-96)/96,ny=(y-96)/96,rad=Math.hypot(nx,ny),at=(y*192+x)*4;if(rad>1)continue;const flow=Math.sin(nx*10+Math.sin(ny*8+phase*2)*1.15+Math.sin(nx*5-phase)*.7),tongue=Math.pow(Math.max(0,flow),3),fine=Math.sin(nx*21+ny*12+phase*3)*Math.sin(ny*18+phase*2),core=Math.max(0,1-Math.hypot(nx*.9,ny+.14));const rim=Math.max(0,(rad-.83)/.17),heat=Math.max(0,Math.min(1,.3+core*.5+tongue*.31+fine*.045+ny*.06-rim*.13));let i=0;while(i<stops.length-2&&heat>stops[i+1][0])i++;const a=stops[i],b=stops[i+1],t=(heat-a[0])/(b[0]-a[0]);let r=a[1]+(b[1]-a[1])*t,g=a[2]+(b[2]-a[2])*t,blue=a[3]+(b[3]-a[3])*t;if(white){const lum=r*.2126+g*.7152+blue*.0722;r=195+lum*.22;g=198+lum*.2;blue=204+lum*.18}pixels[at]=r;pixels[at+1]=g;pixels[at+2]=blue;pixels[at+3]=255}c.putImageData(image,0,0);c.save();c.translate(96,96);c.beginPath();c.arc(0,0,95,0,Math.PI*2);c.clip();let seed=23117;const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);for(let i=0;i<17;i++){const x=(rnd()-.5)*161,y=88-((frame*7+i*21)%178),r=.5+rnd()*1.1;if(Math.hypot(x,y)>91)continue;c.fillStyle=white?'rgba(109,124,155,.4)':'rgba(255,247,151,.8)';c.beginPath();c.ellipse(x,y,r,r*1.7,-.2,0,Math.PI*2);c.fill()}c.strokeStyle=white?'rgba(250,255,255,.8)':'rgba(255,191,66,.82)';c.lineWidth=1.8;c.beginPath();c.arc(0,0,94.5,0,Math.PI*2);c.stroke();c.restore();this.cache.set(key,s);return s}
  }

  class MoThunderSkin {
    static draw(cell,origin,opacity,white){const r=cell.animRadius+5,x=cell.animX-origin.x,y=cell.animY-origin.y;if(!(r>0)||![r,x,y,opacity].every(Number.isFinite)||opacity<=0)return;const ctx=Renderer.ctx;ctx.save();try{ctx.translate(x,y);ctx.globalAlpha=Math.min(1,opacity);this.paint(ctx,r,performance.now()/1000,white)}finally{ctx.restore()}}
    static paint(ctx,r,time,white=false){if(!(r>0)||![r,time].every(Number.isFinite))return;const alpha=ctx.globalAlpha,reduced=Renderer.moReducedMotion||!MoPerformance.animated()||r*(Camera.viewport||1)<18,phase=reduced?0:((time*7)%12+12)%12,frame=Math.floor(phase),blend=MoPerformance.full()?phase-frame:0;ctx.save();try{ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.clip();ctx.drawImage(this.base(white),-r,-r,r*2,r*2);ctx.globalAlpha=alpha*(1-blend);ctx.drawImage(this.bolts(frame,white),-r,-r,r*2,r*2);if(blend){ctx.globalAlpha=alpha*blend;ctx.drawImage(this.bolts((frame+1)%12,white),-r,-r,r*2,r*2)}}finally{ctx.restore()}}
    static base(white){this.bases=this.bases||new Map();if(this.bases.has(white))return this.bases.get(white);const s=document.createElement('canvas');s.width=s.height=256;const c=s.getContext('2d');c.translate(128,128);c.beginPath();c.arc(0,0,127.8,0,Math.PI*2);c.clip();const g=c.createRadialGradient(-25,-42,6,0,0,152);g.addColorStop(0,white?'#f0f8ff':'#29375d');g.addColorStop(.5,white?'#d9e6f4':'#131d3c');g.addColorStop(1,white?'#92a5c4':'#040b20');c.fillStyle=g;c.fillRect(-128,-128,256,256);for(let i=0;i<7;i++){const x=Math.sin(i*1.7)*76,y=Math.cos(i*2.1)*58,h=c.createRadialGradient(x,y,0,x,y,65);h.addColorStop(0,white?'rgba(99,119,166,.1)':'rgba(107,74,179,.17)');h.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=h;c.fillRect(-128,-128,256,256)}c.strokeStyle=white?'#b7c9e6':'#7cbdff';c.lineWidth=2.2;c.beginPath();c.arc(0,0,125.5,0,Math.PI*2);c.stroke();c.strokeStyle=white?'rgba(69,115,174,.3)':'rgba(119,214,255,.35)';c.lineWidth=5;c.beginPath();c.arc(0,0,119,-2.65,-1.38);c.stroke();this.bases.set(white,s);return s}
    static bolts(frame,white){this.frames=this.frames||new Map();const key=frame+':'+white;if(this.frames.has(key))return this.frames.get(key);const s=document.createElement('canvas');s.width=s.height=256;const c=s.getContext('2d');c.translate(128,128);c.beginPath();c.arc(0,0,126,0,Math.PI*2);c.clip();let seed=7189+frame*157;const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);c.lineJoin='round';c.lineCap='round';const stroke=(points,secondary=false)=>{const draw=()=>{c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()};c.shadowColor=white?'#588ec1':secondary?'#9671ff':'#42ccff';c.shadowBlur=white?4:16;c.strokeStyle=white?'rgba(86,127,171,.25)':secondary?'rgba(126,74,255,.48)':'rgba(46,154,255,.4)';c.lineWidth=9;draw();c.shadowBlur=white?0:7;c.strokeStyle=white?'#7c9bc3':secondary?'#b69fff':'#5df1ff';c.lineWidth=3.5;draw();c.shadowBlur=0;c.strokeStyle=white?'#effaff':'#f0ffff';c.lineWidth=2.3;draw()};for(let i=0;i<3;i++){const pts=[],start=-85+i*68;for(let j=0;j<8;j++){const y=-119+j*34,x=start+Math.sin(j*.8+i)*17+(rnd()-.5)*35;pts.push([x,y])}stroke(pts,i===2);for(const index of [2,4]){const [x,y]=pts[index],sign=i===2?-1:1;stroke([[x,y],[x+sign*19,y+7],[x+sign*10,y+21],[x+sign*(31+rnd()*12),y+37]],i===2)}}this.frames.set(key,s);return s}
  }

  class MoWaterSkin {
    static draw(cell,origin,opacity,white,color="#198fc3"){const r=cell.animRadius+5,x=cell.animX-origin.x,y=cell.animY-origin.y;if(!(r>0)||![r,x,y,opacity].every(Number.isFinite)||opacity<=0)return;const ctx=Renderer.ctx;ctx.save();try{ctx.translate(x,y);ctx.globalAlpha=Math.min(1,opacity);const d=this.direction(cell,origin);this.paint(ctx,r,performance.now()/1000,d.x,d.y,white,color)}finally{ctx.restore()}}
    static paint(ctx,r,time,vx=0,vy=0,white=false,color="#198fc3",cached=false){if(!(r>0)||![r,time,vx,vy].every(Number.isFinite))return;if(MoPerformance.low()&&!cached){this.still=this.still||new Map();const key=white+':'+color;let sprite=this.still.get(key);if(!sprite){sprite=document.createElement('canvas');sprite.width=sprite.height=256;const c=sprite.getContext('2d');c.translate(128,128);this.paint(c,128,0,0,0,white,color,true);if(this.still.size>=8)this.still.delete(this.still.keys().next().value);this.still.set(key,sprite)}ctx.drawImage(sprite,-r,-r,r*2,r*2);return}const alpha=ctx.globalAlpha;const reduced=Renderer.moReducedMotion||!MoPerformance.animated()||r*(Camera.viewport||1)<18;const t=reduced?0:time;const tilt=reduced?0:Math.max(-.22,Math.min(.22,-vx*.13));const surge=reduced?0:Math.min(.04,Math.abs(vy)*.014);const level=reduced?0:vy*7;const colors=this.colors(color);ctx.save();try{ctx.scale(r/128,r/128);ctx.beginPath();ctx.arc(0,0,128,0,Math.PI*2);ctx.clip();ctx.drawImage(this.shell(white,false),-128,-128,256,256);
      const wave=(x,phase,amplitude)=>-18+level+tilt*x+Math.sin(x*.027+t*1.65+phase)*(6+surge*128)*amplitude+Math.sin(x*.046-t*.8+phase)*2*amplitude;
      for(let layer=0;layer<2;layer++){ctx.beginPath();ctx.moveTo(-132,132);ctx.lineTo(-132,wave(-132,layer*1.8,layer?1:.7));for(let x=-124;x<=132;x+=8)ctx.lineTo(x,wave(x,layer*1.8,layer?1:.7));ctx.lineTo(132,132);ctx.closePath();ctx.fillStyle=white?(layer?'#dceff3':'#aacbd9'):(layer?colors.base:colors.light);ctx.globalAlpha=alpha*(layer?.94:.78);ctx.fill();if(layer){ctx.globalAlpha=alpha*.55;ctx.strokeStyle=white?'#ffffff':'#a8fff2';ctx.lineWidth=1.5;ctx.beginPath();for(let x=-132;x<=132;x+=8){const y=wave(x,layer*1.8,1);if(x===-132)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.stroke()}}
      ctx.globalAlpha=alpha*.5;for(let i=0;i<5;i++){const bx=Math.sin(i*2.4)*76,by=90-((t*(7+i*2)+i*31)%110),br=2+i%3;if(by<wave(bx,1.8,1)+12)continue;ctx.strokeStyle=white?'#6d9bac':'#c4fff5';ctx.lineWidth=1;ctx.beginPath();ctx.arc(bx,by,br,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#efffff';ctx.beginPath();ctx.arc(bx-br*.3,by-br*.3,.75,0,Math.PI*2);ctx.fill()}
      ctx.globalAlpha=alpha;ctx.drawImage(this.shell(white,true),-128,-128,256,256);
    }finally{ctx.restore()}}
    static colors(color){const hex=/^#[0-9a-f]{6}$/i.test(color||'')?color:'#198fc3';const n=parseInt(hex.slice(1),16),rgb=[n>>16,(n>>8)&255,n&255];return {base:hex,light:'rgb('+rgb.map(x=>Math.round(x*.65+255*.35)).join(',')+')'}}
    static direction(cell,origin){const x=cell.animX-origin.x,y=cell.animY-origin.y,zoom=Camera.viewport;let dx=Number.isFinite(cell._moVX)?cell._moVX:0,dy=Number.isFinite(cell._moVY)?cell._moVY:0;if(cell.isMine&&cell.cellType===Player.typeID&&typeof Mouse!=='undefined'&&Renderer.canvas&&zoom>0&&[Mouse.x,Mouse.y,Camera.x,Camera.y].every(Number.isFinite)){dx=(Mouse.x-Renderer.canvas.width/2)/zoom+Camera.x-x;dy=(Mouse.y-Renderer.canvas.height/2)/zoom+Camera.y-y;const length=Math.hypot(dx,dy),strength=Math.min(2,length/Math.max(40,cell.animRadius));dx=length?dx/length*strength:0;dy=length?dy/length*strength:0}dx=Math.max(-2,Math.min(2,dx));dy=Math.max(-2,Math.min(2,dy));this.directions=this.directions||new WeakMap();const now=performance.now(),old=this.directions.get(cell);const dt=old?Math.max(0,now-old.time):0,blend=!old||dt>250?1:-Math.expm1(-dt/90);const d={x:(old?.x||0)+(dx-(old?.x||0))*blend,y:(old?.y||0)+(dy-(old?.y||0))*blend,time:now};this.directions.set(cell,d);return d}
    static shell(white,overlay){this.cache=this.cache||new Map();const key=white+':'+overlay;if(this.cache.has(key))return this.cache.get(key);const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const c=canvas.getContext('2d');c.translate(128,128);c.beginPath();c.arc(0,0,127.8,0,Math.PI*2);c.clip();if(!overlay){const g=c.createRadialGradient(-40,-62,5,0,0,150);g.addColorStop(0,white?'#eefcff':'#376786');g.addColorStop(.65,white?'#d5e9ee':'#133753');g.addColorStop(1,white?'#8fb2c4':'#071e35');c.fillStyle=g;c.fillRect(-128,-128,256,256)}else{const g=c.createRadialGradient(-25,-40,30,0,0,134);g.addColorStop(0,'rgba(226,255,255,0)');g.addColorStop(.78,'rgba(119,231,255,.025)');g.addColorStop(.94,white?'rgba(87,127,157,.35)':'rgba(2,23,57,.6)');g.addColorStop(1,'rgba(211,251,255,.85)');c.fillStyle=g;c.fillRect(-128,-128,256,256);c.strokeStyle=white?'#e7ffff':'#85e8ff';c.lineWidth=2;c.beginPath();c.arc(0,0,126,0,Math.PI*2);c.stroke();c.save();c.rotate(-.55);c.fillStyle='rgba(239,255,255,.66)';c.beginPath();c.ellipse(-23,-89,39,9,0,0,Math.PI*2);c.fill();c.fillStyle='rgba(230,255,255,.2)';c.beginPath();c.ellipse(-51,-64,8,19,-.12,0,Math.PI*2);c.fill();c.restore();c.strokeStyle='rgba(224,253,255,.35)';c.lineWidth=3;c.beginPath();c.arc(0,0,113,.27,1.1);c.stroke()}this.cache.set(key,canvas);return canvas}
  }

  class MoInventory {
    static config(slot) {
      this.configs = this.configs || {};
      if (!this.configs[slot]) {
        let saved; try { saved = Storage.get('cosmetics', 'player' + slot); } catch (_) {}
        saved = saved && typeof saved === 'object' ? saved : {};
        this.configs[slot] = {
          matchingSkin: saved.matchingSkin !== false,
          skinType: ["water","thunder","fire","skeleton"].includes(saved.skinType) ? saved.skinType : "standard",
          waterColor: /^#[0-9a-f]{6}$/i.test(saved.waterColor||'') ? saved.waterColor : "#198fc3",
          whiteInactive: saved.whiteInactive !== false,
          mode: ['mouse','ring','both','still'].includes(saved.mode) ? saved.mode : 'mouse',
          ring: ['aurora','solar','eclipse','prism','cipher'].includes(saved.ring) ? saved.ring : 'aurora',
          speed: Number.isFinite(saved.speed) ? Math.min(1.5, Math.max(0, saved.speed)) : 0.65,
          glow: Number.isFinite(saved.glow) ? Math.min(1, Math.max(0.2, saved.glow)) : 0.8
        };
      }
      return this.configs[slot];
    }
    static mouse(slot) { return ['mouse','both'].includes(this.config(slot).mode); }
    static ring(slot) { return ['ring','both'].includes(this.config(slot).mode); }
    static save() {
      const c = this.config(this.slot);
      Storage.set('cosmetics', 'player' + this.slot, {...c});
      this.refresh();
      MoSharedCosmetics.publish();
    }
    static init() {
      if (this.root) return;
      const account = document.getElementById('mo-account-toggle');
      if (!account) return;
      this.styles = [
        ['aurora','Frost Sentinel','Crystal armor · ice guardian','#79f5df'],
        ['solar','Solar Sovereign','Golden crown · lion crest','#ffd48b'],
        ['eclipse','Void Reaper','Violet blades · shadow mask','#bc9aff'],
        ['prism','Prism Kitsune','Neon petals · fox spirit','#ffa8dd'],
        ['cipher','Chrome Warden','Heavy steel · robotic helm','#cde4ff']
      ];
      this.slot = 1;
      const style = document.createElement('style');
      style.textContent = `
        #mo-inventory-open{border:1px solid #7dd9e633;background:#142838;color:#def6ff;border-radius:12px;padding:12px 15px;font:600 13px Inter,Ubuntu,sans-serif;cursor:pointer}
        #mo-inventory[hidden]{display:none!important}#mo-inventory{position:fixed;inset:0;z-index:2147483100;background:#030a14c9;backdrop-filter:blur(18px);display:grid;place-items:center;padding:24px;box-sizing:border-box}
        .moi-dialog{width:min(1040px,100%);max-height:90vh;overflow:auto;color:#ebf7ff;background:radial-gradient(ellipse at 15% 0,#1a3949 0,transparent 50%),#0b1725;border:1px solid #b4e8ff26;border-radius:24px;box-shadow:0 24px 100px #0008;padding:28px;font:13px/1.5 Inter,Ubuntu,sans-serif;box-sizing:border-box}
        .moi-head{display:flex;justify-content:space-between;gap:18px;align-items:center}.moi-kicker{color:#7aebd3;letter-spacing:.2em;font-size:10px;font-weight:700}.moi-dialog h2{font-size:30px;letter-spacing:-1px;margin:6px 0}.moi-muted{color:#91abba}.moi-dialog button{cursor:pointer;font:inherit;color:inherit}.moi-close{background:#ffffff09;border:1px solid #fff2;border-radius:12px;padding:10px 15px}
        .moi-tools{display:flex;gap:8px;flex-wrap:wrap;margin:22px 0 18px}.moi-tools button{border:1px solid #ffffff18;background:#071320;border-radius:10px;padding:9px 16px}.moi-tools button[aria-pressed=true]{background:#22524d;border-color:#78ecd07a;color:#adffe7}
        .moi-layout{display:grid;grid-template-columns:240px 1fr;gap:22px}.moi-live{background:linear-gradient(150deg,#152a3d,#0a1421);border:1px solid #b4e8ff18;border-radius:18px;padding:18px;text-align:center}.moi-live canvas{width:100%;aspect-ratio:1}.moi-live strong{display:block;font-size:17px}.moi-live label{display:block;margin-top:22px;text-align:left;color:#a5bdcc;font-size:11px}.moi-live input{width:100%;accent-color:#7cebd4;margin:10px 0}.moi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.moi-card{min-width:0;border:1px solid #b4e8ff1a;background:#102031;border-radius:15px;text-align:left;padding:12px;transition:background .2s,border-color .2s,transform .2s}.moi-card:hover{background:#193449;transform:translateY(-2px)}.moi-card[aria-pressed=true]{border-color:#87f0d9;background:#153c3d;box-shadow:inset 0 0 0 1px #87f0d926}.moi-card canvas{width:100%;aspect-ratio:1;display:block}.moi-card strong{display:block;font-size:12px}.moi-card small{display:block;color:#8ba5b7;font-size:10px;margin-top:3px}.moi-note{align-self:center;padding:18px;color:#91abba;font-size:12px}.moi-note strong{color:#d2ecf8;display:block;margin-bottom:7px}.moi-footer{border-top:1px solid #b4e8ff18;margin-top:23px;padding-top:15px;display:flex;justify-content:space-between;color:#89a7b9;font-size:11px}
        #mo-inventory button:focus-visible,#mo-inventory input:focus-visible,#mo-inventory-open:focus-visible{outline:2px solid #91f4df;outline-offset:3px}
        @media(max-width:760px){#mo-inventory{padding:10px}.moi-dialog{padding:18px;border-radius:18px}.moi-layout{grid-template-columns:1fr}.moi-live canvas{max-width:160px}.moi-grid{grid-template-columns:repeat(2,1fr)}.moi-dialog h2{font-size:25px}.moi-footer{gap:12px}}
      `;
      document.head.appendChild(style);
      this.toggle = document.createElement('button');this.toggle.id='mo-inventory-open';this.toggle.type='button';this.toggle.textContent='◈ Inventory';this.toggle.setAttribute('aria-controls','mo-inventory');this.toggle.setAttribute('aria-expanded','false');account.before(this.toggle);
      this.root=document.createElement('div');this.root.id='mo-inventory';this.root.hidden=true;
      this.root.innerHTML=`<section class="moi-dialog" role="dialog" aria-modal="true" aria-labelledby="moi-title"><header class="moi-head"><div><div class="moi-kicker">MO / ORBIT COLLECTION</div><h2 id="moi-title">Make your orbit yours.</h2><div class="moi-muted">Five complete sets. Bold spinning frames. Matching character skins.</div></div><button type="button" class="moi-close">Close ×</button></header><div class="moi-tools moi-players"><button type="button" data-player="1">Player 01</button><button type="button" data-player="2">Player 02</button></div><div class="moi-tools moi-modes"><button type="button" data-mode="mouse">Mouse motion</button><button type="button" data-mode="ring">Spinning ring</button><button type="button" data-mode="both">Both effects</button><button type="button" data-mode="still">Effects off</button></div><div class="moi-layout"><aside class="moi-live"><canvas width="320" height="320" aria-label="Selected ring preview"></canvas><strong id="moi-selected"></strong><div class="moi-muted">Live preview</div><label>Cell skin<select id="moi-body" aria-label="Cell skin" style="width:100%;margin-top:10px;background:#0b1a29;color:#e6f9ff;padding:10px;border:1px solid #94d7e442;border-radius:10px"><option value="standard">Original / ring set</option><option value="water">Water balloon</option><option value="thunder">Thunderstorm</option><option value="fire">Blazing Fire</option><option value="skeleton">Dancing Skeleton</option></select></label><label id="moi-water-color-row">Water color<input aria-label="Water color" id="moi-water-color" type="color" value="#198fc3" style="height:38px;border:1px solid #94d7e442;border-radius:8px;padding:3px;background:#0b1a29;cursor:pointer"></label><label><input id="moi-skin" type="checkbox" style="width:auto"> Use matching set skin</label><label><input id="moi-white" type="checkbox" style="width:auto"> White skin when inactive</label><label>Rotation speed<input aria-label="Rotation speed" id="moi-speed" type="range" min="0" max="1.5" step="0.05"></label><label>Ring brightness<input aria-label="Ring brightness" id="moi-glow" type="range" min="0.2" max="1" step="0.05"></label></aside><div class="moi-grid"></div></div><footer class="moi-footer"><span>Saved automatically · separate choices for each player</span><span>Shared with updated MO users in your tag / party</span></footer></section>`;
      document.body.appendChild(this.root);
      this.cards=[];
      const grid=this.root.querySelector('.moi-grid');
      for(const [id,name,description] of this.styles){const button=document.createElement('button');button.type='button';button.className='moi-card';button.dataset.ring=id;button.innerHTML=`<canvas width="220" height="220" aria-hidden="true"></canvas><strong>${name}</strong><small>${description}</small>`;button.addEventListener('click',()=>{const c=this.config(this.slot);c.ring=id;if(!this.ring(this.slot))c.mode='ring';this.save()});grid.appendChild(button);this.cards.push(button)}
      const note=document.createElement('div');note.className='moi-note';note.innerHTML='<strong>A ring for every mood.</strong>Choose a complete set. Turn off matching skin to keep your own skin.';grid.appendChild(note);
      this.root.querySelector('#moi-water-color').addEventListener('input',e=>{if(!/^#[0-9a-f]{6}$/i.test(e.target.value))return;this.config(this.slot).waterColor=e.target.value;this.save()});
      this.root.querySelector('#moi-body').addEventListener('change',e=>{this.config(this.slot).skinType=['water','thunder','fire','skeleton'].includes(e.target.value)?e.target.value:'standard';this.save()});
      this.root.querySelector('#moi-white').addEventListener('change',e=>{this.config(this.slot).whiteInactive=e.target.checked;this.save()});
      this.root.querySelector('#moi-skin').addEventListener('change',e=>{this.config(this.slot).matchingSkin=e.target.checked;this.save()});
      this.toggle.addEventListener('click',()=>this.setOpen(this.root.hidden));
      this.root.querySelector('.moi-close').addEventListener('click',()=>this.setOpen(false));
      this.root.addEventListener('click',e=>{if(e.target===this.root)this.setOpen(false)});
      this.root.querySelectorAll('[data-player]').forEach(button=>button.addEventListener('click',()=>{this.slot=Number(button.dataset.player);this.refresh()}));
      this.root.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{this.config(this.slot).mode=button.dataset.mode;this.save()}));
      for(const [id,key] of [['moi-speed','speed'],['moi-glow','glow']])this.root.querySelector('#'+id).addEventListener('input',e=>{this.config(this.slot)[key]=Number(e.target.value);this.save()});
      this.root.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();this.setOpen(false)}if(event.key==='Tab'){const controls=[...this.root.querySelectorAll('button,input,select')].filter(x=>x.getClientRects().length);const first=controls[0],last=controls.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});
      this.refresh();
      MoCustomize.init(this);
    }
    static refresh(){if(!this.root)return;this.previewAt=null;const c=this.config(this.slot);this.root.querySelectorAll('[data-player]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.player)===this.slot)));this.root.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===c.mode)));this.cards.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.ring===c.ring)));this.root.querySelector('#moi-water-color').value=c.waterColor;this.root.querySelector('#moi-water-color-row').hidden=c.skinType!=='water';this.root.querySelector('#moi-body').value=c.skinType;this.root.querySelector('#moi-skin').disabled=c.skinType!=='standard';this.root.querySelector('#moi-white').checked=c.whiteInactive;this.root.querySelector('#moi-skin').checked=c.matchingSkin;this.root.querySelector('#moi-speed').value=c.speed;this.root.querySelector('#moi-glow').value=c.glow;this.root.querySelector('#moi-selected').textContent=c.skinType==='water'?'Water balloon':c.skinType==='thunder'?'Thunderstorm':c.skinType==='fire'?'Blazing Fire':c.skinType==='skeleton'?'Dancing Skeleton':this.styles.find(x=>x[0]===c.ring)[1]}
    static setOpen(open){cancelAnimationFrame(this.frame);if(open){MoMenu.setAccount(false,false);this.slot=Player.typeID===2?2:1;this.refresh()}this.root.hidden=!open;this.toggle.setAttribute('aria-expanded',String(open));if(open){this.root.querySelector('.moi-close').focus();MoCustomize.show('inventory')}else{this.toggle.focus()}}
    static animate(){if(this.root.hidden)return;const now=performance.now();if(this.previewAt!=null&&now-this.previewAt<1000/(MoPerformance.full()?30:15)){this.frame=requestAnimationFrame(()=>this.animate());return}this.previewAt=now;const c=this.config(this.slot),time=performance.now()/1000;for(const card of this.cards)this.preview(card.querySelector('canvas'),card.dataset.ring,c,time);if(c.skinType==='water'){const cv=this.root.querySelector('.moi-live canvas'),ctx=cv.getContext('2d');ctx.clearRect(0,0,cv.width,cv.height);ctx.save();ctx.translate(cv.width/2,cv.height/2);MoWaterSkin.paint(ctx,cv.width*.39,time,Math.sin(time)*.8,0,false,c.waterColor);ctx.restore()}else if(c.skinType==='skeleton'){const cv=this.root.querySelector('.moi-live canvas'),ctx=cv.getContext('2d');ctx.clearRect(0,0,cv.width,cv.height);ctx.save();ctx.translate(cv.width/2,cv.height/2);MoSkeletonSkin.paint(ctx,cv.width*.39,time,false,c.speed,c.glow);ctx.restore()}else if(c.skinType==='fire'){const cv=this.root.querySelector('.moi-live canvas'),ctx=cv.getContext('2d');ctx.clearRect(0,0,cv.width,cv.height);ctx.save();ctx.translate(cv.width/2,cv.height/2);MoFireSkin.paint(ctx,cv.width*.39,time);ctx.restore()}else if(c.skinType==='thunder'){const cv=this.root.querySelector('.moi-live canvas'),ctx=cv.getContext('2d');ctx.clearRect(0,0,cv.width,cv.height);ctx.save();ctx.translate(cv.width/2,cv.height/2);MoThunderSkin.paint(ctx,cv.width*.39,time);ctx.restore()}else this.preview(this.root.querySelector('.moi-live canvas'),c.ring,c,time);this.frame=requestAnimationFrame(()=>this.animate())}
    static preview(canvas,id,c,time){const ctx=canvas.getContext('2d'),size=canvas.width,r=size*.39;ctx.clearRect(0,0,size,size);ctx.save();ctx.translate(size/2,size/2);ctx.fillStyle='#172d41';ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();if(c.matchingSkin)ctx.drawImage(this.skin(id),-r,-r,r*2,r*2);else{ctx.fillStyle='#98c3d8';ctx.font='600 '+size*.13+'px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('MO',0,0)}this.paint(ctx,id,r,time,c);ctx.restore()}
    static sprite(id,layer){this.sprites=this.sprites||new Map();const key=id+layer;if(this.sprites.has(key))return this.sprites.get(key);const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const ctx=canvas.getContext('2d');ctx.translate(256,256);const palettes={aurora:['#9efff0','#38bfdd','#143d69'],solar:['#fff4ba','#ffb32d','#673a12'],eclipse:['#e1bcff','#ad57ff','#361554'],prism:['#ffadee','#65e8ff','#662764'],cipher:['#f3f8ff','#a9bfd7','#294456']};const colors=palettes[id]||palettes.aurora;ctx.lineJoin='round';ctx.lineCap='round';ctx.shadowColor=colors[1];ctx.shadowBlur=10;
      const tau=Math.PI*2,p=(r,a)=>[Math.cos(a)*r,Math.sin(a)*r];
      const arc=(r,a,b,w,color)=>{ctx.strokeStyle=color;ctx.lineWidth=w;ctx.beginPath();ctx.arc(0,0,r,a,b);ctx.stroke()};
      const poly=(points,fill,stroke=colors[0],w=2)=>{ctx.beginPath();ctx.moveTo(...points[0]);for(const q of points.slice(1))ctx.lineTo(...q);ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.stroke()};
      if(layer){arc(180,0,tau,4,colors[0]);for(let i=0;i<12;i++){const a=i*tau/12;arc(189,a+.05,a+.27,5,colors[1]);poly([p(184,a),p(195,a+.03),p(184,a+.06)],colors[0])}}
      else{
        arc(214,0,tau,30,colors[2]);arc(200,0,tau,4,colors[0]);arc(231,0,tau,3,colors[1]);
        if(id==='aurora'){for(let i=0;i<12;i++){const a=i*tau/12;poly([p(199,a-.14),p(219,a-.1),p(247,a),p(219,a+.1),p(199,a+.14),p(207,a)],colors[1]);poly([p(208,a),p(245,a),p(218,a+.08)],colors[0],'#caffff',1)}}
        else if(id==='solar'){for(let i=0;i<16;i++){const a=i*tau/16;poly([p(203,a-.12),p(227,a-.09),p(i%2?239:248,a),p(227,a+.09),p(203,a+.12)],colors[1]);arc(216,a-.08,a+.08,7,colors[0])}for(let i=0;i<4;i++){const a=i*tau/4;poly([p(210,a-.07),p(245,a),p(210,a+.07),p(196,a)],'#fff5c3')}}
        else if(id==='eclipse'){for(let i=0;i<6;i++){const a=i*tau/6;poly([p(197,a),p(230,a+.14),p(249,a+.38),p(224,a+.32),p(203,a+.66)],colors[1]);arc(216,a+.3,a+.77,8,colors[0])}}
        else if(id==='prism'){for(let i=0;i<10;i++){const a=i*tau/10,c=i%2?colors[1]:colors[0];poly([p(195,a),p(219,a-.16),p(247,a),p(219,a+.16)],c,'#fff1ff',2);poly([p(206,a),p(243,a),p(219,a+.12)],i%2?'#287cb2':'#b442b9',c,1)}}
        else{for(let i=0;i<24;i++){const a=i*tau/24;poly([p(203,a-.08),p(238,a-.08),p(238,a-.04),p(249,a-.04),p(249,a+.04),p(238,a+.04),p(238,a+.08),p(203,a+.08)],i%3===0?colors[0]:colors[1],colors[2],2);arc(216,a-.045,a+.045,4,'#fff')}arc(195,0,tau,5,colors[0])}
      }this.sprites.set(key,canvas);return canvas;
    }
    static skin(id){this.skins=this.skins||new Map();if(this.skins.has(id))return this.skins.get(id);const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const c=canvas.getContext('2d');c.translate(256,256);c.beginPath();c.arc(0,0,256,0,Math.PI*2);c.clip();const colors={aurora:['#7bffe8','#247b97','#0b2537'],solar:['#ffe59e','#cf741e','#311921'],eclipse:['#d59dff','#7546bd','#100c26'],prism:['#ff91db','#327baa','#141c38'],cipher:['#e9f4ff','#59728e','#182738']}[id]||['#7bffe8','#247b97','#0b2537'];const g=c.createRadialGradient(-70,-90,8,0,0,340);g.addColorStop(0,colors[1]);g.addColorStop(1,colors[2]);c.fillStyle=g;c.fillRect(-256,-256,512,512);
      const poly=(points,fill,stroke=colors[0],width=4)=>{c.beginPath();c.moveTo(...points[0]);for(const p of points.slice(1))c.lineTo(...p);c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=stroke;c.lineWidth=width;c.lineJoin='round';c.stroke()};
      // Background etched rays remain still while the outer frame rotates.
      c.strokeStyle=colors[0];c.globalAlpha=.18;c.lineWidth=2;for(let i=0;i<24;i++){const a=i*Math.PI/12;c.beginPath();c.moveTo(Math.cos(a)*130,Math.sin(a)*130);c.lineTo(Math.cos(a)*300,Math.sin(a)*300);c.stroke()}c.globalAlpha=1;
      c.save();c.scale(1.18,1.18);
      if(id==='aurora'){
        poly([[-155,-170],[-80,-124],[0,-170],[80,-124],[155,-170],[136,-5],[102,120],[0,187],[-102,120],[-136,-5]],colors[2]);
        for(const s of [-1,1]){poly([[s*18,-92],[s*113,-136],[s*100,-10],[s*42,52]],colors[1]);poly([[s*42,-41],[s*115,-69],[s*85,-16],[s*35,-8]],'#baffff');poly([[s*52,70],[s*100,25],[s*79,110],[s*20,144]],'#174359')}
        poly([[0,-152],[31,-96],[0,9],[-31,-96]],'#c6fff3');poly([[-26,24],[26,24],[0,62]],colors[0]);
      }else if(id==='solar'){
        for(let i=0;i<14;i++){const a=i*Math.PI/7;poly([[Math.cos(a)*110,Math.sin(a)*110],[Math.cos(a-.12)*193,Math.sin(a-.12)*193],[Math.cos(a)*218,Math.sin(a)*218],[Math.cos(a+.12)*193,Math.sin(a+.12)*193]],i%2?colors[1]:'#85501d',colors[0],2)}
        poly([[-104,-89],[0,-140],[104,-89],[121,14],[69,139],[0,180],[-69,139],[-121,14]],'#9b5926');
        poly([[-98,-98],[-130,-173],[-49,-133],[0,-202],[49,-133],[130,-173],[98,-98]],'#f3c357');
        for(const s of [-1,1]){poly([[s*17,-19],[s*90,-49],[s*70,7],[s*25,8]],'#fff4b4');poly([[0,63],[s*46,30],[s*78,83],[s*22,131]],'#e9af57')}
        poly([[-30,25],[30,25],[0,60]],'#291c1b');
      }else if(id==='eclipse'){
        poly([[-175,-74],[-105,-180],[0,-224],[105,-180],[175,-74],[146,126],[0,202],[-146,126]],'#211631');
        poly([[-120,-83],[0,-155],[120,-83],[106,95],[0,159],[-106,95]],'#100f24');
        for(const s of [-1,1]){poly([[s*12,-27],[s*103,-52],[s*76,1],[s*18,10]],'#deacff');poly([[s*49,58],[s*90,96],[s*40,125]],'#7756bb')}
        poly([[0,-150],[21,-73],[0,-39],[-21,-73]],'#b583ee');poly([[-21,50],[21,50],[0,87]],'#8755be');
      }else if(id==='prism'){
        for(const s of [-1,1]){poly([[s*39,-98],[s*162,-211],[s*137,5],[s*93,88],[0,157],[0,-50]],s<0?'#ef8fd1':'#69d5ef');poly([[s*73,-100],[s*147,-184],[s*113,-22]],'#3b3267');poly([[s*23,-3],[s*124,-40],[s*89,23],[s*36,28]],'#15273e');poly([[s*42,9],[s*92,-12],[s*72,15]],'#fff5f9');poly([[s*62,52],[s*110,8],[s*85,84]],'#7a3b8c')}
        poly([[0,-127],[27,-58],[0,-20],[-27,-58]],'#fff0fd');poly([[-19,87],[19,87],[0,109]],'#1b2038');
      }else{
        poly([[-139,-150],[-71,-192],[71,-192],[139,-150],[166,56],[108,157],[0,198],[-108,157],[-166,56]],'#526c87');
        poly([[-105,-91],[0,-130],[105,-91],[102,82],[58,149],[-58,149],[-102,82]],'#142b3e');
        poly([[-122,-42],[-78,-72],[78,-72],[122,-42],[85,12],[-85,12]],'#9dc5e4');
        poly([[-97,-36],[97,-36],[75,-8],[-75,-8]],'#9cffff','#deffff',2);
        poly([[-57,60],[57,60],[38,130],[-38,130]],'#96aabe');c.strokeStyle='#233a51';c.lineWidth=7;for(let x=-30;x<=30;x+=15){c.beginPath();c.moveTo(x,75);c.lineTo(x,111);c.stroke()}
      }c.restore();
      // An illuminated circular edge ties the character skin to its frame.
      c.beginPath();c.arc(0,0,251,0,Math.PI*2);c.strokeStyle=colors[0];c.lineWidth=6;c.stroke();
      this.skins.set(id,canvas);return canvas;
    }
    static drawSkin(cell,origin,opacity){const v=MoSharedCosmetics.visual(cell);if(v?.c.skinType==='skeleton'&&!cell.isVirus&&!cell.isFood&&!cell.isEjected)return MoSkeletonSkin.draw(cell,origin,opacity,this.inactive(cell),v.c.speed,v.c.glow);if(v?.c.skinType==='fire'&&!cell.isVirus&&!cell.isFood&&!cell.isEjected)return MoFireSkin.draw(cell,origin,opacity,this.inactive(cell));if(v?.c.skinType==='thunder'&&!cell.isVirus&&!cell.isFood&&!cell.isEjected)return MoThunderSkin.draw(cell,origin,opacity,this.inactive(cell));if(v?.c.skinType==='water'&&!cell.isVirus&&!cell.isFood&&!cell.isEjected)return MoWaterSkin.draw(cell,origin,opacity,this.inactive(cell),v.c.waterColor);if(!v||cell.isVirus||cell.isFood||cell.isEjected||!['ring','both'].includes(v.c.mode)||!v.c.matchingSkin)return;const r=cell.animRadius+5,x=cell.animX-origin.x,y=cell.animY-origin.y;if(!(r>0)||![r,x,y,opacity].every(Number.isFinite)||opacity<=0)return;const ctx=Renderer.ctx;ctx.save();ctx.globalAlpha=Math.min(1,opacity);ctx.drawImage(this.skinFor(v.c.ring,this.inactive(cell)),x-r,y-r,r*2,r*2);ctx.restore()}


    static inactive(cell){const v=MoSharedCosmetics.visual(cell);return !!(v && v.inactive && v.c.whiteInactive)}
    static skinFor(id,white){if(!white)return this.skin(id);this.whiteSkins=this.whiteSkins||new Map();if(this.whiteSkins.has(id))return this.whiteSkins.get(id);const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const ctx=canvas.getContext('2d');ctx.drawImage(this.skin(id),0,0);const pixels=ctx.getImageData(0,0,512,512);for(let i=0;i<pixels.data.length;i+=4){const value=Math.round(250-(pixels.data[i]*.2126+pixels.data[i+1]*.7152+pixels.data[i+2]*.0722)*.55);pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=value}ctx.putImageData(pixels,0,0);this.whiteSkins.set(id,canvas);return canvas}
    static drawInactive(cell,origin,opacity,source){const v=MoSharedCosmetics.visual(cell);if(['water','thunder','fire','skeleton'].includes(v?.c.skinType))return;if(!v||!this.inactive(cell)||cell.isVirus||cell.isFood||cell.isEjected||(['ring','both'].includes(v.c.mode)&&v.c.matchingSkin))return;const r=cell.animRadius+5,x=cell.animX-origin.x,y=cell.animY-origin.y;if(!(r>0)||![r,x,y,opacity].every(Number.isFinite)||opacity<=0)return;const ctx=Renderer.ctx;ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();ctx.globalAlpha=Math.min(1,opacity);if(source){ctx.filter='grayscale(1) brightness(1.8)';ctx.drawImage(source,x-r,y-r,r*2,r*2);ctx.filter='none';ctx.globalAlpha*=.58}ctx.fillStyle='#fff';ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore()}
    static paint(ctx,id,r,time,c){const reduced=Renderer.moReducedMotion||!MoPerformance.animated(),angle=reduced?0:time*c.speed*.55;for(let layer=0;layer<(MoPerformance.low()?1:2);layer++){ctx.save();ctx.rotate(layer?-angle*.65:angle);ctx.globalAlpha=c.glow*(layer?.7:1);ctx.drawImage(this.sprite(id,layer),-r,-r,r*2,r*2);ctx.restore()}}
    static draw(cell,origin,opacity){const v=MoSharedCosmetics.visual(cell);if(['water','thunder','fire','skeleton'].includes(v?.c.skinType))return;if(!v||cell.isVirus||cell.isFood||cell.isEjected||!['ring','both'].includes(v.c.mode))return;const r=cell.animRadius+5,x=cell.animX-origin.x,y=cell.animY-origin.y;if(!(r>0)||![r,x,y,opacity].every(Number.isFinite)||r*Camera.viewport<18||opacity<=0)return;const ctx=Renderer.ctx,c=v.c;ctx.save();ctx.translate(x,y);ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.clip();ctx.globalAlpha=Math.min(1,opacity);this.paint(ctx,c.ring,r,performance.now()/1000,{...c,glow:c.glow*Math.min(1,opacity)});ctx.restore()}
  }

  class MoCustomize {
    static init(inventory){
      this.inventory=inventory;inventory.toggle.textContent='✦ Customize';inventory.root.querySelector('.moi-kicker').textContent='MO / CUSTOMIZE';inventory.root.querySelector('#moi-title').textContent='Your look. Your reactions.';inventory.root.querySelector('.moi-muted').textContent='Choose your cell style and the emotes you take into the arena.';
      const tabs=document.createElement('div');tabs.className='moi-tools';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Customize category');
      this.views={};this.tabs={};
      for(const [id,label] of [['inventory','Inventory'],['emotes','Emotes'],['gameplay','Gameplay'],['map','Map'],['performance','Performance']]){const button=document.createElement('button');button.type='button';button.textContent=label;button.id='moc-tab-'+id;button.setAttribute('role','tab');button.setAttribute('aria-controls','moc-'+id);button.addEventListener('click',()=>this.show(id));tabs.appendChild(button);this.tabs[id]=button;const panel=document.createElement('section');panel.id='moc-'+id;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);this.views[id]=panel}
      const dialog=inventory.root.querySelector('.moi-dialog');dialog.querySelector('.moi-head').after(tabs);
      for(const selector of ['.moi-players','.moi-modes','.moi-layout'])this.views.inventory.appendChild(dialog.querySelector(selector));
      dialog.querySelector('.moi-footer').before(this.views.inventory,this.views.emotes,this.views.gameplay,this.views.map,this.views.performance);
      this.views.emotes.innerHTML='<div class="moi-muted" style="margin:20px 0">Choose up to five emotes for your gameplay button. Click a face to equip or remove it.</div><div class="moc-loadout" aria-label="Equipped emotes"></div><div class="moi-grid moc-emote-grid" style="margin-top:24px"></div><div class="moi-muted" style="margin-top:18px">Four new faces available · fifth slot ready for another face. Emotes cover your cell for 4 seconds and sync with updated MO users in your tag / party.</div>';
      const saved=Storage.get('cosmetics','emoteLoadout'),all=MoEmotes.library().map(x=>x.id);this.ids=Array.isArray(saved)?[...new Set(saved)].filter(id=>all.includes(id)).slice(0,5):all;
      this.cards=[];for(const face of MoEmotes.library()){const button=document.createElement('button');button.type='button';button.className='moi-card';button.dataset.emote=face.id;button.setAttribute('aria-label',face.label);const img=document.createElement('img');img.src=face.src;img.alt='';img.style.cssText='width:100%;aspect-ratio:1;object-fit:contain;border-radius:50%;display:block;margin-bottom:12px';const name=document.createElement('strong');name.textContent=face.label;button.append(img,name);button.addEventListener('click',()=>{if(this.ids.includes(face.id)){this.ids=this.ids.filter(id=>id!==face.id)}else if(this.ids.length<5)this.ids.push(face.id);Storage.set('cosmetics','emoteLoadout',this.ids);this.refresh();MoEmotes.refreshLoadout()});this.views.emotes.querySelector('.moc-emote-grid').appendChild(button);this.cards.push(button)}
      const css=document.createElement('style');css.textContent='.moc-loadout{display:flex;gap:12px;flex-wrap:wrap}.moc-slot{width:72px;height:72px;border-radius:18px;background:#ffffff07;border:1px dashed #94d7e442;display:grid;place-items:center;color:#91abba;font-size:11px}.moc-slot img{width:58px;height:58px;object-fit:contain;border-radius:50%}.moi-tools [role=tab][aria-selected=true]{background:#22524d;border-color:#78ecd07a;color:#adffe7}';document.head.appendChild(css);MoGameplay.init(this);MoMap.init(this);MoPerformance.init(this);this.refresh();this.show('inventory');
    }
    static refresh(){this.cards.forEach(b=>b.setAttribute('aria-pressed',String(this.ids.includes(b.dataset.emote))));const slots=this.views.emotes.querySelector('.moc-loadout');slots.replaceChildren();for(let i=0;i<5;i++){const slot=document.createElement('div');slot.className='moc-slot';const face=MoEmotes.library().find(x=>x.id===this.ids[i]);if(face){const img=document.createElement('img');img.src=face.src;img.alt=face.label;slot.appendChild(img)}else slot.textContent='Empty '+(i+1);slots.appendChild(slot)}}
    static show(id){for(const key of ['inventory','emotes','gameplay','map','performance']){this.views[key].hidden=key!==id;this.tabs[key].setAttribute('aria-selected',String(key===id))}cancelAnimationFrame(this.inventory.frame);if(id==='inventory'&&!this.inventory.root.hidden)this.inventory.animate()}
  }

  class MoSharedCosmetics {
    static server(){return String(WsConnection.ip||'').split('?')[0].slice(0,180)}
    static payload(){const configs=[1,2].map(slot=>{const c=MoInventory.config(slot);return [c.mode,c.ring,c.speed,c.glow,c.matchingSkin,c.whiteInactive,...(c.skinType==='water'?['water',c.waterColor]:['thunder','fire','skeleton'].includes(c.skinType)?[c.skinType]:[])]});const emotes=[1,2].map(slot=>{const state=MoEmotes.states?.get(slot);return state&&state.until>performance.now()?[MoEmotes.choices[state.index].id,state.started,Math.ceil(state.until-performance.now())]:null});return 'MO1:'+encodeURIComponent(JSON.stringify([this.server(),Player.typeID,configs,emotes]))}
    static read(player,text){if(typeof text!=='string'||!text.startsWith('MO1:')||text.length>1800){delete player.moVisual;return}try{const data=JSON.parse(decodeURIComponent(text.slice(4)));if(!Array.isArray(data)||data.length!==4||typeof data[0]!=='string'||data[0].length>180||![1,2].includes(data[1])||!Array.isArray(data[2])||data[2].length!==2||!Array.isArray(data[3])||data[3].length!==2)throw Error('shape');const configs=data[2].map(c=>{if(!Array.isArray(c)||![6,7,8].includes(c.length)||(c.length>=7&&!['water','thunder','fire','skeleton'].includes(c[6]))||(c.length===8&&(c[6]!=='water'||!/^#[0-9a-f]{6}$/i.test(c[7])))||!['mouse','ring','both','still'].includes(c[0])||!['aurora','solar','eclipse','prism','cipher'].includes(c[1])||!Number.isFinite(c[2])||!Number.isFinite(c[3])||typeof c[4]!=='boolean'||typeof c[5]!=='boolean')throw Error('config');return {mode:c[0],ring:c[1],speed:Math.max(0,Math.min(1.5,c[2])),glow:Math.max(.2,Math.min(1,c[3])),matchingSkin:c[4],whiteInactive:c[5],skinType:['water','thunder','fire','skeleton'].includes(c[6])?c[6]:'standard',waterColor:c.length===8?c[7]:'#198fc3'}});const now=performance.now(),previous=player.moVisual;const emotes=data[3].map((e,i)=>{if(e===null)return null;if(!Array.isArray(e)||e.length!==3||!MoEmotes.library().some(face=>face.id===e[0])||!Number.isFinite(e[1])||!Number.isFinite(e[2])||e[2]<0||e[2]>4000)throw Error('emote');const old=previous?.emotes[i],until=now+e[2];return {index:MoEmotes.library().findIndex(face=>face.id===e[0]),sequence:e[1],until:old&&old.sequence===e[1]&&old.index===MoEmotes.library().findIndex(face=>face.id===e[0])?Math.min(old.until,until):until}});player.moVisual={server:data[0],active:data[1],configs,emotes,received:now};this.rebuild()}catch(_){delete player.moVisual;this.rebuild()}}
    static rebuild(){this.byCell=new Map();const now=performance.now();for(const p of RelayData.teamPlayers?.values()||[]){const v=p.moVisual;if(!v||!p.isAlive||v.server!==this.server()||now-v.received>16000)continue;for(const slot of [1,2]){const color=slot===1?p.colorHex:p.skin2Color;if(!/^#[0-9a-f]{6}$/i.test(color||''))continue;const nick=slot===1?p.nick:(p.nick2||p.nick);this.byCell.set(Renderer.skinKey(nick,color),{c:v.configs[slot-1],inactive:v.active!==slot,emote:v.emotes[slot-1],received:v.received})}}}
    static visual(cell){if(cell.isMine)return {c:MoInventory.config(cell.cellType),inactive:Player.typeID!==cell.cellType,emote:MoEmotes.states?.get(cell.cellType)};const v=this.byCell?.get(Renderer.skinKey(cell.nick,cell.colorHex));return v&&performance.now()-v.received<=16000?v:null}
    static emote(cell){if(cell.isVirus||cell.isFood||cell.isEjected)return null;const state=this.visual(cell)?.emote;return state&&state.until>performance.now()&&MoEmotes.sprites?.has(state.index)?state:null}
    static publish(){try{if(RelayWs.isOpen())RelaySender.skin()}catch(error){console.warn('MO cosmetic sharing unavailable',error)}}
    static tick(){this.rebuild();if(!RelayWs.isOpen())return;const now=performance.now(),key=JSON.stringify([this.server(),Player.typeID,MoInventory.config(1),MoInventory.config(2),[...MoEmotes.states?.entries()||[]].map(([slot,s])=>[slot,s.index,s.started,s.until>now])]);if(key!==this.lastKey||now-(this.lastSent||0)>=5000){this.lastKey=key;this.lastSent=now;this.publish()}}
  }

  class MoVirusGlow {
    static draw(cell,origin,opacity){const r=cell.animRadius+5,x=cell.animX-origin.x,y=cell.animY-origin.y,z=Camera.viewport;if(!(r>0)||!(z>0)||![r,x,y,opacity].every(Number.isFinite)||opacity<=0)return;const ctx=Renderer.ctx;ctx.save();try{const alpha=Math.min(1,opacity);if(r*z>=8&&!MoPerformance.low()){ctx.globalAlpha=alpha*.9;const size=r*1.22;ctx.drawImage(this.sprite(),x-size,y-size,size*2,size*2)}ctx.globalAlpha=alpha;ctx.drawImage(this.body(),x-r,y-r,r*2,r*2)}finally{ctx.restore()}}
    static sprite(){if(this.cached)return this.cached;const s=document.createElement('canvas');s.width=s.height=256;const c=s.getContext('2d'),g=c.createRadialGradient(128,128,86,128,128,127);g.addColorStop(0,'rgba(94,255,111,0)');g.addColorStop(.28,'rgba(77,255,124,.02)');g.addColorStop(.49,'rgba(164,255,115,.9)');g.addColorStop(.6,'rgba(73,255,126,.4)');g.addColorStop(1,'rgba(58,239,169,0)');c.fillStyle=g;c.fillRect(0,0,256,256);this.cached=s;return s}
    static body(){if(this.cachedBody)return this.cachedBody;const s=document.createElement('canvas');s.width=s.height=512;const c=s.getContext('2d');c.translate(256,256);c.beginPath();c.arc(0,0,255,0,Math.PI*2);c.clip();const shape=()=>{c.beginPath();for(let i=0;i<40;i++){const a=i*Math.PI/20-Math.PI/2,r=i%2?215:251,x=Math.cos(a)*r,y=Math.sin(a)*r;if(i)c.lineTo(x,y);else c.moveTo(x,y)}c.closePath()};shape();const g=c.createRadialGradient(-70,-85,10,0,0,275);g.addColorStop(0,'#3bbb64');g.addColorStop(.35,'#146644');g.addColorStop(.7,'#073c2f');g.addColorStop(1,'#1c8850');c.fillStyle=g;c.fill();c.save();shape();c.clip();const center=c.createRadialGradient(0,0,5,0,0,210);center.addColorStop(0,'rgba(89,255,123,.33)');center.addColorStop(.4,'rgba(57,204,107,.15)');center.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=center;c.fillRect(-255,-255,510,510);c.strokeStyle='rgba(92,255,131,.22)';c.lineWidth=4;for(let i=0;i<20;i++){const a=i*Math.PI/10-Math.PI/2;c.beginPath();c.moveTo(Math.cos(a)*178,Math.sin(a)*178);c.lineTo(Math.cos(a)*249,Math.sin(a)*249);c.stroke()}c.restore();shape();c.shadowColor='#52ff7c';c.shadowBlur=11;c.strokeStyle='#81ff98';c.lineWidth=7;c.stroke();c.shadowBlur=0;c.strokeStyle='#d9ffbf';c.lineWidth=2;c.stroke();
      c.strokeStyle='rgba(102,246,141,.36)';c.lineWidth=3;c.beginPath();c.arc(0,0,155,0,Math.PI*2);c.stroke();c.fillStyle='#a9ff9c';c.beginPath();c.arc(0,0,18,0,Math.PI*2);c.fill();for(let i=0;i<3;i++){const a=i*Math.PI*2/3-Math.PI/2;c.save();c.rotate(a);c.fillStyle='#8cfb99';c.beginPath();c.arc(0,-63,49,Math.PI*.13,Math.PI*.87);c.arc(0,-48,29,Math.PI*.83,Math.PI*.17,true);c.closePath();c.fill();c.restore()}c.strokeStyle='rgba(199,255,189,.5)';c.lineWidth=5;c.beginPath();c.arc(-40,-43,108,-2.65,-1.35);c.stroke();this.cachedBody=s;return s}
  }

  class MoMap {
    static palette(style=Settings.moArenaStyle){return {space:{bg:'#080e19',grid:'rgba(115,164,220,.1)',text:'rgba(149,182,217,.18)',border:'#82dce8',food:'#a6dfff'},abyss:{bg:'#0e0b1e',grid:'rgba(175,139,224,.1)',text:'rgba(183,160,225,.23)',border:'#b99ce9',food:'#d1b5ff'},obsidian:{bg:'#06151f',grid:'rgba(110,203,215,.1)',text:'rgba(149,214,222,.23)',border:'#7cdecb',food:'#96eddf'}}[style]||null}
    static init(hub){this.hub=hub;const p=hub.views.map;p.innerHTML='<div class="moi-muted" style="margin:18px 0 24px">Give your arena its own atmosphere.</div><div class="moi-grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))"></div><div class="moi-note" role="status" id="mo-map-status"></div><label class="moi-muted" style="display:block;margin:20px 0">Atmosphere intensity <output id="mo-map-intensity"></output><input aria-label="Atmosphere intensity" type="range" min="0" max="100" step="5" style="width:100%;margin-top:14px;accent-color:#83e9d6"></label><div class="moi-muted">Applies instantly and saves on this device.</div>';for(const [id,name,desc] of [['space','Space','Quiet stars · luminous stardust'],['abyss','Nebula','Purple cosmic clouds · quiet starlight'],['obsidian','Aurora','Turquoise light ribbons · a calm starfield']]){const b=document.createElement('button');b.type='button';b.className='moi-card';b.dataset.map=id;const c=document.createElement('canvas');c.width=c.height=640;c.style.cssText='width:100%;height:132px;object-fit:cover;border-radius:12px;margin-bottom:14px';c.getContext('2d').drawImage(id==='space'?BgRender.cacheSpaceTile():this.tile(id),0,0);const title=document.createElement('strong');title.textContent=name;const small=document.createElement('small');small.textContent=desc;b.append(c,title,small);b.addEventListener('click',()=>this.select(id));p.querySelector('.moi-grid').appendChild(b)}p.querySelector('input').addEventListener('input',e=>{const n=Number(e.target.value);if(!Number.isFinite(n))return;Settings.moArenaEffects=Math.max(0,Math.min(1,n/100));Storage.set('settings','moArenaEffects',Settings.moArenaEffects);this.refresh()});this.refresh()}
    static select(style){if(!this.palette(style))return;Settings.moArenaStyle=style;Storage.set('settings','moArenaStyle',style);this.refresh()}
    static refresh(){if(!this.hub)return;const p=this.hub.views.map;p.querySelectorAll('[data-map]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.map===Settings.moArenaStyle)));p.querySelector('#mo-map-status').textContent=({space:'Space',abyss:'Nebula',obsidian:'Aurora',classic:'Classic'}[Settings.moArenaStyle]||'Space')+' arena active';p.querySelector('input').value=Math.round(Settings.moArenaEffects*100);p.querySelector('output').textContent=Math.round(Settings.moArenaEffects*100)+'%'}
    static tile(style){this.artCache=this.artCache||new Map();if(this.artCache.has(style))return this.artCache.get(style);const tile=document.createElement('canvas');tile.width=tile.height=640;const c=tile.getContext('2d'),nebula=style==='abyss';c.fillStyle=nebula?'#0e0b1e':'#06151f';c.fillRect(0,0,640,640);let seed=nebula?54819:92145;const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);const cloud=(x,y,r,color)=>{const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,640,640)};
      if(nebula){cloud(235,290,285,'rgba(95,55,185,.2)');cloud(408,230,215,'rgba(158,62,168,.15)');cloud(330,410,205,'rgba(48,86,192,.13)');for(let i=0;i<14;i++){const x=150+i*25,y=310+Math.sin(i*.45)*80;cloud(x,y,70+rnd()*45,'rgba(149,89,211,.045)')}}else{cloud(315,280,300,'rgba(27,124,146,.13)');c.save();c.lineCap='round';for(let band=0;band<3;band++){const points=[];for(let x=70;x<=580;x+=10)points.push([x,240+band*52+Math.sin(x*.009+band*.5)*65]);for(const [width,alpha] of [[100,.018],[56,.025],[23,.036],[4,.055]]){c.beginPath();for(let i=0;i<points.length;i++){const [x,y]=points[i];if(!i)c.moveTo(x,y);else c.lineTo(x,y)}c.lineWidth=width;c.strokeStyle=band===1?'rgba(62,168,213,'+alpha+')':'rgba(73,225,183,'+alpha+')';c.stroke()}}c.restore()}
      for(let i=0;i<76;i++){const x=8+rnd()*624,y=8+rnd()*624,r=.35+rnd()*.7;c.globalAlpha=.13+rnd()*.3;c.fillStyle=nebula?(i%3?'#c0badf':'#e7b6db'):(i%3?'#a8d3dc':'#b5ecdf');c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();if(i%23===0){c.globalAlpha=.16;c.fillRect(x-2.5,y-.3,5,.6);c.fillRect(x-.3,y-2.5,.6,5)}}c.globalAlpha=1;this.artCache.set(style,tile);return tile}
    static atmosphere(){ /* Scenery is baked into world-anchored tiles. */ }
  }

  class MoGameplay {
    static init(hub){this.hub=hub;const panel=hub.views.gameplay;panel.innerHTML='<div class="moi-muted" style="margin:18px 0 24px">Choose how movement and splits animate on your screen.</div><div class="moi-grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))"><button type="button" class="moi-card" data-gameplay="cinematic"><div style="font-size:32px;color:#83e9d6;margin:10px 0">◉ →</div><strong>Cinematic</strong><small>Your current style · responsive movement and directional stretch.</small></button><button type="button" class="moi-card" data-gameplay="fluid"><div style="font-size:32px;color:#aca6ff;margin:10px 0">◉ ≋</div><strong>Fluid</strong><small>Softer movement and split-size transitions · gentler stretch.</small></button><button type="button" class="moi-card" data-gameplay="snappy"><div style="font-size:32px;color:#ffd58d;margin:10px 0">◉ »</div><strong>Snappy</strong><small>Quicker movement and split-size transitions · minimal stretch.</small></button></div><div class="moi-note" id="mo-gameplay-status" role="status"></div><div class="moi-muted">Applies immediately and saves on this device. Split mechanics, eating, login and multibox stay the same.</div>';panel.querySelectorAll('[data-gameplay]').forEach(button=>button.addEventListener('click',()=>this.select(button.dataset.gameplay)));this.refresh()}
    static select(style){if(!['cinematic','fluid','snappy'].includes(style))return;Settings.moMotionStyle=style;Storage.set('settings','moMotionStyle',style);this.refresh()}
    static refresh(){if(!this.hub)return;const current=Settings.moMotionStyle;this.hub.views.gameplay.querySelectorAll('[data-gameplay]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gameplay===current)));this.hub.views.gameplay.querySelector('#mo-gameplay-status').textContent=current==='snappy'?'Snappy active · quicker transitions with minimal stretch.':current==='fluid'?'Fluid active · soft movement and split transitions.':current==='cinematic'?'Cinematic active · your original motion style.':'Current motion style: '+current+'. Choose a style above to compare.'}
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
      MoInventory.init();
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
  class CrestPreferences {
    static categories=[['overview','Overview','A comfortable place to tune your session.'],['movement','Movement','Camera and animation, tuned to how you play.'],['arena','Arena','The atmosphere around your cells.'],['cells','Cells & labels','Keep your cells readable and recognizable.'],['appearance','Colors & style','Make every detail feel like yours.'],['hud','HUD & chat','Choose what you see around the arena.'],['controls','Controls','Your existing keyboard, mouse and chat bindings.'],['comfort','Interface','New options for a more comfortable settings experience.']];
    static defaults={density:'comfortable',accent:'mint',largeText:false,highContrast:false,reduceMotion:false,remember:true};
    static init(){
      if(this.root)return;
      const record=Storage.get('crestUI','config');this.ui={};for(const [key,value]of Object.entries(this.defaults)){const stored=record&&typeof record==='object'?record[key]:undefined;this.ui[key]=typeof stored===typeof value?stored:value}
      if(!['comfortable','compact'].includes(this.ui.density))this.ui.density='comfortable';if(!['mint','amber','ice','violet'].includes(this.ui.accent))this.ui.accent='mint';
      this.descriptors=[];this.fields=[];this.root=document.createElement('div');this.root.id='crest-preferences-studio';this.root.hidden=true;
      this.root.innerHTML='<div class="cpx-dialog" role="dialog" aria-modal="true" aria-labelledby="cpx-title"><aside class="cpx-sidebar"><div class="cpx-brand"><span>◈</span> CREST<small>MAKE IT YOURS</small></div><nav aria-label="Preference categories"></nav><div class="cpx-sidebar-note">Your arena.<br>Your rhythm.<span>One setup, made for you.</span></div></aside><main class="cpx-main"><header class="cpx-header"><div><small>YOUR PERSONAL SETUP</small><h1 id="cpx-title">Preferences</h1></div><button type="button" class="cpx-close" aria-label="Close preferences">×</button></header><div class="cpx-search-wrap"><span aria-hidden="true">⌕</span><input id="cpx-search" type="search" aria-label="Search preferences" placeholder="Search settings and colors…" autocomplete="off"></div><div class="cpx-scroll" tabindex="-1"><div id="cpx-content"></div><div id="cpx-controls" hidden></div></div><footer class="cpx-footer"><span id="cpx-status" role="status" aria-live="polite">Your settings, ready when you are.</span><span class="cpx-local">SAVED ON THIS DEVICE</span></footer></main></div>';
      document.getElementById('menu-overlay').appendChild(this.root);
      this.content=this.root.querySelector('#cpx-content');this.controls=this.root.querySelector('#cpx-controls');this.search=this.root.querySelector('#cpx-search');this.status=this.root.querySelector('#cpx-status');
      for(const [index,[id,label]]of this.categories.entries()){const button=document.createElement('button');button.type='button';button.dataset.category=id;button.innerHTML='<span class="cpx-nav-index">'+String(index+1).padStart(2,'0')+'</span><span>'+label+'</span>';button.onclick=()=>this.show(id);this.root.querySelector('nav').appendChild(button)}
      for(const [owner,selector]of [[Settings,'#settings .settings-options'],[Theme,'#theme .theme-options'],[Mouse,'#mouse .mouse-options']])for(const source of document.querySelectorAll(selector)){
        const type=source.getAttribute('type'),input=source.querySelector('input');const name=source.getAttribute('name')||input?.id;if(!name||owner===Theme&&['virusColor','virusBorderColor','virusBorderWidth'].includes(name))continue;
        let label=source.closest('.row')?.querySelector('.title')?.textContent.trim()||name;label=({moArenaStyle:'Arena theme',moMotionStyle:'Movement style',CellAnimation:'Animation smoothing',eatAnimation:'Cell eating animation',cameraSpeed:'Camera smoothing',arbSkins:'Original game skins'}[name]||label);
        const item={owner,source,name,label,type,category:this.category(owner,name),description:this.describe(name)};
        if(type==='options'){item.choices=[...source.querySelectorAll('b[value]')].map(x=>[x.getAttribute('value'),x.textContent.trim()]);if(name==='moMotionStyle')item.choices=[['classic','Classic'],['smooth','Smooth'],['cinematic','Cinematic'],['fluid','Fluid'],['snappy','Snappy']];}
        if(type==='range'){const span=source.querySelector('span.outer');item.min=Number(span.getAttribute('min'));item.max=Number(span.getAttribute('max'));item.step=Number(span.getAttribute('step'));}
        if(type==='colorpicker')item.type='color';
        if(type==='range'){const saved=Storage.get(owner===Theme?'theme':owner===Mouse?'mouse':'settings',name);if(typeof saved==='number'&&Number.isFinite(saved)&&saved>=item.min&&saved<=item.max){owner[name]=saved;owner.handleRange(source,2);}}this.descriptors.push(item);
      }
      this.descriptors.push({owner:Settings,name:'moArenaEffects',label:'Arena detail intensity',type:'range',min:0,max:100,step:1,scale:100,category:'arena',description:'Controls decorative scenery. Performance mode may hide it.'});
      this.descriptors.push({owner:Theme,name:'backgroundImage',label:'Background image URL',type:'text',category:'arena',description:'Used when the original background image option is selected.'});
      const native=document.getElementById('inputs');this.controls.appendChild(native);for(const input of native.querySelectorAll('input.key'))input.setAttribute('aria-label',input.closest('.row').querySelector('.title').textContent.trim());const empty=document.createElement('p');empty.className='cpx-no-results';empty.hidden=true;empty.textContent='No matching controls. Try another search.';this.controls.appendChild(empty);for(const input of native.querySelectorAll('#commands input'))$(input).off('blur').on('blur',()=>Commands.setCommand(input.id,input.value));
      // Keep native input handlers, and preserve intentionally cleared bindings.
      for(const input of native.querySelectorAll('#hotkeys .key')){const name=input.closest('.row').getAttribute('name');if(Storage.get('hotkeys',name)===''){Hotkeys[name]='';input.value='';}}
      for(const input of native.querySelectorAll('#commands input'))if(Storage.get('commands',input.id)===''){Commands[input.id]='';input.value='';}
      const tabs=[...native.querySelectorAll('.inputs-tab:not(.close)')];native.querySelector('.inputs-tab-bar').setAttribute('role','tablist');native.querySelector('.inputs-tab-bar').setAttribute('aria-label','Input type');for(const [index,tab]of tabs.entries()){tab.setAttribute('role','tab');tab.setAttribute('aria-controls',tab.getAttribute('target').slice(1));tab.setAttribute('aria-selected',String(tab.classList.contains('active')));tab.tabIndex=tab.classList.contains('active')?0:-1;tab.addEventListener('click',()=>tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1}));tab.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();tab.click()}else if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const next=tabs[(index+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];next.click();next.focus()}})}
      // Only replace the mouse arrow view.
      for(const item of this.descriptors.filter(x=>x.owner===Mouse)){const host=item.source.closest('.row');const card=this.card(item);host.replaceChildren(...card.childNodes);host.classList.add('cpx-mouse-row');}
      this.root.querySelector('.cpx-close').onclick=()=>this.close();this.root.addEventListener('click',e=>{if(e.target===this.root)this.close()});
      this.root.addEventListener('keydown',e=>{e.stopPropagation();const keyField=e.target.matches('#hotkeys input');if(e.key==='Escape'&&!keyField){e.preventDefault();e.stopPropagation();this.close();return}if(e.key==='Tab'){const focusable=[...this.root.querySelectorAll('button,input,select,a[href],[tabindex="0"]')].filter(x=>!x.disabled&&!x.closest('[hidden]')&&x.getClientRects().length);const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&e.target===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&e.target===last){e.preventDefault();first?.focus()}}});
      this.search.oninput=()=>this.render();this.applyUI();
    }
    static category(owner,name){if(owner===Mouse)return'controls';if(owner===Theme){if(['chatFontSize','lbSize','minimapSize','indicatorSize'].includes(name))return'hud';if(['foodSize','virusBorderWidth','gridWidth','gridTextSize','gridTextFont'].includes(name))return'arena';return'appearance'}if(['moMotionStyle','CellAnimation','eatAnimation','cellTextAnimation','zoomSpeed','cameraSpeed','autoZoom','pairCamera'].includes(name))return'movement';if(['moArenaStyle','food','vanillaGrid','bgSectors'].includes(name))return'arena';if(['language','chatType'].includes(name))return'hud';return'cells'}
    static describe(name){return {"language":"Language used by the existing game menus.","moMotionStyle":"Choose the feel of cell transitions.","CellAnimation":"Higher values create softer visual transitions.","eatAnimation":"Animate a cell drawing inward when it is eaten.","cellTextAnimation":"Choose how name and mass labels resize as cells grow.","zoomSpeed":"Adjust how quickly camera zoom responds.","cameraSpeed":"Control how gently the camera follows your cells.","autoZoom":"Let the existing camera choose its zoom.","pairCamera":"Use the existing near/far camera behavior for two players.","moArenaStyle":"Choose Space, Nebula, Aurora or the original arena.","autoHideText":"Hide small labels automatically when space is limited.","hideOwnNick":"Hide the nickname on your own cells.","hideOwnMass":"Hide mass labels on your own cells.","cellNick":"Display player names on cells.","nickShadow":"Choose the shadow drawn behind player names.","cellMass":"Show full mass, shortened mass, or no mass label.","massShadow":"Choose the shadow drawn behind mass labels.","urlSkins":"Display player skins supplied by image URLs.","arbSkins":"Display the original game skin collection.","vanillaGrid":"Display the original arena grid.","bgSectors":"Choose the original background decoration. Space themes use their own scenery.","food":"Choose single-color food, rainbow food, or hide it.","cursorLine":"Draw the existing guide toward your mouse position.","multiboxRing":"Highlight the player you are controlling.","multiboxCellColor":"Use active and inactive colors on your own cell bodies.","teamIndicator":"Show the existing indicator for recognized teammates.","commander":"Display your team’s existing commander markers.","chatType":"Choose the existing chat display mode.","selectedPreset":"A preset can change several supported colors and display options.","chatFontSize":"Change the text size used in chat.","lbSize":"Resize the leaderboard.","minimapSize":"Resize the minimap.","cellTransparencyStyle":"Choose a flat fill or a radiant cell fill.","cellTransparency":"Control cell body opacity. Custom skin artwork stays separate.","lightenCellColor":"Adjust the brightness of the original cell body colors.","borderColor":"Used by the original border. Space themes use their own palette.","borderWidth":"Adjust the width of the arena boundary.","borderStyle":"Choose a fixed or animated arena border.","gridColor":"Color of the original grid when it is enabled.","gridTextColor":"Color of the original sector labels.","gridTextSize":"Resize the original sector labels.","gridTextFont":"Typeface used by the original sector labels.","gridWidth":"Adjust the original grid line width.","nickColor":"Fill color for player names.","nickStrokeColor":"Outline color around player names.","cellNickSize":"Resize player names on cells.","nickFont":"Typeface used for player names.","massColor":"Fill color for mass labels.","massStrokeColor":"Outline color around mass labels.","cellMassSize":"Resize mass labels on cells.","massFont":"Typeface used for mass labels.","foodColor":"Color of single-color food. Themed halos can use the arena palette.","foodSize":"Adjust the size of food artwork.","backgroundColor":"Page background behind the arena canvas.","commanderColor":"Color of your team commander marker.","indicatorSize":"Resize teammate indicators.","multiboxActive":"Color used for your active player highlight.","multiboxInactive":"Color used for your other player highlight.","multiboxRingWidth":"Adjust the active player ring width.","team1color":"Team one color in the existing double-tag mode.","team2color":"Team two color in the existing double-tag mode.","leftClick":"Choose the action assigned to your left mouse button.","middleClick":"Choose the action assigned to your middle mouse button.","rightClick":"Choose the action assigned to your right mouse button."}[name]||''}
    static get(item){if(item.owner===this)return this.ui[item.name];return item.owner[item.name]}
    static open(page='overview'){this.init();this.returnFocus=document.activeElement;const last=Storage.get('crestUI','lastPage');if(page==='overview'&&this.ui.remember&&this.categories.some(x=>x[0]===last))page=last;this.root.hidden=false;this.show(page);this.root.querySelector('.cpx-close').focus()}
    static close(restore=true){if(!this.root||this.root.hidden)return;this.root.hidden=true;Inputs.isOpened=false;if(restore&&this.returnFocus?.isConnected)this.returnFocus.focus()}
    static show(page){if(!this.categories.some(x=>x[0]===page))page='overview';this.page=page;this.search.value='';this.root.querySelectorAll('[data-category]').forEach(x=>x.setAttribute('aria-current',x.dataset.category===page?'page':'false'));Inputs.isOpened=page==='controls';if(page==='controls')$(this.controls.querySelector('#inputs')).stop(true,true).show().css('opacity',1);if(this.ui.remember)Storage.set('crestUI','lastPage',page);this.render();this.root.querySelector('.cpx-scroll').scrollTop=0}
    static applyUI(){if(!this.root)return;this.root.dataset.density=this.ui.density;this.root.dataset.accent=this.ui.accent;this.root.dataset.large=String(this.ui.largeText);this.root.dataset.contrast=String(this.ui.highContrast);document.body.dataset.crestMotion=this.ui.reduceMotion?'reduced':'normal'}
    static commit(item,value){try{if(item.type==='range'){value=Number(value);if(!Number.isFinite(value))throw Error('Enter a valid number');value=Math.min(item.max,Math.max(item.min,item.min+Math.round((value-item.min)/item.step)*item.step));}
      if(item.choices&&!item.choices.some(x=>x[0]===value))throw Error('Choose one of the available options');
      if(item.type==='color'){const probe=document.createElement('span');probe.style.color=String(value);if(!probe.style.color)throw Error('Enter a valid CSS color');}
      if(item.name==='backgroundImage'&&value){const u=new URL(value);if(!['http:','https:'].includes(u.protocol))throw Error('Use an http or https image URL');}
      if(item.owner===this){this.ui[item.name]=value;Storage.set('crestUI',item.name,value);Storage.set('crestUI','config',{...this.ui});this.applyUI();}
      else if(item.owner===Settings)Settings.saveSettings(item.name,item.scale?value/item.scale:value);
      else if(item.owner===Theme)Theme.saveTheme(item.name,value);
      else Mouse.saveMouseOptions(item.name,value);
      if(item.source&&item.owner!==Mouse){if(item.type==='options')item.owner.handleOptions(item.source,2);if(item.type==='range')item.owner.handleRange(item.source,2);}
      this.status.textContent='Saved · '+item.label;this.status.dataset.error='false';this.sync();return true;
    }catch(error){this.status.textContent='Could not save: '+String(error.message||error);this.status.dataset.error='true';this.sync();return false}}
    static sync(){for(const field of this.fields){let value=this.get(field.item);if(field.item.scale)value=Math.round(value*field.item.scale);if(field.input.type==='checkbox')field.input.checked=field.item.type==='boolean'?Boolean(value):value==='on';else field.input.value=value??'';if(field.output)field.output.textContent=String(value??'');if(field.swatch){let hex=String(value||'');if(/^#[0-9a-f]{3}$/i.test(hex))hex='#'+[...hex.slice(1)].map(c=>c+c).join('');if(/^#[0-9a-f]{6}$/i.test(hex))field.swatch.value=hex;}}
      this.root.querySelectorAll('[data-quality]').forEach(b=>b.setAttribute('aria-pressed',String(Settings.moPerformance===b.dataset.quality)))}
    static card(item){const card=document.createElement('article');card.className='cpx-card';card.dataset.setting=item.name;const label=document.createElement('label'),id='cpx-field-'+(item.owner===Theme?'theme-':item.owner===Mouse?'mouse-':item.owner===this?'ui-':'settings-')+item.name;label.htmlFor=id;label.className='cpx-label';label.textContent=item.label;const description=document.createElement('p');description.textContent=item.description||'';card.append(label,description);
      let input,output,swatch;const binary=item.type==='boolean'||item.type==='options'&&item.choices.length===2&&item.choices.some(x=>x[0]==='on')&&item.choices.some(x=>x[0]==='off');
      if(binary){card.classList.add('cpx-toggle-card');const wrap=document.createElement('div');wrap.className='cpx-switch';input=document.createElement('input');input.type='checkbox';input.setAttribute('role','switch');const track=document.createElement('span');track.setAttribute('aria-hidden','true');wrap.append(input,track);card.append(wrap);input.onchange=()=>this.commit(item,item.type==='boolean'?input.checked:input.checked?'on':'off');}
      else if(item.choices){input=document.createElement('select');for(const [value,text]of item.choices){const option=document.createElement('option');option.value=value;option.textContent=text;input.append(option)}card.append(input);input.onchange=()=>this.commit(item,input.value);}
      else if(item.type==='range'){const line=document.createElement('div');line.className='cpx-range';input=document.createElement('input');input.type='range';input.min=item.min;input.max=item.max;input.step=item.step;output=document.createElement('output');output.htmlFor=id;line.append(input,output);card.append(line);input.oninput=()=>output.textContent=input.value;input.onchange=()=>this.commit(item,Number(input.value));}
      else{const wrap=document.createElement('div');wrap.className='cpx-text-line';input=document.createElement('input');input.type='text';if(item.type==='color'){swatch=document.createElement('input');swatch.type='color';swatch.setAttribute('aria-label',item.label+' picker');swatch.oninput=()=>input.value=swatch.value;swatch.onchange=()=>this.commit(item,swatch.value);wrap.append(swatch)}wrap.append(input);card.append(wrap);input.onchange=()=>this.commit(item,input.value.trim());}
      input.id=id;input.setAttribute('aria-label',item.label);this.fields.push({item,input,output,swatch});return card;
    }
    static uiItems(){return[{name:'density',label:'Layout density',type:'options',choices:[['comfortable','Comfortable'],['compact','Compact']],description:'Choose how much space sits between settings.'},{name:'accent',label:'Accent color',type:'options',choices:[['mint','Mint'],['amber','Amber'],['ice','Ice blue'],['violet','Violet']],description:'A personal accent for this settings workspace.'},{name:'largeText',label:'Larger settings text',type:'boolean',description:'Give labels and controls a little more room.'},{name:'highContrast',label:'Stronger contrast',type:'boolean',description:'Darker text and clearer boundaries in settings.'},{name:'reduceMotion',label:'Reduce menu motion',type:'boolean',description:'Reduce decorative CSS animation in the menu.'},{name:'remember',label:'Remember my last page',type:'boolean',description:'Reopen Preferences where you left off.'}].map(x=>({...x,owner:this,category:'comfort'}))}
    static quality(){const section=document.createElement('div');section.className='cpx-quality';for(const [id,label,description]of [['quality','Quality','All the atmosphere. Full cosmetic effects.'],['balanced','Balanced','A lighter load, with the details you love.'],['performance','Performance','Keep it lean. Minimum decoration.']]){const b=document.createElement('button');b.type='button';b.dataset.quality=id;b.innerHTML='<span>'+label+'</span><small>'+description+'</small><b aria-hidden="true">↗</b>';b.onclick=()=>{try{MoPerformance.select(id);this.status.textContent='Saved · '+label+' graphics';this.status.dataset.error='false';this.sync()}catch(error){this.status.textContent='Could not save: '+String(error.message||error);this.status.dataset.error='true';this.sync()}};section.append(b)}return section}
    static render(){const query=this.search.value.trim().toLowerCase();this.fields=this.fields.filter(x=>x.item.owner===Mouse);this.content.replaceChildren();this.controls.hidden=this.page!=='controls';this.content.hidden=this.page==='controls';this.search.placeholder=this.page==='controls'?'Find a shortcut or action…':'Search settings and colors…';if(this.page==='controls'){this.controls.dataset.query=String(Boolean(query));let count=0;for(const row of this.controls.querySelectorAll('.row')){const match=!query||((row.querySelector('.title')?.textContent||'')+' '+(row.getAttribute('name')||'')+' '+(row.querySelector('input')?.placeholder||'')).toLowerCase().includes(query);row.classList.toggle('cpx-filtered',!match);if(match)count++;}this.controls.querySelector('.cpx-no-results').hidden=count>0;this.sync();return}
      const selected=this.categories.find(x=>x[0]===this.page);const intro=document.createElement('div');intro.className='cpx-section-intro';const title=document.createElement('h2');title.textContent=query?'Search results':selected[1];const desc=document.createElement('p');desc.textContent=query?'Matching preferences from every category.':selected[2];intro.append(title,desc);this.content.append(intro);
      if(this.page==='overview'&&!query){const hero=document.createElement('div');hero.className='cpx-hero';hero.innerHTML='<div><small>PLAY YOUR OWN WAY</small><h2>Built around<br>your play.</h2><p>Fine-tune the feel. Make room for focus.</p></div><div class="cpx-orbit" aria-hidden="true"><span></span><i></i><b>◈</b></div>';this.content.append(hero);const h=document.createElement('h3');h.textContent='Choose your graphics workload';this.content.append(h,this.quality());const links=document.createElement('div');links.className='cpx-shortcuts';for(const[id,label]of [['movement','Tune movement'],['controls','Edit controls'],['comfort','Make it comfortable']]){const b=document.createElement('button');b.type='button';b.textContent=label+' ↗';b.onclick=()=>this.show(id);links.append(b)}this.content.append(links);}
      let items=[...this.descriptors.filter(x=>x.owner!==Mouse),...this.uiItems()];if(query)items=items.filter(x=>(x.label+' '+x.name+' '+x.description).toLowerCase().includes(query));else items=items.filter(x=>x.category===this.page);if(this.page==='arena'&&!query)this.content.append(this.quality());
      const qualityMatch=query&&/graphics|quality|balanced|performance/.test(query);if(qualityMatch)this.content.append(this.quality());const grid=document.createElement('div');grid.className='cpx-grid';for(const item of items)grid.append(this.card(item));this.content.append(grid);if(query&&!items.length&&!qualityMatch){const p=document.createElement('p');p.className='cpx-no-results';p.textContent='No matching settings. Try “camera”, “color” or “text”.';this.content.append(p)}this.sync();
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
      CrestPreferences.init();
    }
    static ["buttons"]() {
      $("#button-settings").click(() => {
        this.closeSubMenus();
        CrestPreferences.open('overview');
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
        CrestPreferences.open('controls');
      });
      $("#button-theme").click(() => {
        this.closeSubMenus();
        CrestPreferences.open('appearance');
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
      CrestPreferences.close(false);
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
      CrestPreferences.close(false);
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
      const fluid = Settings.moMotionStyle === "fluid";
      const snappy = Settings.moMotionStyle === "snappy";
      const moveBlend = resumed ? 1 : -Math.expm1(-dt / (delay * (snappy ? 0.45 : fluid ? 0.95 : 0.75)));
      const sizeBlend = resumed ? 1 : -Math.expm1(-dt / (delay * (snappy ? 0.35 : fluid ? 0.85 : 0.55)));
      const dx = (this.x - this.animX) * moveBlend;
      const dy = (this.y - this.animY) * moveBlend;
      this.animX += dx;
      this.animY += dy;
      this.animRadius += (this.radius - this.animRadius) * sizeBlend;
      const velocityBlend = -Math.expm1(-dt / (snappy ? 40 : fluid ? 90 : 65));
      const vx = resumed ? 0 : dx / dt;
      const vy = resumed ? 0 : dy / dt;
      this._moVX = (this._moVX || 0) + (vx - (this._moVX || 0)) * velocityBlend;
      this._moVY = (this._moVY || 0) + (vy - (this._moVY || 0)) * velocityBlend;
      const speed = Math.hypot(this._moVX, this._moVY);
      const target = resumed ? 0 : Math.min(snappy ? 0.008 : fluid ? 0.02 : 0.035, speed * 2 / Math.max(20, this.animRadius));
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
        : void Notifications.alert("Crest", Language.current.notif.invalidSkinUrl);
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
          return void Notifications.alert("Crest", Language.current.notif.invalidSkinUrl);
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
        if (MoMap.palette() && Settings.moArenaEffects > 0) this.spaceFoodGlow();
      }
    }
    static ["spaceFoodGlow"]() {
      const limit=MoPerformance.foodLimit();if(!limit)return;
      const ctx = Renderer.ctx, view = Camera.viewBounds;
      const zoom = Camera.viewport;
      if (!(zoom > 0) || !Number.isFinite(zoom) || !view) return;
      if (!this.spaceFoodSprites) this.spaceFoodSprites = new Map();
      let drawn = 0;
      ctx.save();
      ctx.globalAlpha = 0.75 * Settings.moArenaEffects;
      try {
        for (const food of CellData.food) {
          const ox = food.cellType === 2 ? WorldData.position.x : 0;
          const oy = food.cellType === 2 ? WorldData.position.y : 0;
          const x = food.animX - ox, y = food.animY - oy;
          const radius = food.animRadius + Theme.foodSize;
          if (!(radius > 0) || !Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(radius) || radius * zoom < 1.5) continue;
          const extent = radius * 2.4;
          if (x + extent < view.left || x - extent > view.right || y + extent < view.top || y - extent > view.bottom) continue;
          const color = Settings.moArenaStyle === "space" ? (Settings.food === "rainbow" ? "#a6dfff" : Theme.foodColor) : MoMap.palette().food;
          let sprite = this.spaceFoodSprites.get(color);
          if (!sprite) {
            sprite = this.cacheSpaceFoodGlow(color);
            if (this.spaceFoodSprites.size >= 16) this.spaceFoodSprites.delete(this.spaceFoodSprites.keys().next().value);
            this.spaceFoodSprites.set(color, sprite);
          }
          ctx.drawImage(sprite, x - extent, y - extent, extent * 2, extent * 2);
          if (++drawn >= limit) break;
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
      if (MoMap.palette()) return this.spaceArena();
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
      const palette = MoMap.palette();
      if (!this.moTiles) this.moTiles = new Map();
      if (!this.moTiles.has(Settings.moArenaStyle)) this.moTiles.set(Settings.moArenaStyle,Settings.moArenaStyle === "space" ? this.cacheSpaceTile() : MoMap.tile(Settings.moArenaStyle));
      const tile = this.moTiles.get(Settings.moArenaStyle);
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
        ctx.fillStyle = palette.bg; ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
        ctx.globalAlpha = Settings.moArenaEffects;
        if(!MoPerformance.low()){
        if(Settings.moArenaStyle === 'space') {
        for (let iy = firstY; iy < lastY; iy++) {
          for (let ix = firstX; ix < lastX; ix++) {
            ctx.drawImage(tile, left + ix * tileEdge, top + iy * tileEdge, tileEdge, tileEdge);
          }
        }
        } else {
          // Fixed world size: zoom changes the camera, never the scenery coordinates.
          this.moPatterns=this.moPatterns||new Map();
          if(!this.moPatterns.has(Settings.moArenaStyle))this.moPatterns.set(Settings.moArenaStyle,ctx.createPattern(tile,'repeat'));
          ctx.save();try{ctx.translate(left,top);ctx.scale(2.5,2.5);ctx.fillStyle=this.moPatterns.get(Settings.moArenaStyle);ctx.fillRect((x0-left)/2.5,(y0-top)/2.5,(x1-x0)/2.5,(y1-y0)/2.5)}finally{ctx.restore()}
        }
        }
        MoMap.atmosphere(ctx,x0,y0,x1,y1,zoom);
        ctx.globalAlpha = 1;
        // Quiet sector guides retain orientation without giant background art.
        ctx.strokeStyle = palette.grid;
        ctx.lineWidth = 1 / zoom;
        ctx.beginPath();
        for (let i = 1; i < 5; i++) {
          const x = left + edge * i / 5, y = top + edge * i / 5;
          ctx.moveTo(x, top); ctx.lineTo(x, top + edge);
          ctx.moveTo(left, y); ctx.lineTo(left + edge, y);
        }
        ctx.stroke();
        ctx.fillStyle = palette.text;
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
          Notifications.alert("Crest", Language.current.notif.target_unnamed);
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
            console.log("[Crest] shield session error (tab " + slot + ")", e);
            return;
          }
          MoDiagnostics.note("Player " + slot, "Shield session created");
          entry.session = session;
          let hello = null;
          try {
            hello = session.hello();
          } catch (e) {
            MoDiagnostics.note("Player " + slot, "Shield hello failed");
            console.log("[Crest] shield hello error (tab " + slot + ")", e);
            return;
          }
          const socket = 1 === slot ? this.ws : 2 === slot ? this.ws2 : this.ws3;
          if (socket && socket.readyState === socket.OPEN) {
            socket.send(hello);
            MoDiagnostics.note("Player " + slot, "Shield hello sent");
            console.log("[Crest] shield hello sent (tab " + slot + ") len=" + hello.length);
          }
        })
        .catch((e) => console.log("[Crest] shield hello failed (tab " + slot + ")", e));
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
          console.log("[Crest] shield onHelloAck error (tab " + slot + ")", e);
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
        console.log("[Crest] shield established (tab " + slot + ")");
        return true;
      }
      if (210 === first) {
        // Sealed game frame.
        let inner;
        try {
          inner = entry.session.open(raw);
        } catch (e) {
          console.log("[Crest] shield open error (tab " + slot + ")", e);
          return true;
        }
        if (inner && inner.length > 1 && 212 === inner[0]) {
          // Attestation challenge: answer with a clean (0) bitmask.
          try {
            const sh = window.__SHIELD__;
            const attest = sh.shield_attest(() => 0, inner.subarray(1));
            this.send(attest, slot);
            console.log("[Crest] shield attestation answered (tab " + slot + ")");
          } catch (e) {
            console.log("[Crest] shield attest error (tab " + slot + ")", e);
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
        if (slot === 1) Notifications.warn("Crest", "Verifying Player 1 connection, please wait..");
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
                Notifications.warn("Crest", "Verification complete for Player " + slot);
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
        return Notifications.warn("Crest", "Server IP is invalid");
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
            Notifications.warn("Crest", "3rb.io now blocks two guest tabs from the same IP. Log in with an account to enable Tab 2.");
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
        Notifications.warn("Crest", "Tab 2 keeps getting kicked as guest - log in with a second account to keep Tab 2 alive.");
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
          console.log("[Crest] shield seal error (tab " + yj + ")", e);
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
      if (3 !== nq) Notifications.alert("Crest", "Tab " + nq + " connected");
    }
    static ["onMessage"](alh, adu) {
      this.packetCount["in"]++;
      if ("string" === typeof alh.data) {
        try {
          const o = JSON.parse(alh.data);
          if (o && "ban_ui" === o.type) {
            console.log("[Crest] ban_ui received");
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
        Notifications.warn("Crest", "Tab " + numericTab + " was replaced by another connection from this IP (new 3rb.io rule)");
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
      Notifications.alert("Crest", "Tab " + numericTab + " disconnected");
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
      const tab = Number(Player.typeID || 1);
      if (tab !== 1 && tab !== 2) return false;
      const socket = tab === 1 ? this.ws : this.ws2;
      const alive = () => tab === 1 ? Player._isAlive : Player._isAlive2;
      const current = () => socket === (tab === 1 ? this.ws : this.ws2) && socket && socket.readyState === socket.OPEN && PacketSender.chekConnection(tab);
      if (!alive() || !current()) {
        Notifications.warn("MO", "Player " + tab + " must be alive and connected to kill and respawn.");
        return false;
      }
      if (this.recycleLocks.has(tab)) return false;
      this.recycleLocks.add(tab);
      const locks = this.recycleLocks;
      this._recycleJobs = this._recycleJobs || new Map();
      const jobs = this._recycleJobs, job = {};
      jobs.set(tab, job);
      let spawned = false, interval;
      const started = Date.now();
      const finish = () => { clearInterval(interval); if (jobs.get(tab) === job) { locks.delete(tab); jobs.delete(tab); } };
      const check = () => {
        if (!current()) { finish(); return; }
        if (!spawned && !alive()) {
          // Wait for the server's cell removal. Do not fake a local death.
          spawned = true;
          PacketSender.spawnTab(tab);
          if (MainMenu.isOpened) MainMenu.close();
          MoDiagnostics.note("Player " + tab, "Kill confirmed; respawn requested");
        } else if (spawned && alive()) {
          MoDiagnostics.note("Player " + tab, "Respawn confirmed");
          finish();
        }
        if (Date.now() - started >= 8000) {
          Notifications.warn("MO", spawned ? "Respawn was not confirmed. Use Play to retry." : "The server did not accept the kill request for this player.");
          finish();
        }
      };
      PacketSender.killRequest(tab);
      // The game's /kill command requires a second submission to confirm.
      setTimeout(() => { if (current() && !spawned && alive() && jobs.get(tab) === job) PacketSender.killRequest(tab); }, 300);
      interval = setInterval(check, 50);
      MoDiagnostics.note("Player " + tab, "Kill and respawn requested with K");
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
        hud.title = "Crest Multibox - Tab 1 and Tab 2 connection status.";
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
        if (MainMenu.isOpened) return;
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
          Notifications.alert("Crest", "Spammer Catched -> " + gf);
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
      console.log("Crest Login packet (tab " + ahn + "): " + (str ? "account, " + (3 + str.length * 2) + " bytes" : "guest"));
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
        Notifications.warn("Crest", "Captcha failed for Tab " + oq + " - retrying the connection.");
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
    static killRequest(tab) {
      if ((tab !== 1 && tab !== 2) || !this.chekConnection(tab)) return false;
      // Same chat command encoding as the game: opcode 86, target -1,
      // UTF-8 text and NUL. Keep the explicit slot, including guest Player 2.
      const command = new TextEncoder().encode("/kill");
      const packet = this.createView(6 + command.length);
      packet.setUint8(0, 86);
      packet.setInt32(1, -1, true);
      new Uint8Array(packet.buffer).set(command, 5);
      this.sendPacket(packet, tab);
      return true;
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
          MoSharedCosmetics.read(afb, aey[3]);
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
        MoSharedCosmetics.read(ami, aek[3]);
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
        const parts = [Player.skin || '', Player.skin2 || '', /^#[0-9a-fA-F]{6}$/.test(Player.colorHex2 || '') ? Player.colorHex2.slice(1) : '', MoSharedCosmetics.payload()];
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
    static library(){if(!this.faces)this.faces=[{"id":"grin","label":"Golden grin","src":"data:image/jpeg;base64,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Zm+Ho5emmUwyp1MSUkhqc2fUbwM06QfR1IJ+yf70qanmVNTzEb+aAsvRMuCKqqq7+u4FXA1mGdpaYB6YM3wiRH0ymDV7/Ef8Kx0s3imRW2T+mFjtDOg9GqEW0wADqYMs9bTB+XYKuhixbUN4Qq/pndBD3aphzQu27azBl1L9X/EwmqIYMp46h6GsIUEfFiPU4DecMJdVeyHeMfwycLqZmN7Jlo3xTIZoYHqviwEp0HtCAOXYvXSFCNQBgf8AHwJ6Qw6iVw9GToZiJgxnB6nSfKLGE+CpMrujE3epFg7sFssVGyeeFJTghcO8byT6YgrdomYu7GfBVnwKwji44+tYTvNxZX0TNw7kMA2S3Q/5TBBcJX1vWPZg8VcKQHHDtEVBT8KrqzceZVq+fxUdBWAY49oyZ2CsZwY1PllmuAU/5tBlcjgO87W8t7Zy/ZZM1/ZiGCn/ABbarAL67RVKxcACVle+/qUJ9Vy9/wDomuD0MVxdowHaImCXCMhlVTb/AIOVUN4TUhVaWCU/bV1+pg714i/6tE6fmO8bGv8A5vKC3amHmXgmr8y5flrNGr8S0JhY+w8y1/d1m/3IYvf/ALKIBHJlVV1cPtaVZ05Crm9CXATNEgbUZdF+HZFE3oTNFlgJSEkoboY/wlAXun2tAFABof8AeppaCSqVOoxndv7iWMnWpHqMbxFrhi2VInJRyhOj54DfT/Im48TceJ/kTfcB0fMHmIHNQLKsCsCM0f3mWcGtCYRd2+5lBihQQA0P/hQaATRmaTUo+J9kX5h/XL5BUmUuhl97BWW090TuHfP9pP8AWQeyd8v57pbe4Ul9HQz5ZVme+k/pi/EsUdWr5gCgA2/4v//aAAwDAQACAAMAAAAQ88888888888888889wcJhy8vCnNQwz888888888888888888888888888885nbd9e99999999+frQw98888888888888888888888884y++l9999999999999v8A7CtPPPPPPPPPPPPPPPPPPPPPPPHjP/2Nffffffffff8A1ywz/ZwDvzzzzzzzzzzzzzzzzzzhU3/znQwTnbvzzrWzo7/33332124jTzzzzzzzzzzzzzzzk17/AOfjfe98+/dPd+9999999999tbtL988888888888889X9/7f9999999999999/357199999//sh98888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"},{"id":"shock","label":"Shocked","src":"data:image/jpeg;base64,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"},{"id":"rage","label":"Red rage","src":"data:image/jpeg;base64,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"},{"id":"cool","label":"Deal with it","src":"data:image/jpeg;base64,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"}];return this.faces}
    static init(){if(this.root)return;this.choices=this.library();this.labels=this.choices.map(x=>x.label);this.states=new Map();this.sprites=new Map();this.images=new Map();this.ready=false;
      this.root=document.createElement('div');this.root.id='mo-emotes';this.root.hidden=true;
      this.toggle=document.createElement('button');this.toggle.type='button';this.toggle.className='mo-emote-toggle';this.toggle.textContent='☺ Emotes';this.toggle.disabled=true;this.toggle.title='Loading new emote faces';this.toggle.setAttribute('aria-expanded','false');this.toggle.setAttribute('aria-controls','mo-emote-picker');
      this.panel=document.createElement('div');this.panel.id='mo-emote-picker';this.panel.hidden=true;this.panel.setAttribute('role','group');this.panel.setAttribute('aria-label','Choose an emote');
      this.buttons=this.choices.map((face,index)=>{const button=document.createElement('button');button.type='button';button.className='mo-emote-choice';button.setAttribute('aria-label',face.label);button.title=face.label;button.addEventListener('click',()=>{if(this.choose(index))this.setOpen(false)});this.panel.appendChild(button);return button});
      this.hint=document.createElement('small');this.hint.textContent='Tag / party sharing · lasts 4 seconds';this.panel.appendChild(this.hint);this.root.append(this.panel,this.toggle);document.body.appendChild(this.root);
      this.toggle.addEventListener('click',()=>this.setOpen(this.panel.hidden));this.root.addEventListener('pointerdown',e=>e.stopPropagation());this.root.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape'){e.preventDefault();this.setOpen(false)}});document.addEventListener('pointerdown',e=>{if(!this.root.contains(e.target))this.setOpen(false)});
      this.choices.forEach((face,index)=>{const img=new Image();img.onload=()=>{this.images.set(index,img);const sprite=this.cache(index);this.sprites.set(index,sprite);const preview=document.createElement('canvas');preview.width=preview.height=80;preview.setAttribute('aria-hidden','true');preview.getContext('2d').drawImage(sprite,0,0,80,80);this.buttons[index].appendChild(preview);this.ready=true;this.refreshLoadout()};img.onerror=()=>{this.buttons[index].disabled=true;this.buttons[index].title='Face failed to load'};img.src=face.src});this.refreshLoadout();
    }
    static refreshLoadout(){if(!this.root)return;const saved=Storage.get('cosmetics','emoteLoadout');this.equipped=Array.isArray(saved)?new Set(saved):new Set(this.choices.map(x=>x.id));this.buttons.forEach((b,i)=>{b.hidden=!this.equipped.has(this.choices[i].id);b.disabled=!this.images.has(i)});const available=this.choices.some((x,i)=>this.equipped.has(x.id)&&this.images.has(i));this.toggle.disabled=!available;this.toggle.title=available?'Cover your skin with an emote':'Equip a face in Customize → Emotes';this.hint.textContent=available?'Tag / party sharing · lasts 4 seconds':'Choose your faces in Customize';}

    static setOpen(open) {
      if (!this.panel) return;
      this.panel.hidden = !open;
      this.toggle.setAttribute("aria-expanded", String(open));
      if (open) this.buttons.find(b=>!b.hidden&&!b.disabled)?.focus();
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
      if (!this.ready || !Number.isInteger(index) || !this.choices[index] || !this.images.has(index) || !this.equipped.has(this.choices[index].id) || MainMenu.isOpened || !this.biggest(Player.typeID)) return false;
      this.states.set(Player.typeID, { index, started: performance.now(), until: performance.now() + 4000 });
      MoSharedCosmetics.publish();
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
    static cache(index){const sprite=document.createElement('canvas');sprite.width=sprite.height=512;const ctx=sprite.getContext('2d'),img=this.images.get(index);if(!img)return sprite;ctx.beginPath();ctx.arc(256,256,256,0,Math.PI*2);ctx.clip();ctx.fillStyle='#fff';ctx.fillRect(0,0,512,512);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';if(this.choices[index].id==='rage'){ctx.drawImage(img,img.naturalWidth*.07,img.naturalHeight*.07,img.naturalWidth*.86,img.naturalHeight*.86,0,0,512,512)}else{const scale=512/Math.max(img.naturalWidth,img.naturalHeight),w=img.naturalWidth*scale,h=img.naturalHeight*scale;ctx.drawImage(img,(512-w)/2,(512-h)/2,w,h)}return sprite}
    static draw(cell, origin, opacity) {
      const state = MoSharedCosmetics.emote(cell), zoom = Camera.viewport;
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
        ctx.globalAlpha = 1;
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
      if(!MoPerformance.shouldRender())return;
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
        sy.strokeStyle = MoMap.palette()?.border || Theme.borderColor;
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
        const moCover = gu === 1 && !!MoSharedCosmetics.emote(aeq);
        
        amh.beginPath();
        amh.arc(aeq.animX - w.x, aeq.animY - w.y, aeq.animRadius + 5, 0, this.pi2, true);
        amh.closePath();
        if (aeq.isVirus) {
          MoVirusGlow.draw(aeq,w,gu);
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
        if (!aeq.isVirus && !dk && !akw && ["cinematic", "fluid", "snappy"].includes(Settings.moMotionStyle)) {
          this.drawMoCellLight(aeq, w, afc * gu);
        }
        if (gu === 1) { MoInventory.drawSkin(aeq, w, afc); MoInventory.drawInactive(aeq, w, afc, dk || akw); }
        if (moCover) MoEmotes.draw(aeq, w, afc);
        if (!moCover && aeq.isMine && nl && aeq.cellType === Player.typeID && Settings.moMotionStyle !== "classic" && MoInventory.config(aeq.cellType).mode !== "still" && !MoInventory.ring(aeq.cellType)) {
          this.drawMoActiveGlow(aeq, w, afc * gu, ph);
        }
        if (!moCover && aeq.isMine && nl) {
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
        if (!moCover) MoInventory.draw(aeq, w, afc * gu);
        if (moDeformed) amh.restore();
        if (!moCover && gu === 1 && ((aeq.isMine && !ajs) || (!aeq.isMine && acv))) {
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
        if (!moCover && gu === 1 && ((aeq.isMine && !afz) || (!aeq.isMine && ait))) {
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
      const shared = MoSharedCosmetics.visual(cell);
      if (shared && !["mouse","both"].includes(shared.c.mode)) return false;
      if (cell.isMine && !MoInventory.mouse(cell.cellType)) return false;
      if (!["cinematic", "fluid", "snappy"].includes(Settings.moMotionStyle) || this.moReducedMotion || cell.isVirus || cell.isFood || cell.isEjected) return false;
      const stretch = Math.min(Settings.moMotionStyle === "snappy" ? 0.008 : Settings.moMotionStyle === "fluid" ? 0.02 : 0.035, Math.max(0, cell._moStretch || 0));
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
      if(!MoPerformance.full())return;
      const r = cell.animRadius + 5;
      if (!(r > 0) || !Number.isFinite(r) || r * Camera.viewport < 16 || !(opacity > 0)) return;
      this.ctx.save();
      this.ctx.globalAlpha = Math.min(1, opacity) * 0.32;
      this.ctx.drawImage(this.moCellLight, cell.animX - origin.x - r, cell.animY - origin.y - r, r * 2, r * 2);
      this.ctx.restore();
    }
    static ["drawMoActiveGlow"](cell, origin, opacity, color) {
      if(MoPerformance.low())return;
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
        MoSharedCosmetics.tick();
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
  let crestStarting=false,crestInitialized=false;
  const crestStart=async()=>{if(crestStarting||crestInitialized)return;crestStarting=true;const retry=document.getElementById('crest-start-retry');if(retry)retry.hidden=true;try{
    window.__crestStatus?.('Preparing your client…',1);
    await Server.prepare();
    if(GameLoop.browserVersion()<49)throw Error("Please use a current Chrome or Chromium browser");
    const initialize=()=> (
    window.__crestStatus?.("Entering your arena…",2),
    49 > GameLoop.browserVersion()
      ? ($("#ls-icon").html('<i class="fa fa-chrome" aria-hidden="true"></i>'),
        void $("#ls-message").text(" Only Chrome version 49 or higher are supported."))
      : (Language.init(),
        (crestInitialized=true,GameLoop.init()),
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
    initialize();window.__crestComplete?.();
  }catch(error){window.__crestLaunch.error=String(error.message||error);window.__crestStatus?.(crestInitialized?'The client could not finish starting. '+window.__crestLaunch.error:'Could not prepare your arena: '+window.__crestLaunch.error,2);if(retry){retry.hidden=false;retry.onclick=()=>crestInitialized?location.reload():crestStart()}}finally{crestStarting=false}};
  crestStart();
});
