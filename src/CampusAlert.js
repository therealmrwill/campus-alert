import { html, css, LitElement } from 'lit';

export class CampusAlert extends LitElement {
  static styles = css`
    :host{
      --main-color: gray;
      --secondary-color: white;
      --text-color: black;

      overflow: hidden;
      margin: 0px;
      padding: 0px;

      font-size: 25px;
      font-weight: bold;
      font-family: 'Roboto',Helvetica,Arial,Lucida,sans-serif;
      font-style: italic;

      
      color: var(--text-color);
      background-color: var(--main-color);

    }

    h1{
      margin: 0px;
      padding: 0px;
    }

    .secondary{
      background-color: var(--secondary-color);
    }

    .main{
      background-color: var(--main-color);
    }


    .right-margin{
      margin-right: 8px;
    }

    .closed-container{

      display: flex;
      align-items: center;
      justify-content: center;

      width: 100vw;
      height: 75px;
      margin-bottom: 8px;
      
    }

    .container{
        width: 100vw;
        height: 200px;
        margin-bottom: 8px;

        display:flex;
    }

    :host([sticky]) .container{
      position: sticky;
      top: 0;
      z-index: 100;
    }

  `;

  static properties = {
    // Notice, Warning, Alert
    issueLevel: { type: String, attribute: "issue-level"},
    alertTitle: {type: String, attribute: "alert-title"},
    sticky: {type: Boolean, reflect: true},
    opened: {type: Boolean, reflect: true},
  };

  constructor() {
    super();
    this.issueLevel = "alert";
    this.alertTitle = "Test Campus Alert"
    this.sticky = false;
    this.opened = true;
    if(localStorage.getItem("campus-alert-opened-state") === 'false'){
      this.opened = false;
    }
  }


  issueColors(){
    // Highest level - Red Main 
    if(this.issueLevel === "warning"){
      this.style.setProperty('--main-color', '#F44336');
      this.style.setProperty('--secondary-color', '#EF9A9A');
      this.style.setProperty('--text-color', 'black')
    }

    // Medium level - Orange Main
    if(this.issueLevel === "alert"){
      this.style.setProperty('--main-color', '#ffd100');
      this.style.setProperty('--secondary-color', '#bf8226');
      this.style.setProperty('--text-color', 'black');
    }


    // Low Level - Blue Main 
    if(this.issueLevel === "notice"){
      this.style.setProperty('--main-color', '#cfeceb');
      this.style.setProperty('--secondary-color', 'white');
      this.style.setProperty('--text-color', 'black');
    }
  }




  toggleOpen() {
    this.opened = !this.opened;
    localStorage.setItem("campus-alert-opened-state", this.opened);
  }

  getCorrectSVG(){
    if(this.issueLevel === "warning"){
      return html`<svg style="height:80%; width:5%;" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24"><title>alert-outline</title><path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" /></svg>`;
    }

    if(this.issueLevel === "alert"){
      return html`<svg style="height:80%; width:5%;" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><title>alert-box-outline</title><path d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M11,15H13V17H11V15M11,7H13V13H11V7" /></svg>`
    }

    if(this.issueLevel === "notice"){
      return html`<svg style="height:80%; width:5%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>`;
    }

    return "";
  }
  
  openedView(){
    return html `
      <div class="container main">
        <!-- <div class="secondary" style="height: 100%; width: 25%"> -->
          
        <div class="main" style="height: 100%; width: 25%">
          <slot title="date"></slot>
          <slot title="message"></slot>
        </div>
        <button @click="${this.toggleOpen}">Close</button>
        <!-- <div class="secondary" style="height: 100%; width: 25%"></div> -->
      </div>
    `;
  }


  // Should be completed - don't have to touch for a while
  closedView(){
    return html `
      <div class="closed-container main" @click="${this.toggleOpen}" @keyup="${this.toggleOpen}">
            ${this.getCorrectSVG()}
            <div class="message right-margin">${this.alertTitle}</div>
            <svg xmlns="http://www.w3.org/2000/svg" style="height:25px; width:25px;" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>  
      </div>
    `;
  }


  render() {
    this.issueColors();
    return (this.opened) ? this.openedView() : this.closedView();
  }
}
