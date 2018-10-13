// https://niceverynice.com/storygram/

import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import s from "tachyons";
// z
import "./styles.css";

const social = {
  instagramStories: {
    width: 1600,
    height: 2844
  }
};

class Template extends React.Component {
  render() {
    const { width, height } = this.props;
    console.log("init >", width, height);
    const {
      selected,
      title,
      subtitle,
      primaryColor,
      secondaryColor,
      className
    } = this.props;

    return (
      <html
        style={{
          fontSize: this.props.fontSize + "px",
          zoom: this.props.zoom + "%",
          userSelect: "none"
        }}
      >
        <head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
          />
        </head>
        <body>
          <div
            className={
              "bg-" +
              secondaryColor +
              " overflow-hidden dib shadow-3 " +
              className
            }
            style={{
              width: this.props.width + "px",
              height: this.props.height + "px",
              padding: "20px"
            }}
          >
            <div className="flex h-50 ba">
              <div className="w-50">
                <div
                  className="h-100"
                  style={{
                    background:
                      "url(https://images.unsplash.com/photo-1520065949650-380765513210?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c1bccb5559b6cad97eccfe520826d5d&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb)",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                />
              </div>
              <div className="w-50">
                <div className="h-100">
                  <div className="h-50 pa1">
                    <div
                      className="h-100"
                      style={{
                        background:
                          "url(https://images.unsplash.com/photo-1517219039361-66f283bce5db?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed70903edc737861b0357152e2d60ea5&auto=format&fit=crop&w=1491&q=80)",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                  </div>
                  <div className="h-50 pa1">
                    <div
                      className="h-100"
                      style={{
                        background:
                          "url(https://images.unsplash.com/photo-1521223344201-d169129f7b7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=029c689cde7c098e72b059ecd7060150&auto=format&fit=crop&w=675&q=80)",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="avenir f1 mt2 b navy tc"
              onClick={() => this.props.onClick("title")}
            >
              {this.props.title}
            </div>
            <div
              className="tc lh-copy f6 near-black avenir"
              onClick={() => this.props.onClick("subtitle")}
            >
              {this.props.subtitle}
            </div>
            <div className="mt4 tc">
              <a className="f6 link dim br2 ph3 pv2 mb2 dib white bg-navy avenir ttu">
                Shop now
              </a>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

Template.editor = {
  elements: {
    title: {
      name: "title",
      dislpayName: "Title",
      type: "text",
      default: "Beach kit"
    },
    subtitle: {
      name: "subtitle",
      dislpayName: "Sub-Title",
      type: "textarea",
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin iaculis scelerisque. Nullam sagittis placerat arcu, eget accumsan eros gravida a. "
    },
    primaryColor: {
      name: "primaryColor",
      dislpayName: "Primary Color",
      type: "text",
      default: "navy"
    },
    secondaryColor: {
      name: "secondaryColor",
      dislpayName: "Secondary Color",
      type: "text",
      default: "white"
    }
  },
  layout: [
    {
      type: "group",
      elements: [
        { type: "field", name: "title" },
        { type: "field", inputType: "textarea", name: "subtitle" }
      ]
    },
    {
      type: "group",
      elements: [
        { type: "field", name: "primaryColor" },
        { type: "field", name: "secondaryColor" },
        {
          type: "group",
          orientation: "horizontal",
          elements: [
            /*{ type: "field", name: "blackColor" },
            { type: "field", name: "whiteColor" }*/
          ]
        }
      ]
    }
  ]
};

const Input = ({ name, value, onChange, conf }) => {
  const fromConf = _.get(conf, ["elements", name], {});
  const { dislpayName, type = "text" } = fromConf;
  return (
    <div className="w-100">
      <span className=" f6 b tr mb2 dib tracked gray">
        {dislpayName || name}
      </span>
      <br />
      <input
        onChange={onChange}
        value={value}
        className="bg-transparent ba b--gray br2 near-white pa1 w-100 db"
        type="text"
      />
    </div>
  );
};

const Textarea = ({ name, value, onChange, conf }) => {
  const fromConf = _.get(conf, ["elements", name], {});
  const { displayName, type = "text" } = fromConf;
  return (
    <div className="w-100">
      <span className="ttu f6 b tr mb2 dib tracked gray">
        {displayName || name}
      </span>
      <br />
      <textarea
        rows={3}
        onChange={onChange}
        value={value}
        className="bg-transparent ba b--gray br2 near-white pa1 w-100 db"
        type="text"
      />
    </div>
  );
};

const renderTo = (layout, data, ctx) => {
  if (_.isArray(layout)) {
    /**
     * ARRAYS
     */
    // console.warn("array", layout);
    return layout.map(l => renderTo(l, data, ctx));
  } else if (_.isObject(layout) && _.get(layout, "type") === "group") {
    /**
     * GROUPS
     */
    // console.warn("group", layout);
    const orientation = _.get(layout, "orientation", "vertical");
    const isVertical = orientation === "vertical";

    const elements = _
      .get(layout, "elements", [])
      .map(l => renderTo(l, data, ctx));
    if (elements.length === 0) {
      return "";
    }

    return (
      <div
        className={
          "mt2 pt2 bt b--dark-gray flex " + (isVertical ? "flex-column" : "")
        }
      >
        {elements}
      </div>
    );
  } else if (_.isObject(layout) && _.get(layout, "type") === "field") {
    // console.warn("field", layout);
    /**
     * FIELDS
     */
    const type = _.get(layout, "inputType", "text");
    let Comp = Input;
    // console.log(type, layout.name);
    if (type === "textarea") {
      Comp = Textarea;
    }

    return (
      <div className="w-100 pa2">
        <Comp
          conf={ctx.editorConfig}
          name={layout.name}
          onChange={e => ctx.setValue(layout.name, e.target.value)}
          value={data[layout.name]}
        />
      </div>
    );
  } else {
    console.warn("other", layout);
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    const data = {};
    _.mapValues(Template.editor.elements, val => {
      if (val.default) data[val.name] = val.default;
    });

    this.state = { selected: "title", data, ratio: 22 };
    console.log("this.state", this.state);
  }

  onClick = field => {
    return this.setState({ selected: field });
  };

  setValue = (field, value) => {
    const data = this.state.data;
    data[field] = value;
    this.setState({ data });
  };

  setRatio = e => {
    this.setState({ ratio: e.target.value });
  };
  getValueForField = field => {};

  render() {
    const ctx = {
      setValue: this.setValue,
      editorConfig: Template.editor
    };

    const res = renderTo(Template.editor.layout, this.state.data, ctx);

    // const ratio = parseInt(this.state.ratio);
    const ratio = 20;
    const width = (ratio / 100) * social.instagramStories.width;
    const height = (ratio / 100) * social.instagramStories.height;
    const fontSize = (ratio / 100 + 1) * 14;

    const ratioZoom = 90;
    console.log("medidas: ", width, height, fontSize);

    const tpl = (
      <Template
        width={width}
        height={height}
        fontSize={fontSize}
        zoom={ratioZoom}
        ratio={this.state.ratio / 100}
        title2={this.state.data.title || Template.editor.elements.title.default}
        {...this.state.data}
        selected={this.state.selected}
        onClick={this.onClick}
      />
    );

    return (
      <div className="pa2 bg-near-black near-white avenir flex">
        <div className="w-50">
          <div className=" center measure">
            {res}
            <br />
            <input
              id="test"
              name="test"
              type="range"
              className="w-100"
              value={this.state.ratio}
              min="0"
              max="100"
              onChange={this.setRatio}
            />
            {this.state.ratio}%
            <div className="flex mt4 db">
              <div className="w-50">
                <a className="pointer hover-bg-gold ba mr2 ph2 pv1 f6 br2 dib">
                  Export
                </a>
                <a className="pointer hover-bg-gold ba mr2 ph2 pv1 f6 br2 dib">
                  Import
                </a>
              </div>
              <div className="w-50 tr">
                <a className="pointer hover-bg-gold ba mr2 ph2 pv1 f6 br2 dib">
                  Save image
                </a>
              </div>
            </div>
          </div>

          <br />
        </div>
        <div className="bg-near-white pv2 mt2 pa3 w-50 tc">
          <Frame
            width={(width * ratioZoom) / 100}
            height={(height * ratioZoom) / 100}
            className="shadow-1"
          >
            {tpl}
          </Frame>
        </div>
      </div>
    );
  }
}

class Frame extends React.Component {
  componentDidMount = () => {
    this.update();
  };
  componentDidUpdate = () => {
    this.update();
  };

  update = () => {
    const ifr = this.ref.contentDocument;
    ReactDOM.render(this.props.children, ifr);
  };
  render() {
    return (
      <div>
        <iframe frameborder="0" ref={f => (this.ref = f)} {...this.props} />
        <a onClick={() => console.log(this.ref)}>print</a>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
