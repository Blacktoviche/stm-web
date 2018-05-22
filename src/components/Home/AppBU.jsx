import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Sidebar } from 'primereact/components/sidebar/Sidebar';
import { Button } from 'primereact/components/button/Button';
import { Toolbar } from 'primereact/components/toolbar/Toolbar';
import { PanelMenu } from 'primereact/components/panelmenu/PanelMenu';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';

class AppBU extends Component {


  componentWillMount() {
    let jwt = localStorage.getItem('jwt');
    console.log('jwt token is' + jwt);
  }


  render() {

    var items = [
      {
        label: 'File',
        icon: 'fa-file-o',
        items: [{
          label: 'New',
          icon: 'fa-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { separator: true },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Edit',
        icon: 'fa-edit',
        items: [
          { label: 'Undo', icon: 'fa-mail-forward' },
          { label: 'Redo', icon: 'fa-mail-reply' }
        ]
      },
      {
        label: 'Help',
        icon: 'fa-question',
        items: [
          {
            label: 'Contents'
          },
          {
            label: 'Search',
            icon: 'fa-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'File'
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'fa-gear',
        items: [
          {
            label: 'Edit',
            icon: 'fa-refresh',
            items: [
              { label: 'Save', icon: 'fa-save' },
              { label: 'Update', icon: 'fa-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'fa-phone',
            items: [
              { label: 'Delete', icon: 'fa-minus' }
            ]
          }
        ]
      }
    ];
    return (
      <div className="ui-g">
        <div className="ui-g-12 ui-md-2">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <PanelMenu model={items} />
        </div>
        <div className="ui-g-12 ui-md-10 ui-g-nopad">
          <div className="ui-g-12">

            <Toolbar>
              <div className="ui-toolbar-group-left">
                <Button label="New" icon="fa-plus" />
                <Button label="Open" icon="fa-folder-open" className="ui-button-success" />
                <i className="fa fa-bars"></i>
                <Button label="Save" icon="fa-check" className="ui-button-warning" />
              </div>
              <div className="ui-toolbar-group-right">
                <Button icon="fa-search" />
                <i className="fa fa-bars"></i>
                <Button icon="fa-refresh" />
                <Button icon="fa-trash" className="ui-button-danger" />
              </div>
            </Toolbar>
          </div>
          <div className="ui-g-12 ui-g-nopad">
            <div className="ui-g">
              <div className="ui-g-12 ui-md-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet, orci nec dictum convallis, ligula mauris vestibulum turpis, nec varius tortor quam at diam. Nullam a viverra nibh. In tincidunt tempor lectus quis vulputate. Pellentesque nec dui aliquam, lobortis est in, lobortis ante</div>
              <div className="ui-g-12 ui-md-4">Maecenas vel nisi aliquet, vulputate tortor id, laoreet massa. Maecenas mattis tristique bibendum. Suspendisse vel mi dictum, vestibulum lacus quis, pulvinar quam. Proin vulputate, nibh at finibus varius, leo eros lacinia elit, nec blandit odio tellus a justo. Donec nec ex auctor, tristique nulla nec, rutrum sapien.</div>
              <div className="ui-g-12 ui-md-4">Proin efficitur in leo eget ornare. Nam vestibulum neque sed velit sagittis sodales. Sed scelerisque hendrerit magna a hendrerit. Cras tempor sem at justo pharetra convallis. Curabitur vel sodales purus. Vestibulum interdum facilisis nulla imperdiet suscipit. Quisque lectus felis, condimentum eget hendrerit sit amet.</div>
            </div>

            <div className="ui-g">
              <div className="ui-g-6 ui-md-3"><img alt="Galleria 1" src="showcase/resources/demo/images/galleria/galleria1.jpg" style={{ width: '100%' }} /></div>
              <div className="ui-g-6 ui-md-3"><img alt="Galleria 2" src="showcase/resources/demo/images/galleria/galleria2.jpg" style={{ width: '100%' }} /></div>
              <div className="ui-g-6 ui-md-3"><img alt="Galleria 3" src="showcase/resources/demo/images/galleria/galleria3.jpg" style={{ width: '100%' }} /></div>
              <div className="ui-g-6 ui-md-3"><img alt="Galleria 4" src="showcase/resources/demo/images/galleria/galleria4.jpg" style={{ width: '100%' }} /></div>
            </div>

            <div className="ui-g">
              <div className="ui-g-12 ui-md-6">Phasellus faucibus purus volutpat mauris lacinia sodales. Ut sit amet sapien facilisis, commodo dui non, fringilla tellus. Quisque tempus facilisis nisi sodales finibus. Pellentesque neque orci, ullamcorper vitae ligula quis, dignissim euismod augue.</div>
              <div className="ui-g-12 ui-md-6">Fusce ullamcorper congue massa, eget ullamcorper nunc lobortis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultrices dui eget dolor feugiat dapibus. Aliquam pretium leo et egestas luctus. Nunc facilisis gravida tellus.</div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default AppBU;
