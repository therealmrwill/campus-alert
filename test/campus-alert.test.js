import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../campus-alert.js';

describe('CampusAlert', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture(html`<campus-alert></campus-alert>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture(html`<campus-alert></campus-alert>`);
    el.shadowRoot.querySelector('button').click();

    expect(el.counter).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture(html`<campus-alert header="attribute header"></campus-alert>`);

    expect(el.header).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<campus-alert></campus-alert>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
