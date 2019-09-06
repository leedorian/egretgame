window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml","Btn.Wechat":"resource/skins/Button/WechatBtn.exml","TaskUI":"resource/skins/TaskUI.exml","Usertop":"resource/skins/Usertop.exml","Indexcon":"resource/skins/Indexcon.exml","Rank":"resource/skins/Rank.exml","Ranklistitem":"resource/skins/Ranklistitem.exml","Message":"resource/skins/Message.exml","Msgitem":"resource/skins/Msgitem.exml","Friend":"resource/skins/Friend.exml","Frienditem":"resource/skins/Frienditem.exml","SearchFriend":"resource/skins/SearchFriend.exml","Login":"resource/skins/Login.exml","Setting":"resource/skins/Setting.exml","SearchFrienditem":"resource/skins/SearchFrienditem.exml","Shopskill":"resource/skins/Shopskill.exml"};generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","trackHighlight","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.trackHighlight_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.trackHighlight_i = function () {
		var t = new eui.Image();
		this.trackHighlight = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "tracklight_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/reviveSkin.exml'] = window.reviveSkin = (function (_super) {
	__extends(reviveSkin, _super);
	function reviveSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Label1_i(),this._Label2_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this._Image9_i()];
	}
	var _proto = reviveSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "task-bg_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 735;
		t.source = "pop_revivecon_png";
		t.width = 475;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 84;
		t.source = "pop_reviveimg_png";
		t.width = 65;
		t.x = 240;
		t.y = 543;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 20;
		t.source = "pop_unreadbg_png";
		t.width = 20;
		t.x = 278;
		t.y = 600;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 18;
		t.anchorOffsetY = 1;
		t.bold = true;
		t.size = 10;
		t.text = "10";
		t.x = 298;
		t.y = 606;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.text = "Label";
		t.textColor = 0x603a16;
		t.x = 148;
		t.y = 433;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36;
		t.source = "pop_reviveclose_png";
		t.width = 35;
		t.x = 402;
		t.y = 157;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 37;
		t.source = "task_star_png";
		t.width = 20;
		t.x = 34;
		t.y = 69;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32;
		t.source = "task_star_png";
		t.width = 17;
		t.x = 363;
		t.y = 69;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 47;
		t.source = "task_star_png";
		t.width = 18;
		t.x = 417;
		t.y = 32;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 55;
		t.source = "task_star_png";
		t.width = 22;
		t.x = 397;
		t.y = 641;
		return t;
	};
	return reviveSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/taskUISkin.exml'] = window.aboutUISkin = (function (_super) {
	__extends(aboutUISkin, _super);
	var aboutUISkin$Skin1 = 	(function (_super) {
		__extends(aboutUISkin$Skin1, _super);
		function aboutUISkin$Skin1() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","percentWidth",100),
						new eui.SetProperty("_Image1","percentHeight",100),
						new eui.SetProperty("_Image1","source","task_close_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","task_close_png")
					])
			];
		}
		var _proto = aboutUISkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 90;
			t.horizontalCenter = -1.5;
			t.source = "task_close_png";
			t.verticalCenter = -1.5;
			t.percentWidth = 90;
			return t;
		};
		return aboutUISkin$Skin1;
	})(eui.Skin);

	var aboutUISkin$Skin2 = 	(function (_super) {
		__extends(aboutUISkin$Skin2, _super);
		function aboutUISkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","btn_receive_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","btn_receive_png")
					])
			];
		}
		var _proto = aboutUISkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "btn_receive_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return aboutUISkin$Skin2;
	})(eui.Skin);

	var aboutUISkin$Skin3 = 	(function (_super) {
		__extends(aboutUISkin$Skin3, _super);
		function aboutUISkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","task_close_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","task_close_png")
					])
			];
		}
		var _proto = aboutUISkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "task_close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return aboutUISkin$Skin3;
	})(eui.Skin);

	function aboutUISkin() {
		_super.call(this);
		this.skinParts = ["task_name","task_date","btnClose_bak","task_pic","task_percent","task_desc","task_reward","receive_btn","btnClose"];
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this._Image1_i(),this.task_name_i(),this.task_date_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.btnClose_bak_i(),this.task_pic_i(),this._Image6_i(),this.task_percent_i(),this._Image7_i(),this.task_desc_i(),this._Label1_i(),this._Image8_i(),this._Image9_i(),this._Image10_i(),this.task_reward_i(),this.receive_btn_i(),this.btnClose_i(),this._Image11_i(),this._Label2_i()];
	}
	var _proto = aboutUISkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "task-bg_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.task_name_i = function () {
		var t = new eui.Label();
		this.task_name = t;
		t.fontFamily = "SimHei";
		t.text = "每日任务";
		t.x = 180;
		t.y = 36;
		return t;
	};
	_proto.task_date_i = function () {
		var t = new eui.Label();
		this.task_date = t;
		t.fontFamily = "DFKai-SB";
		t.size = 20;
		t.text = "2.1~2.10";
		t.textColor = 0xfff4af;
		t.x = 200.5;
		t.y = 80;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 591;
		t.source = "task_tmp1_png";
		t.width = 438;
		t.x = 21;
		t.y = 114;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 81;
		t.source = "task_star_png";
		t.width = 31;
		t.x = 415.5;
		t.y = 10.5;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 53;
		t.source = "task_star_png";
		t.width = 25;
		t.x = 8.5;
		t.y = 80;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 53;
		t.source = "task_star_png";
		t.width = 25;
		t.x = 363.5;
		t.y = 47;
		return t;
	};
	_proto.btnClose_bak_i = function () {
		var t = new eui.Button();
		this.btnClose_bak = t;
		t.horizontalCenter = 206.5;
		t.verticalCenter = -284;
		t.visible = false;
		t.skinName = aboutUISkin$Skin1;
		return t;
	};
	_proto.task_pic_i = function () {
		var t = new eui.Image();
		this.task_pic = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 244;
		t.source = "task_pic_png";
		t.width = 348;
		t.x = 62;
		t.y = 185;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 159;
		t.source = "task_sbg_png";
		t.width = 342;
		t.x = 73.5;
		t.y = 475;
		return t;
	};
	_proto.task_percent_i = function () {
		var t = new eui.Image();
		this.task_percent = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.source = "task_noticebg_png";
		t.width = 287;
		t.x = 101.5;
		t.y = 570.5;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 42;
		t.source = "task_star_png";
		t.width = 20;
		t.x = 378.5;
		t.y = 570.5;
		return t;
	};
	_proto.task_desc_i = function () {
		var t = new eui.Label();
		this.task_desc = t;
		t.anchorOffsetX = 0;
		t.size = 20;
		t.text = "删除90个黑块";
		t.textAlign = "center";
		t.width = 289;
		t.x = 95.5;
		t.y = 509;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 25;
		t.text = "REWARD";
		t.textColor = 0x56331d;
		t.x = 39.5;
		t.y = 654;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 31;
		t.source = "task_reward_bg_png";
		t.width = 125;
		t.x = 173.5;
		t.y = 654;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.source = "task_pointpic_png";
		t.width = 40;
		t.x = 160.5;
		t.y = 646.5;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.height = 20;
		t.source = "task_finish_png";
		t.width = 20;
		t.x = 180;
		t.y = 674;
		return t;
	};
	_proto.task_reward_i = function () {
		var t = new eui.Label();
		this.task_reward = t;
		t.size = 20;
		t.text = "299";
		t.x = 227.5;
		t.y = 659.5;
		return t;
	};
	_proto.receive_btn_i = function () {
		var t = new eui.Button();
		this.receive_btn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 39;
		t.label = "";
		t.width = 118;
		t.x = 317;
		t.y = 647.5;
		t.skinName = aboutUISkin$Skin2;
		return t;
	};
	_proto.btnClose_i = function () {
		var t = new eui.Button();
		this.btnClose = t;
		t.label = "";
		t.x = 423.5;
		t.y = 91.5;
		t.skinName = aboutUISkin$Skin3;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 52;
		t.source = "task_ppp_png";
		t.width = 58;
		t.x = 33.5;
		t.y = 724;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.size = 20;
		t.text = "Daily missions end at midnight and Moday";
		t.textAlign = "center";
		t.textColor = 0xfff4af;
		t.width = 238;
		t.x = 151;
		t.y = 728;
		return t;
	};
	return aboutUISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/urgeSkin.exml'] = window.reviveSkin = (function (_super) {
	__extends(reviveSkin, _super);
	function reviveSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Label1_i(),this._Label2_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this._Image9_i()];
	}
	var _proto = reviveSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "task-bg_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 735;
		t.source = "urgebg_png";
		t.width = 475;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 84;
		t.source = "urgeimg_png";
		t.width = 65;
		t.x = 240;
		t.y = 536;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 20;
		t.source = "pop_unreadbg_png";
		t.width = 20;
		t.x = 278;
		t.y = 600;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 18;
		t.anchorOffsetY = 1;
		t.bold = true;
		t.size = 10;
		t.text = "10";
		t.x = 298;
		t.y = 606;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.text = "Label";
		t.textColor = 0x603a16;
		t.x = 148;
		t.y = 433;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36;
		t.source = "pop_reviveclose_png";
		t.width = 35;
		t.x = 402;
		t.y = 157;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 37;
		t.source = "task_star_png";
		t.width = 20;
		t.x = 34;
		t.y = 69;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32;
		t.source = "task_star_png";
		t.width = 17;
		t.x = 363;
		t.y = 69;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 47;
		t.source = "task_star_png";
		t.width = 18;
		t.x = 417;
		t.y = 32;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 55;
		t.source = "task_star_png";
		t.width = 22;
		t.x = 397;
		t.y = 641;
		return t;
	};
	return reviveSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Button/GoogleBtn.exml'] = window.GoogleBtn = (function (_super) {
	__extends(GoogleBtn, _super);
	function GoogleBtn() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 126;
		this.width = 126;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = GoogleBtn.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "GoogleBtn_png";
		t.top = 0;
		return t;
	};
	return GoogleBtn;
})(eui.Skin);generateEUI.paths['resource/skins/Button/WechatBtn.exml'] = window.WechatBtn = (function (_super) {
	__extends(WechatBtn, _super);
	function WechatBtn() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 126;
		this.width = 126;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = WechatBtn.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "WechatBtn_png";
		t.top = 0;
		return t;
	};
	return WechatBtn;
})(eui.Skin);generateEUI.paths['resource/skins/Friend.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["datalist","datascroll","back","friendSearch","friendAdd","reqlabel","searchkey"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.datascroll_i(),this.back_i(),this._Label1_i(),this._Image4_i(),this.friendSearch_i(),this.friendAdd_i(),this.reqlabel_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this.searchkey_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.fillMode = "repeat";
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 278;
		t.source = "friendtop_png";
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 260;
		t.source = "friend_3_png";
		t.width = 1080;
		t.x = 0;
		t.y = 298;
		return t;
	};
	_proto.datascroll_i = function () {
		var t = new eui.Scroller();
		this.datascroll = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1304;
		t.width = 1080;
		t.x = 0;
		t.y = 600;
		t.viewport = this.datalist_i();
		return t;
	};
	_proto.datalist_i = function () {
		var t = new eui.List();
		this.datalist = t;
		t.height = 1324;
		return t;
	};
	_proto.back_i = function () {
		var t = new eui.Image();
		this.back = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 96;
		t.source = "rank_back_png";
		t.width = 90.24;
		t.x = 44.85;
		t.y = 26.33;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 50;
		t.text = "朋友";
		t.x = 489;
		t.y = 49.33;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.source = "indexblcok_png";
		t.width = 88;
		t.x = 612;
		t.y = 34.33;
		return t;
	};
	_proto.friendSearch_i = function () {
		var t = new eui.Image();
		this.friendSearch = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.source = "friend_search_png";
		t.width = 102;
		t.x = 928;
		t.y = 167;
		return t;
	};
	_proto.friendAdd_i = function () {
		var t = new eui.Image();
		this.friendAdd = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.source = "friend_add_png";
		t.width = 102;
		t.x = 928;
		t.y = 428;
		return t;
	};
	_proto.reqlabel_i = function () {
		var t = new eui.Label();
		this.reqlabel = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.size = 50;
		t.text = "3个好友请求";
		t.textAlign = "center";
		t.width = 321;
		t.x = 70;
		t.y = 326;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 90;
		t.source = "indexadd_png";
		t.visible = false;
		t.width = 90;
		t.x = 58;
		t.y = 428;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.source = "indexadd_png";
		t.visible = false;
		t.width = 90;
		t.x = 185.5;
		t.y = 428;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.source = "indexadd_png";
		t.visible = false;
		t.width = 90;
		t.x = 436;
		t.y = 428;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.source = "indexadd_png";
		t.visible = false;
		t.width = 90;
		t.x = 301;
		t.y = 428;
		return t;
	};
	_proto.searchkey_i = function () {
		var t = new eui.EditableText();
		this.searchkey = t;
		t.anchorOffsetX = 0;
		t.height = 100;
		t.size = 50;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 828;
		t.x = 70;
		t.y = 154;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Friendadd.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["datalist","datascroll","back","friendSearch","friendAdd"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.datascroll_i(),this.back_i(),this._Label1_i(),this.friendSearch_i(),this.friendAdd_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.fillMode = "repeat";
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 278;
		t.source = "friendtop_png";
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.datascroll_i = function () {
		var t = new eui.Scroller();
		this.datascroll = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1591;
		t.width = 1080;
		t.x = 0;
		t.y = 313;
		t.viewport = this.datalist_i();
		return t;
	};
	_proto.datalist_i = function () {
		var t = new eui.List();
		this.datalist = t;
		t.height = 1324;
		return t;
	};
	_proto.back_i = function () {
		var t = new eui.Image();
		this.back = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 96;
		t.source = "rank_back_png";
		t.width = 90.24;
		t.x = 44.85;
		t.y = 26.33;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 50;
		t.text = "新朋友";
		t.x = 463.5;
		t.y = 49;
		return t;
	};
	_proto.friendSearch_i = function () {
		var t = new eui.Image();
		this.friendSearch = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.source = "friend_search_png";
		t.width = 102;
		t.x = 928;
		t.y = 167;
		return t;
	};
	_proto.friendAdd_i = function () {
		var t = new eui.Image();
		this.friendAdd = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.source = "friend_add_png";
		t.width = 102;
		t.x = 928;
		t.y = 428;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 90;
		t.source = "indexadd_png";
		t.visible = false;
		t.width = 90;
		t.x = 58;
		t.y = 428;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.source = "indexadd_png";
		t.visible = false;
		t.width = 90;
		t.x = 185.5;
		t.y = 428;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.source = "indexadd_png";
		t.visible = false;
		t.width = 90;
		t.x = 436;
		t.y = 428;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.source = "indexadd_png";
		t.visible = false;
		t.width = 90;
		t.x = 301;
		t.y = 428;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Friendadditem.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	var LoginSkin$Skin4 = 	(function (_super) {
		__extends(LoginSkin$Skin4, _super);
		function LoginSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","friendaddbtn_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","friendaddbtn_png")
					])
			];
		}
		var _proto = LoginSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "friendaddbtn_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginSkin$Skin4;
	})(eui.Skin);

	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["avater","nickname","sendactionpointBtn","addbtn"];
		
		this.height = 215;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.avater_i(),this.nickname_i(),this.sendactionpointBtn_i(),this.addbtn_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.fillMode = "repeat";
		t.height = 399;
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 207.45;
		t.source = "friend_2_png";
		t.width = 1080;
		t.x = 0;
		t.y = 1.52;
		return t;
	};
	_proto.avater_i = function () {
		var t = new eui.Image();
		this.avater = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 90;
		t.source = "indexadd_png";
		t.width = 90;
		t.x = 49;
		t.y = 18.49;
		return t;
	};
	_proto.nickname_i = function () {
		var t = new eui.Label();
		this.nickname = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.size = 50;
		t.text = "Dorian";
		t.textAlign = "left";
		t.textColor = 0x845816;
		t.width = 186.64;
		t.x = 190.03;
		t.y = 38.49;
		return t;
	};
	_proto.sendactionpointBtn_i = function () {
		var t = new eui.Image();
		this.sendactionpointBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74.55;
		t.source = "actionpoint_send_on_png";
		t.width = 83.64;
		t.x = 951.18;
		t.y = 66.59;
		return t;
	};
	_proto.addbtn_i = function () {
		var t = new eui.Button();
		this.addbtn = t;
		t.enabled = true;
		t.label = "添加";
		t.x = 762;
		t.y = 80;
		t.skinName = LoginSkin$Skin4;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Frienditem.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["avater","rank","nickname","score","sendactionpointBtn"];
		
		this.height = 215;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.avater_i(),this._Image3_i(),this.rank_i(),this.nickname_i(),this.score_i(),this._Image4_i(),this.sendactionpointBtn_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.fillMode = "repeat";
		t.height = 399;
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 207.45;
		t.source = "friend_yellow_png";
		t.width = 1080;
		t.x = 0;
		t.y = 1.52;
		return t;
	};
	_proto.avater_i = function () {
		var t = new eui.Image();
		this.avater = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 107.88;
		t.source = "indexadd_png";
		t.width = 138.18;
		t.x = 90;
		t.y = 41.97;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 104.85;
		t.source = "rank_pic_png";
		t.width = 116.97;
		t.x = 18;
		t.y = 45;
		return t;
	};
	_proto.rank_i = function () {
		var t = new eui.Label();
		this.rank = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40.91;
		t.size = 50;
		t.text = "9";
		t.textAlign = "center";
		t.width = 100.73;
		t.x = 26.12;
		t.y = 66.59;
		return t;
	};
	_proto.nickname_i = function () {
		var t = new eui.Label();
		this.nickname = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.size = 50;
		t.text = "Dorian";
		t.textAlign = "left";
		t.textColor = 0x845816;
		t.width = 186.64;
		t.x = 264.03;
		t.y = 72.43;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.Label();
		this.score = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.size = 50;
		t.text = "120000";
		t.textAlign = "left";
		t.textColor = 0x845816;
		t.width = 186.64;
		t.x = 540;
		t.y = 72.43;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 120;
		t.source = "money_png";
		t.width = 135.15;
		t.x = 760.18;
		t.y = 37.43;
		return t;
	};
	_proto.sendactionpointBtn_i = function () {
		var t = new eui.Image();
		this.sendactionpointBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74.55;
		t.source = "actionpoint_send_on_png";
		t.width = 83.64;
		t.x = 951.18;
		t.y = 66.59;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Indexcon.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	var LoginSkin$Skin5 = 	(function (_super) {
		__extends(LoginSkin$Skin5, _super);
		function LoginSkin$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","play_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","play_png")
					])
			];
		}
		var _proto = LoginSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "play_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginSkin$Skin5;
	})(eui.Skin);

	var LoginSkin$Skin6 = 	(function (_super) {
		__extends(LoginSkin$Skin6, _super);
		function LoginSkin$Skin6() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","indexrank_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","indexrank_png")
					])
			];
		}
		var _proto = LoginSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "indexrank_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginSkin$Skin6;
	})(eui.Skin);

	var LoginSkin$Skin7 = 	(function (_super) {
		__extends(LoginSkin$Skin7, _super);
		function LoginSkin$Skin7() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","indexblcok_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","indexblcok_png")
					])
			];
		}
		var _proto = LoginSkin$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "indexblcok_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginSkin$Skin7;
	})(eui.Skin);

	var LoginSkin$Skin8 = 	(function (_super) {
		__extends(LoginSkin$Skin8, _super);
		function LoginSkin$Skin8() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","indexsetting_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","indexsetting_png")
					])
			];
		}
		var _proto = LoginSkin$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "indexsetting_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginSkin$Skin8;
	})(eui.Skin);

	var LoginSkin$Skin9 = 	(function (_super) {
		__extends(LoginSkin$Skin9, _super);
		function LoginSkin$Skin9() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","indexscore_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","indexscore_png")
					])
			];
		}
		var _proto = LoginSkin$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "indexscore_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginSkin$Skin9;
	})(eui.Skin);

	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["playgame","rankImg","faceImg","settingImg","scoreImg","faceIcon","scoreIcon"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.playgame_i(),this.rankImg_i(),this.faceImg_i(),this.settingImg_i(),this.scoreImg_i(),this.faceIcon_i(),this.scoreIcon_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.fillMode = "repeat";
		t.left = 2;
		t.right = -2;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 660;
		t.source = "Bg01_png";
		t.width = 1082.12;
		t.x = 0;
		t.y = 320;
		return t;
	};
	_proto.playgame_i = function () {
		var t = new eui.Button();
		this.playgame = t;
		t.height = 108;
		t.label = "";
		t.x = 182.5;
		t.y = 1130;
		t.skinName = LoginSkin$Skin5;
		return t;
	};
	_proto.rankImg_i = function () {
		var t = new eui.Button();
		this.rankImg = t;
		t.enabled = true;
		t.height = 130;
		t.label = "";
		t.width = 130;
		t.x = 183;
		t.y = 1460;
		t.skinName = LoginSkin$Skin6;
		return t;
	};
	_proto.faceImg_i = function () {
		var t = new eui.Button();
		this.faceImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 130;
		t.label = "";
		t.width = 130;
		t.x = 398.55;
		t.y = 1460;
		t.skinName = LoginSkin$Skin7;
		return t;
	};
	_proto.settingImg_i = function () {
		var t = new eui.Button();
		this.settingImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 130;
		t.label = "";
		t.width = 130;
		t.x = 600.98;
		t.y = 1460;
		t.skinName = LoginSkin$Skin8;
		return t;
	};
	_proto.scoreImg_i = function () {
		var t = new eui.Button();
		this.scoreImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 130;
		t.label = "";
		t.width = 130;
		t.x = 797.5;
		t.y = 1460;
		t.skinName = LoginSkin$Skin9;
		return t;
	};
	_proto.faceIcon_i = function () {
		var t = new eui.Image();
		this.faceIcon = t;
		t.height = 20;
		t.source = "unread_png";
		t.width = 20;
		t.x = 520;
		t.y = 1450;
		return t;
	};
	_proto.scoreIcon_i = function () {
		var t = new eui.Image();
		this.scoreIcon = t;
		t.height = 20;
		t.source = "unread_png";
		t.width = 20;
		t.x = 920;
		t.y = 1450;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Login.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["bgIMG","WechatLoginBtn","GoogleLoginBtn"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this.bgIMG_i(),this._Image2_i(),this.WechatLoginBtn_i(),this.GoogleLoginBtn_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.fillMode = "repeat";
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto.bgIMG_i = function () {
		var t = new eui.Image();
		this.bgIMG = t;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 660;
		t.left = 0;
		t.right = 0;
		t.source = "Bg01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 83;
		t.source = "conn_with_png";
		t.width = 623.7;
		t.x = 228.15;
		t.y = 982.4;
		return t;
	};
	_proto.WechatLoginBtn_i = function () {
		var t = new eui.Button();
		this.WechatLoginBtn = t;
		t.height = 130;
		t.label = "";
		t.skinName = "WechatBtn";
		t.touchEnabled = true;
		t.width = 130;
		t.x = 228.15;
		t.y = 1279.86;
		return t;
	};
	_proto.GoogleLoginBtn_i = function () {
		var t = new eui.Button();
		this.GoogleLoginBtn = t;
		t.height = 130;
		t.label = "";
		t.skinName = "GoogleBtn";
		t.width = 130;
		t.x = 410;
		t.y = 1279.86;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Message.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["msgBtn","rightLabel","back","datalist","dataScroll"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.msgBtn_i(),this.rightLabel_i(),this.back_i(),this._List1_i(),this.dataScroll_i(),this._Label1_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.fillMode = "repeat";
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 386;
		t.source = "msg_top_png";
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.msgBtn_i = function () {
		var t = new eui.Label();
		this.msgBtn = t;
		t.bold = true;
		t.size = 50;
		t.text = "信息";
		t.x = 490;
		t.y = 238;
		return t;
	};
	_proto.rightLabel_i = function () {
		var t = new eui.Label();
		this.rightLabel = t;
		t.bold = true;
		t.size = 50;
		t.text = "朋友";
		t.textColor = 0x603813;
		t.x = 846.5;
		t.y = 86;
		return t;
	};
	_proto.back_i = function () {
		var t = new eui.Image();
		this.back = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 78;
		t.source = "rank_back_png";
		t.width = 68;
		t.x = 20;
		t.y = 308;
		return t;
	};
	_proto._List1_i = function () {
		var t = new eui.List();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1512;
		t.visible = false;
		t.width = 1080;
		t.y = 406;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.dataScroll_i = function () {
		var t = new eui.Scroller();
		this.dataScroll = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1506;
		t.width = 1080;
		t.x = 0;
		t.y = 412;
		t.viewport = this.datalist_i();
		return t;
	};
	_proto.datalist_i = function () {
		var t = new eui.List();
		this.datalist = t;
		t.layout = this._VerticalLayout2_i();
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 55;
		t.text = "BOX";
		t.x = 482.5;
		t.y = 136;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Msgitem.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["typeImg","typeText","datetime","text"];
		
		this.height = 402;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.typeImg_i(),this.typeText_i(),this.datetime_i(),this.text_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.typeimg"],[0],this.typeImg,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.title"],[0],this.typeText,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.addtime"],[0],this.datetime,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.content"],[0],this.text,"text");
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.fillMode = "repeat";
		t.height = 399;
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 362;
		t.source = "msg_png";
		t.width = 1080;
		t.x = 0;
		t.y = 50;
		return t;
	};
	_proto.typeImg_i = function () {
		var t = new eui.Image();
		this.typeImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 70;
		t.width = 70;
		t.x = 26;
		t.y = 25;
		return t;
	};
	_proto.typeText_i = function () {
		var t = new eui.Label();
		this.typeText = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 42;
		t.textAlign = "center";
		t.textColor = 0x2b388f;
		t.verticalAlign = "middle";
		t.width = 216;
		t.x = 122;
		t.y = 105;
		return t;
	};
	_proto.datetime_i = function () {
		var t = new eui.Label();
		this.datetime = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.textAlign = "center";
		t.textColor = 0x603813;
		t.verticalAlign = "middle";
		t.width = 182;
		t.x = 838;
		t.y = 132;
		return t;
	};
	_proto.text_i = function () {
		var t = new eui.Label();
		this.text = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 198;
		t.textColor = 0x59595a;
		t.width = 922;
		t.x = 128;
		t.y = 188;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Rank.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["label_bottom","label_right","label_left","back","contentScroller"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.label_bottom_i(),this.label_right_i(),this.label_left_i(),this.back_i(),this.contentScroller_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.fillMode = "repeat";
		t.left = 3;
		t.right = -3;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 403.33;
		t.source = "rank_topbg_png";
		t.width = 1074.55;
		t.x = 2.73;
		t.y = 0;
		return t;
	};
	_proto.label_bottom_i = function () {
		var t = new eui.Label();
		this.label_bottom = t;
		t.bold = true;
		t.size = 40;
		t.text = "今日";
		t.x = 502;
		t.y = 256.07;
		return t;
	};
	_proto.label_right_i = function () {
		var t = new eui.Label();
		this.label_right = t;
		t.bold = true;
		t.size = 40;
		t.text = "本周";
		t.textColor = 0x603811;
		t.x = 863.03;
		t.y = 109.1;
		return t;
	};
	_proto.label_left_i = function () {
		var t = new eui.Label();
		this.label_left = t;
		t.bold = true;
		t.size = 40;
		t.text = "单局";
		t.textColor = 0x603811;
		t.x = 106.3;
		t.y = 109.1;
		return t;
	};
	_proto.back_i = function () {
		var t = new eui.Image();
		this.back = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 64;
		t.source = "rank_back_png";
		t.width = 72;
		t.x = 36;
		t.y = 340;
		return t;
	};
	_proto.contentScroller_i = function () {
		var t = new eui.Scroller();
		this.contentScroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1378;
		t.width = 1080;
		t.x = 2;
		t.y = 532;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Ranklistitem.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["bg","avater","nicktext","scoretext","rank_pic","rank_num"];
		
		this.height = 120;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this.bg_i(),this.avater_i(),this.nicktext_i(),this.scoretext_i(),this.rank_pic_i(),this.rank_num_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 1655;
		t.fillMode = "repeat";
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 114;
		t.source = "rank_blue_png";
		t.width = 1080;
		t.x = 0;
		t.y = 3.39;
		return t;
	};
	_proto.avater_i = function () {
		var t = new eui.Image();
		this.avater = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 83.21;
		t.source = "indexadd_png";
		t.width = 83.79;
		t.x = 18.5;
		t.y = 17.49;
		return t;
	};
	_proto.nicktext_i = function () {
		var t = new eui.Label();
		this.nicktext = t;
		t.size = 30;
		t.text = "nick";
		t.x = 209.63;
		t.y = 45.39;
		return t;
	};
	_proto.scoretext_i = function () {
		var t = new eui.Label();
		this.scoretext = t;
		t.size = 30;
		t.text = "123123123";
		t.x = 514.5;
		t.y = 45;
		return t;
	};
	_proto.rank_pic_i = function () {
		var t = new eui.Image();
		this.rank_pic = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 86.28;
		t.source = "rank_pic_png";
		t.width = 84.36;
		t.x = 879.45;
		t.y = 14.42;
		return t;
	};
	_proto.rank_num_i = function () {
		var t = new eui.Label();
		this.rank_num = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50.03;
		t.size = 40;
		t.text = "9999";
		t.textAlign = "center";
		t.width = 91.57;
		t.x = 879.45;
		t.y = 32.55;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/SearchFriend.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["datalist","datascroll","back","friendSearch","searchUserkey"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.datascroll_i(),this.back_i(),this._Label1_i(),this._Image3_i(),this.friendSearch_i(),this.searchUserkey_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.fillMode = "repeat";
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 278;
		t.source = "friendtop_png";
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.datascroll_i = function () {
		var t = new eui.Scroller();
		this.datascroll = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1613;
		t.width = 1080;
		t.x = 0;
		t.y = 291;
		t.viewport = this.datalist_i();
		return t;
	};
	_proto.datalist_i = function () {
		var t = new eui.List();
		this.datalist = t;
		t.anchorOffsetY = 0;
		t.height = 1613;
		t.x = 0;
		t.y = -58;
		return t;
	};
	_proto.back_i = function () {
		var t = new eui.Image();
		this.back = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 96;
		t.source = "rank_back_png";
		t.width = 90.24;
		t.x = 44.85;
		t.y = 26.33;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 50;
		t.text = "用户检索";
		t.x = 438;
		t.y = 49.33;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.source = "indexblcok_png";
		t.width = 88;
		t.x = 667;
		t.y = 34.33;
		return t;
	};
	_proto.friendSearch_i = function () {
		var t = new eui.Image();
		this.friendSearch = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.source = "friend_search_png";
		t.width = 102;
		t.x = 928;
		t.y = 167;
		return t;
	};
	_proto.searchUserkey_i = function () {
		var t = new eui.EditableText();
		this.searchUserkey = t;
		t.anchorOffsetX = 0;
		t.height = 100;
		t.size = 50;
		t.text = "11";
		t.textAlign = "left";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 828;
		t.x = 70;
		t.y = 154;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/SearchFrienditem.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["avater","nicktext","addfriend"];
		
		this.height = 215;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.avater_i(),this.nicktext_i(),this.addfriend_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.truename"],[0],this.nicktext,"text");
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.fillMode = "repeat";
		t.height = 399;
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 207.45;
		t.source = "friend_yellow_png";
		t.width = 1080;
		t.x = 0;
		t.y = 1.52;
		return t;
	};
	_proto.avater_i = function () {
		var t = new eui.Image();
		this.avater = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 107.88;
		t.source = "";
		t.width = 138.18;
		t.x = 90;
		t.y = 41.97;
		return t;
	};
	_proto.nicktext_i = function () {
		var t = new eui.Label();
		this.nicktext = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.size = 50;
		t.textAlign = "left";
		t.textColor = 0x845816;
		t.width = 626.64;
		t.x = 264.03;
		t.y = 72.43;
		return t;
	};
	_proto.addfriend_i = function () {
		var t = new eui.Image();
		this.addfriend = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75;
		t.source = "friend_add_png";
		t.width = 75;
		t.x = 946.9;
		t.y = 59.93;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Setting.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	var LoginSkin$Skin10 = 	(function (_super) {
		__extends(LoginSkin$Skin10, _super);
		function LoginSkin$Skin10() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","switch_off_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","switch_off_png")
					])
			];
		}
		var _proto = LoginSkin$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "switch_on_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginSkin$Skin10;
	})(eui.Skin);

	var LoginSkin$Skin11 = 	(function (_super) {
		__extends(LoginSkin$Skin11, _super);
		function LoginSkin$Skin11() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","savesettingbtn_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","savesettingbtn_png")
					])
			];
		}
		var _proto = LoginSkin$Skin11.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "savesettingbtn_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginSkin$Skin11;
	})(eui.Skin);

	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["avater","mobileinput","nationinput","receiveinput","musicState","musicSlider","saveBtn","back","avamask"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this.avater_i(),this._Label1_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.mobileinput_i(),this.nationinput_i(),this.receiveinput_i(),this.musicState_i(),this.musicSlider_i(),this._Image5_i(),this.saveBtn_i(),this.back_i(),this.avamask_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.fillMode = "repeat";
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto.avater_i = function () {
		var t = new eui.Image();
		this.avater = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 300;
		t.source = "indexadd_png";
		t.width = 300;
		t.x = 373;
		t.y = 76;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 50;
		t.text = "设置";
		t.x = 115;
		t.y = 473.06;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 45;
		t.text = "手机号";
		t.textColor = 0xff0000;
		t.x = 115;
		t.y = 582.15;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.size = 45;
		t.text = "国家";
		t.textColor = 0xFF0000;
		t.x = 115;
		t.y = 746.7;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.size = 45;
		t.text = "收货地址";
		t.textColor = 0xFF0000;
		t.x = 115;
		t.y = 915;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 29.09;
		t.source = "white_line_png";
		t.width = 829.09;
		t.x = 115;
		t.y = 691.33;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 29.09;
		t.source = "white_line_png";
		t.width = 829.09;
		t.x = 115;
		t.y = 855.27;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 29.09;
		t.source = "white_line_png";
		t.width = 829.09;
		t.x = 115;
		t.y = 1028.91;
		return t;
	};
	_proto.mobileinput_i = function () {
		var t = new eui.EditableText();
		this.mobileinput = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 72.73;
		t.text = "";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.width = 821.22;
		t.x = 115;
		t.y = 633.15;
		return t;
	};
	_proto.nationinput_i = function () {
		var t = new eui.EditableText();
		this.nationinput = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 72.73;
		t.text = "";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.width = 821.22;
		t.x = 115;
		t.y = 797.09;
		return t;
	};
	_proto.receiveinput_i = function () {
		var t = new eui.EditableText();
		this.receiveinput = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 72.73;
		t.text = "";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.width = 821.22;
		t.x = 115;
		t.y = 970.73;
		return t;
	};
	_proto.musicState_i = function () {
		var t = new eui.ToggleSwitch();
		this.musicState = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 61.79;
		t.label = "";
		t.width = 131.15;
		t.x = 936.22;
		t.y = 1136.79;
		t.skinName = LoginSkin$Skin10;
		return t;
	};
	_proto.musicSlider_i = function () {
		var t = new eui.HSlider();
		this.musicSlider = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.enabled = true;
		t.height = 62.42;
		t.skinName = "skins.HSliderSkin";
		t.width = 613.39;
		t.x = 280.77;
		t.y = 1136.79;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.source = "music_png";
		t.width = 100;
		t.x = 115;
		t.y = 1118;
		return t;
	};
	_proto.saveBtn_i = function () {
		var t = new eui.Button();
		this.saveBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.label = "";
		t.width = 296;
		t.x = 424;
		t.y = 1518;
		t.skinName = LoginSkin$Skin11;
		return t;
	};
	_proto.back_i = function () {
		var t = new eui.Image();
		this.back = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 120;
		t.source = "back_png";
		t.width = 120;
		t.x = 78.94;
		t.y = 17.51;
		return t;
	};
	_proto.avamask_i = function () {
		var t = new eui.Rect();
		this.avamask = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 300;
		t.ellipseWidth = 300;
		t.fillAlpha = 1;
		t.fillColor = 0x000000;
		t.height = 300;
		t.strokeAlpha = 1;
		t.strokeColor = 0x42ff42;
		t.strokeWeight = 10;
		t.width = 300;
		t.x = 373;
		t.y = 76;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Shop.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Label1_i(),this._Image4_i(),this._Label2_i(),this._Label3_i(),this._Image5_i(),this._Image6_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.fillMode = "repeat";
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 278;
		t.source = "shoptop_png";
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 68;
		t.source = "rank_back_png";
		t.width = 60;
		t.x = 44;
		t.y = 38;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 50;
		t.text = "SHOP";
		t.x = 388;
		t.y = 47;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 86;
		t.source = "shopcard_png";
		t.width = 120;
		t.x = 570;
		t.y = 29;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 45;
		t.text = "Label";
		t.x = 214;
		t.y = 180;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.size = 45;
		t.text = "Label";
		t.x = 738;
		t.y = 180;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.source = "circle_png";
		t.width = 68;
		t.x = 496;
		t.y = 177.5;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1402;
		t.source = "shopbg_png";
		t.width = 994;
		t.x = 44;
		t.y = 300;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Shopskill.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	var LoginSkin$Skin12 = 	(function (_super) {
		__extends(LoginSkin$Skin12, _super);
		function LoginSkin$Skin12() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","shopbuy_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","shopbuy_png")
					])
			];
		}
		var _proto = LoginSkin$Skin12.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "shopbuy_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginSkin$Skin12;
	})(eui.Skin);

	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["skilldescimg","skillname","skilldesc","skillprice","mymoney","buynum","minusBtn","plusBtn","freezebtn","revivebtn","nukebtn","purifybtn","skullbtn","freezenum","nukenum","purifynum","skullnum","revivenum","buybtn","freezeselect","reviveselect","purifyselect","skullselect","nukeselect","back"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.skilldescimg_i(),this.skillname_i(),this.skilldesc_i(),this._Image5_i(),this._Label1_i(),this._Label2_i(),this.skillprice_i(),this.mymoney_i(),this._Image6_i(),this.buynum_i(),this.minusBtn_i(),this.plusBtn_i(),this.freezebtn_i(),this.revivebtn_i(),this.nukebtn_i(),this.purifybtn_i(),this.skullbtn_i(),this._Image7_i(),this._Image8_i(),this._Image9_i(),this._Image10_i(),this._Image11_i(),this.freezenum_i(),this.nukenum_i(),this.purifynum_i(),this.skullnum_i(),this.revivenum_i(),this._Label3_i(),this._Label4_i(),this.buybtn_i(),this.freezeselect_i(),this.reviveselect_i(),this.purifyselect_i(),this.skullselect_i(),this.nukeselect_i(),this.back_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.fillMode = "repeat";
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1645.64;
		t.source = "shopbg3_png";
		t.width = 982;
		t.x = 49;
		t.y = 156;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 110.91;
		t.source = "tabuncheck_png";
		t.width = 329.09;
		t.x = 157.24;
		t.y = 45;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 110.91;
		t.source = "tabcheck_png";
		t.width = 329.09;
		t.x = 603.61;
		t.y = 45;
		return t;
	};
	_proto.skilldescimg_i = function () {
		var t = new eui.Image();
		this.skilldescimg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 422;
		t.source = "shopskillbg_png";
		t.width = 862.42;
		t.x = 109;
		t.y = 200;
		return t;
	};
	_proto.skillname_i = function () {
		var t = new eui.Label();
		this.skillname = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 45.15;
		t.text = "冰冻：";
		t.textAlign = "center";
		t.textColor = 0xf6921e;
		t.verticalAlign = "top";
		t.width = 140.67;
		t.x = 115;
		t.y = 642;
		return t;
	};
	_proto.skilldesc_i = function () {
		var t = new eui.Label();
		this.skilldesc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 142.12;
		t.text = "Freeze all totem monsters on the ten second . Desc";
		t.textAlign = "left";
		t.verticalAlign = "top";
		t.width = 677.03;
		t.x = 255.67;
		t.y = 642;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 135;
		t.source = "money_png";
		t.width = 135;
		t.x = 212;
		t.y = 873;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 45.15;
		t.size = 35;
		t.text = "Costs";
		t.textAlign = "center";
		t.verticalAlign = "top";
		t.width = 134.61;
		t.x = 400;
		t.y = 875;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.height = 45.15;
		t.size = 35;
		t.text = "Youhave";
		t.textAlign = "center";
		t.verticalAlign = "top";
		t.width = 167.94;
		t.x = 700.85;
		t.y = 875;
		return t;
	};
	_proto.skillprice_i = function () {
		var t = new eui.Label();
		this.skillprice = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 57.27;
		t.size = 80;
		t.text = "50";
		t.textAlign = "center";
		t.textColor = 0xf6921e;
		t.width = 210.36;
		t.x = 362.13;
		t.y = 920;
		return t;
	};
	_proto.mymoney_i = function () {
		var t = new eui.Label();
		this.mymoney = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 57.27;
		t.size = 80;
		t.text = "50";
		t.textAlign = "center";
		t.textColor = 0x00d651;
		t.width = 279.36;
		t.x = 663.47;
		t.y = 920;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 62.42;
		t.source = "task_reward_bg_png";
		t.width = 298.79;
		t.x = 390.6;
		t.y = 1057.97;
		return t;
	};
	_proto.buynum_i = function () {
		var t = new eui.Label();
		this.buynum = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 60.3;
		t.size = 40;
		t.text = "1";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 289.16;
		t.x = 400;
		t.y = 1057.06;
		return t;
	};
	_proto.minusBtn_i = function () {
		var t = new eui.Image();
		this.minusBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 25;
		t.source = "minus_png";
		t.width = 70;
		t.x = 277;
		t.y = 1076.68;
		return t;
	};
	_proto.plusBtn_i = function () {
		var t = new eui.Image();
		this.plusBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 70;
		t.source = "plus_png";
		t.width = 70;
		t.x = 733.15;
		t.y = 1057.97;
		return t;
	};
	_proto.freezebtn_i = function () {
		var t = new eui.Image();
		this.freezebtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 150;
		t.source = "freeze_png";
		t.width = 150;
		t.x = 160;
		t.y = 1337;
		return t;
	};
	_proto.revivebtn_i = function () {
		var t = new eui.Image();
		this.revivebtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 150;
		t.source = "revive_png";
		t.visible = false;
		t.width = 150;
		t.x = 160;
		t.y = 1558;
		return t;
	};
	_proto.nukebtn_i = function () {
		var t = new eui.Image();
		this.nukebtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 150;
		t.source = "nuke_png";
		t.width = 150;
		t.x = 360;
		t.y = 1337;
		return t;
	};
	_proto.purifybtn_i = function () {
		var t = new eui.Image();
		this.purifybtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 150;
		t.source = "purify_png";
		t.width = 150;
		t.x = 560;
		t.y = 1337;
		return t;
	};
	_proto.skullbtn_i = function () {
		var t = new eui.Image();
		this.skullbtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 150;
		t.source = "skull_png";
		t.width = 150;
		t.x = 760;
		t.y = 1337;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.source = "unread_png";
		t.width = 40;
		t.x = 250;
		t.y = 1445;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.source = "unread_png";
		t.width = 40;
		t.x = 447.31;
		t.y = 1447;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.source = "unread_png";
		t.width = 40;
		t.x = 659.64;
		t.y = 1445;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.source = "unread_png";
		t.width = 40;
		t.x = 850;
		t.y = 1445;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.source = "unread_png";
		t.visible = false;
		t.width = 40;
		t.x = 250;
		t.y = 1668;
		return t;
	};
	_proto.freezenum_i = function () {
		var t = new eui.Label();
		this.freezenum = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 26.97;
		t.text = "0";
		t.textAlign = "center";
		t.width = 65.48;
		t.x = 235;
		t.y = 1453.52;
		return t;
	};
	_proto.nukenum_i = function () {
		var t = new eui.Label();
		this.nukenum = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 26.97;
		t.text = "0";
		t.textAlign = "center";
		t.width = 65.48;
		t.x = 434.56;
		t.y = 1451.52;
		return t;
	};
	_proto.purifynum_i = function () {
		var t = new eui.Label();
		this.purifynum = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 26.97;
		t.text = "0";
		t.textAlign = "center";
		t.width = 65.48;
		t.x = 646.9;
		t.y = 1451.52;
		return t;
	};
	_proto.skullnum_i = function () {
		var t = new eui.Label();
		this.skullnum = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 26.97;
		t.text = "0";
		t.textAlign = "center";
		t.width = 65.48;
		t.x = 835;
		t.y = 1451.52;
		return t;
	};
	_proto.revivenum_i = function () {
		var t = new eui.Label();
		this.revivenum = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 26.97;
		t.text = "0";
		t.textAlign = "center";
		t.visible = false;
		t.width = 65.48;
		t.x = 235;
		t.y = 1674.52;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 78.48;
		t.size = 50;
		t.text = "块";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 213.39;
		t.x = 215;
		t.y = 61;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 78.48;
		t.size = 50;
		t.text = "技能";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 213.39;
		t.x = 661.46;
		t.y = 61;
		return t;
	};
	_proto.buybtn_i = function () {
		var t = new eui.Button();
		this.buybtn = t;
		t.height = 100;
		t.label = "";
		t.width = 323;
		t.x = 383;
		t.y = 1155;
		t.skinName = LoginSkin$Skin12;
		return t;
	};
	_proto.freezeselect_i = function () {
		var t = new eui.Image();
		this.freezeselect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 160;
		t.source = "skillselected_png";
		t.width = 160;
		t.x = 161.69;
		t.y = 1332;
		return t;
	};
	_proto.reviveselect_i = function () {
		var t = new eui.Image();
		this.reviveselect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 160;
		t.source = "skillselected_png";
		t.visible = false;
		t.width = 160;
		t.x = 157.24;
		t.y = 1558;
		return t;
	};
	_proto.purifyselect_i = function () {
		var t = new eui.Image();
		this.purifyselect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 160;
		t.source = "skillselected_png";
		t.width = 160;
		t.x = 552.38;
		t.y = 1337;
		return t;
	};
	_proto.skullselect_i = function () {
		var t = new eui.Image();
		this.skullselect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 160;
		t.source = "skillselected_png";
		t.width = 160;
		t.x = 750;
		t.y = 1337;
		return t;
	};
	_proto.nukeselect_i = function () {
		var t = new eui.Image();
		this.nukeselect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 160;
		t.source = "skillselected_png";
		t.width = 160;
		t.x = 350;
		t.y = 1332;
		return t;
	};
	_proto.back_i = function () {
		var t = new eui.Image();
		this.back = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.source = "circle_png";
		t.width = 80;
		t.x = 504.5;
		t.y = 1810;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/TaskUI.1.exml.bak'] = window.aboutUISkin = (function (_super) {
	__extends(aboutUISkin, _super);
	var aboutUISkin$Skin13 = 	(function (_super) {
		__extends(aboutUISkin$Skin13, _super);
		function aboutUISkin$Skin13() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","btn_receive_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","btn_receive_png")
					])
			];
		}
		var _proto = aboutUISkin$Skin13.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "btn_receive_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return aboutUISkin$Skin13;
	})(eui.Skin);

	var aboutUISkin$Skin14 = 	(function (_super) {
		__extends(aboutUISkin$Skin14, _super);
		function aboutUISkin$Skin14() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","task_close_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","task_close_png")
					])
			];
		}
		var _proto = aboutUISkin$Skin14.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "task_close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return aboutUISkin$Skin14;
	})(eui.Skin);

	function aboutUISkin() {
		_super.call(this);
		this.skinParts = ["task_name","task_date","task_pic","task_percent","task_desc","task_reward","receive_btn","btnClose"];
		
		this.height = 1536;
		this.width = 864;
		this.elementsContent = [this._Image1_i(),this.task_name_i(),this.task_date_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.task_pic_i(),this._Image6_i(),this.task_percent_i(),this._Image7_i(),this._Image8_i(),this.task_desc_i(),this._Label1_i(),this._Image9_i(),this._Image10_i(),this._Image11_i(),this.task_reward_i(),this.receive_btn_i(),this.btnClose_i(),this._Image12_i(),this._Label2_i()];
	}
	var _proto = aboutUISkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1532.97;
		t.source = "task-bg_png";
		t.width = 867.03;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.task_name_i = function () {
		var t = new eui.Label();
		this.task_name = t;
		t.fontFamily = "SimHei";
		t.size = 80;
		t.text = "每日任务";
		t.x = 326.76;
		t.y = 92.97;
		return t;
	};
	_proto.task_date_i = function () {
		var t = new eui.Label();
		this.task_date = t;
		t.fontFamily = "DFKai-SB";
		t.size = 50;
		t.text = "2.1~2.10";
		t.textColor = 0xfff4af;
		t.x = 386.76;
		t.y = 224.73;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1033.42;
		t.source = "task_tmp1_png";
		t.width = 798.61;
		t.x = 42.5;
		t.y = 374;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 141.6;
		t.source = "task_star_png";
		t.width = 55.24;
		t.x = 784.5;
		t.y = 62.17;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 107.54;
		t.source = "task_star_png";
		t.width = 46.21;
		t.x = 716.11;
		t.y = 220.96;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 89.36;
		t.source = "task_star_png";
		t.width = 43.18;
		t.x = 20.91;
		t.y = 332.27;
		return t;
	};
	_proto.task_pic_i = function () {
		var t = new eui.Image();
		this.task_pic = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 489.46;
		t.source = "task_pic_png";
		t.width = 711.64;
		t.x = 87;
		t.y = 421.63;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 268.09;
		t.source = "task_sbg_png";
		t.width = 672.3;
		t.x = 95.85;
		t.y = 969.51;
		return t;
	};
	_proto.task_percent_i = function () {
		var t = new eui.Image();
		this.task_percent = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 66.36;
		t.source = "task_noticebg_png";
		t.width = 641.54;
		t.x = 111.23;
		t.y = 1103.56;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 96.54;
		t.source = "task_star_png";
		t.width = 47.27;
		t.x = 867.07;
		t.y = 1303.96;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 102.6;
		t.source = "task_star_png";
		t.width = 50.31;
		t.x = 772.51;
		t.y = 1413.25;
		return t;
	};
	_proto.task_desc_i = function () {
		var t = new eui.Label();
		this.task_desc = t;
		t.anchorOffsetX = 0;
		t.size = 50;
		t.text = "删除90个黑块";
		t.textAlign = "center";
		t.width = 452.64;
		t.x = 230.94;
		t.y = 1010.57;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 40;
		t.text = "REWARD";
		t.textColor = 0x56331d;
		t.x = 64.09;
		t.y = 1303.96;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 64.33;
		t.source = "task_reward_bg_png";
		t.width = 273.48;
		t.x = 321.85;
		t.y = 1291.79;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 82.42;
		t.source = "task_pointpic_png";
		t.width = 82.42;
		t.x = 280.64;
		t.y = 1267.75;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50.3;
		t.source = "task_finish_png";
		t.width = 47.27;
		t.x = 326.76;
		t.y = 1318.81;
		return t;
	};
	_proto.task_reward_i = function () {
		var t = new eui.Label();
		this.task_reward = t;
		t.size = 35;
		t.text = "299";
		t.x = 427.76;
		t.y = 1308.96;
		return t;
	};
	_proto.receive_btn_i = function () {
		var t = new eui.Button();
		this.receive_btn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 63.24;
		t.label = "";
		t.width = 166.49;
		t.x = 618.36;
		t.y = 1291.79;
		t.skinName = aboutUISkin$Skin13;
		return t;
	};
	_proto.btnClose_i = function () {
		var t = new eui.Button();
		this.btnClose = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 69.24;
		t.label = "";
		t.width = 70.24;
		t.x = 796.79;
		t.y = 328.5;
		t.skinName = aboutUISkin$Skin14;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 79.28;
		t.source = "task_ppp_png";
		t.width = 115.58;
		t.x = 42.83;
		t.y = 1432.48;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.size = 50;
		t.text = "Daily missions end at midnight and Moday";
		t.textAlign = "center";
		t.textColor = 0xfff4af;
		t.width = 562.24;
		t.x = 200.08;
		t.y = 1422.12;
		return t;
	};
	return aboutUISkin;
})(eui.Skin);generateEUI.paths['resource/skins/TaskUI.exml'] = window.aboutUISkin = (function (_super) {
	__extends(aboutUISkin, _super);
	var aboutUISkin$Skin15 = 	(function (_super) {
		__extends(aboutUISkin$Skin15, _super);
		function aboutUISkin$Skin15() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","btn_receive_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","btn_receive_png")
					])
			];
		}
		var _proto = aboutUISkin$Skin15.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "btn_receive_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return aboutUISkin$Skin15;
	})(eui.Skin);

	var aboutUISkin$Skin16 = 	(function (_super) {
		__extends(aboutUISkin$Skin16, _super);
		function aboutUISkin$Skin16() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","task_close_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","task_close_png")
					])
			];
		}
		var _proto = aboutUISkin$Skin16.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "task_close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return aboutUISkin$Skin16;
	})(eui.Skin);

	function aboutUISkin() {
		_super.call(this);
		this.skinParts = ["task_name","task_date","task_pic","task_desc","task_reward","receive_btn","btnClose","task_percent","taskDataProcess"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this.task_name_i(),this.task_date_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this.task_pic_i(),this._Image7_i(),this._Image8_i(),this.task_desc_i(),this._Label1_i(),this._Image9_i(),this._Image10_i(),this._Image11_i(),this.task_reward_i(),this.receive_btn_i(),this.btnClose_i(),this._Image12_i(),this._Label2_i(),this.task_percent_i(),this.taskDataProcess_i()];
	}
	var _proto = aboutUISkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1920;
		t.source = "task-bg_png";
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.task_name_i = function () {
		var t = new eui.Label();
		this.task_name = t;
		t.fontFamily = "SimHei";
		t.size = 80;
		t.text = "每日任务";
		t.x = 381.61;
		t.y = 92.97;
		return t;
	};
	_proto.task_date_i = function () {
		var t = new eui.Label();
		this.task_date = t;
		t.fontFamily = "DFKai-SB";
		t.size = 50;
		t.text = "2.1~2.10";
		t.textColor = 0xfff4af;
		t.x = 432;
		t.y = 220.96;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1313.42;
		t.source = "task_tmp1_png";
		t.width = 986.61;
		t.x = 42.5;
		t.y = 374;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 141.6;
		t.source = "task_star_png";
		t.width = 55.24;
		t.x = 914.34;
		t.y = 79.36;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 141.6;
		t.source = "task_star_png";
		t.width = 55.24;
		t.x = 946.37;
		t.y = 1746.84;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 107.54;
		t.source = "task_star_png";
		t.width = 46.21;
		t.x = 808.8;
		t.y = 192.19;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 89.36;
		t.source = "task_star_png";
		t.width = 43.18;
		t.x = 20.91;
		t.y = 332.27;
		return t;
	};
	_proto.task_pic_i = function () {
		var t = new eui.Image();
		this.task_pic = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 565.46;
		t.source = "task_pic_png";
		t.width = 867.64;
		t.x = 100.11;
		t.y = 545.25;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 316.09;
		t.source = "task_sbg_png";
		t.width = 900.3;
		t.x = 80.47;
		t.y = 1230.7;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 96.54;
		t.source = "task_star_png";
		t.width = 47.27;
		t.x = 808.8;
		t.y = 1420.47;
		return t;
	};
	_proto.task_desc_i = function () {
		var t = new eui.Label();
		this.task_desc = t;
		t.anchorOffsetX = 0;
		t.size = 50;
		t.text = "删除90个黑块";
		t.textAlign = "center";
		t.width = 452.64;
		t.x = 304.3;
		t.y = 1302.75;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 40;
		t.text = "REWARD";
		t.textColor = 0x56331d;
		t.x = 126.3;
		t.y = 1600.01;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 64.33;
		t.source = "task_reward_bg_png";
		t.width = 297.48;
		t.x = 392.87;
		t.y = 1593.3;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 82.42;
		t.source = "task_pointpic_png";
		t.width = 82.42;
		t.x = 357.98;
		t.y = 1573.65;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50.3;
		t.source = "task_finish_png";
		t.width = 47.27;
		t.x = 416.77;
		t.y = 1614.86;
		return t;
	};
	_proto.task_reward_i = function () {
		var t = new eui.Label();
		this.task_reward = t;
		t.size = 35;
		t.text = "299";
		t.x = 556.41;
		t.y = 1605.01;
		return t;
	};
	_proto.receive_btn_i = function () {
		var t = new eui.Button();
		this.receive_btn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.24;
		t.label = "";
		t.width = 226.49;
		t.x = 739.47;
		t.y = 1584.89;
		t.skinName = aboutUISkin$Skin15;
		return t;
	};
	_proto.btnClose_i = function () {
		var t = new eui.Button();
		this.btnClose = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 109.24;
		t.label = "";
		t.width = 110.24;
		t.x = 973.99;
		t.y = 319.38;
		t.skinName = aboutUISkin$Skin16;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 135.28;
		t.source = "task_ppp_png";
		t.width = 155.58;
		t.x = 64.09;
		t.y = 1746.84;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.size = 50;
		t.text = "Daily missions end at midnight and Moday";
		t.textAlign = "center";
		t.textColor = 0xfff4af;
		t.width = 562.24;
		t.x = 304.79;
		t.y = 1782.12;
		return t;
	};
	_proto.task_percent_i = function () {
		var t = new eui.Image();
		this.task_percent = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 66.36;
		t.source = "task_noticebg_png";
		t.width = 641.54;
		t.x = 189.66;
		t.y = 1435.56;
		return t;
	};
	_proto.taskDataProcess_i = function () {
		var t = new eui.ProgressBar();
		this.taskDataProcess = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.enabled = true;
		t.height = 64;
		t.width = 618;
		t.x = 204.77;
		t.y = 1435.56;
		return t;
	};
	return aboutUISkin;
})(eui.Skin);generateEUI.paths['resource/skins/top.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Label1_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.fillMode = "repeat";
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 265.46;
		t.source = "indextop_png";
		t.width = 1074.54;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 175;
		t.source = "indexadd_png";
		t.width = 175;
		t.x = 58.03;
		t.y = 62.12;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80.61;
		t.source = "namelabel_png";
		t.width = 292.73;
		t.x = 247.27;
		t.y = 69.01;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.height = 80;
		t.size = 50;
		t.text = "Label";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 292;
		t.x = 245.27;
		t.y = 69.01;
		return t;
	};
	return LoginSkin;
})(eui.Skin);generateEUI.paths['resource/skins/Usertop.exml'] = window.LoginSkin = (function (_super) {
	__extends(LoginSkin, _super);
	function LoginSkin() {
		_super.call(this);
		this.skinParts = ["avater","nickText","power1","power2","power3","power4","power5","addmoney","addpower","moneyText","powerText","avamask"];
		
		this.height = 266;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.avater_i(),this._Image3_i(),this.nickText_i(),this.power1_i(),this.power2_i(),this.power3_i(),this.power4_i(),this.power5_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this.addmoney_i(),this.addpower_i(),this.moneyText_i(),this.powerText_i(),this.avamask_i()];
	}
	var _proto = LoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 1655;
		t.fillMode = "repeat";
		t.left = 0;
		t.right = 0;
		t.source = "BgColor01_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 265.46;
		t.source = "indextop_png";
		t.width = 1074.54;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.avater_i = function () {
		var t = new eui.Image();
		this.avater = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 175;
		t.source = "";
		t.width = 175;
		t.x = 58.03;
		t.y = 62.12;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80.61;
		t.source = "namelabel_png";
		t.width = 292.73;
		t.x = 247.27;
		t.y = 69.01;
		return t;
	};
	_proto.nickText_i = function () {
		var t = new eui.Label();
		this.nickText = t;
		t.height = 80;
		t.size = 50;
		t.text = "";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 292;
		t.x = 245.27;
		t.y = 69.01;
		return t;
	};
	_proto.power1_i = function () {
		var t = new eui.Image();
		this.power1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.source = "quqi_b_png";
		t.width = 52;
		t.x = 262;
		t.y = 188;
		return t;
	};
	_proto.power2_i = function () {
		var t = new eui.Image();
		this.power2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.source = "quqi_b_png";
		t.width = 52;
		t.x = 327.27;
		t.y = 188;
		return t;
	};
	_proto.power3_i = function () {
		var t = new eui.Image();
		this.power3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.source = "quqi_b_png";
		t.width = 52;
		t.x = 391.27;
		t.y = 188;
		return t;
	};
	_proto.power4_i = function () {
		var t = new eui.Image();
		this.power4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.source = "quqi_b_png";
		t.width = 52;
		t.x = 455;
		t.y = 188;
		return t;
	};
	_proto.power5_i = function () {
		var t = new eui.Image();
		this.power5 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.source = "quqi_b_png";
		t.width = 52;
		t.x = 524;
		t.y = 188;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80.61;
		t.source = "namelabel_png";
		t.width = 362.73;
		t.x = 621.27;
		t.y = 69.01;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80.61;
		t.source = "namelabel_png";
		t.width = 299.73;
		t.x = 684.27;
		t.y = 156.51;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 95;
		t.source = "money_png";
		t.width = 95;
		t.x = 584.77;
		t.y = 60.73;
		return t;
	};
	_proto.addmoney_i = function () {
		var t = new eui.Image();
		this.addmoney = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 77;
		t.source = "indexadd_png";
		t.width = 84;
		t.x = 900;
		t.y = 69.01;
		return t;
	};
	_proto.addpower_i = function () {
		var t = new eui.Image();
		this.addpower = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 77;
		t.source = "indexadd_png";
		t.width = 84;
		t.x = 900;
		t.y = 160.12;
		return t;
	};
	_proto.moneyText_i = function () {
		var t = new eui.Label();
		this.moneyText = t;
		t.height = 80;
		t.size = 50;
		t.text = "";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 292;
		t.x = 632.27;
		t.y = 69.01;
		return t;
	};
	_proto.powerText_i = function () {
		var t = new eui.Label();
		this.powerText = t;
		t.height = 80;
		t.size = 50;
		t.text = "";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 292;
		t.x = 656.64;
		t.y = 155.73;
		return t;
	};
	_proto.avamask_i = function () {
		var t = new eui.Rect();
		this.avamask = t;
		t.ellipseHeight = 200;
		t.ellipseWidth = 200;
		t.height = 175;
		t.width = 175;
		t.x = 58;
		t.y = 62;
		return t;
	};
	return LoginSkin;
})(eui.Skin);