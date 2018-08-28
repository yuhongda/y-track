# y-track
> 项目埋点装饰器

Install
-----

```javascript

npm i y-track --save

```


Usage
-----

```javascript
import enableTrack from 'y-track'

//页面容器组件
@registerTmpl('excellentSuppliers')
@inject('store')
@observer
@enableTrack([
  {
    methodName: 'componentDidMount',
    description: 'pageload'
  }
],{
  app : "app name",
  version : "1.0",
  loginUser : window.userPin,
  funcPath : ""
})
export default class excellentSuppliers extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    const { store: { excellentSuppliers } } = this.props;
    return tmpls.excellentSuppliers(this.state, this.props, this, {
      styles,
      excellentSuppliers
    });
  }
}

```



