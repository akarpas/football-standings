import React from 'react';
import { Provider } from 'react-redux'
import App from '../App';
import { mount } from 'enzyme';
import createStore from '../store';

const store = createStore({});
const initialState = {
  standings: {
    standings: [],
    standingsLoading: false,
  }
}
let wrapper;

describe('basic tests', () => {
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store} initialState={initialState}>
        <App />
      </Provider>
    );
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('has a preliminary loading div', () => {
    expect(wrapper.find(".loading").length).toEqual(1);
    expect(wrapper.find(".loading").text()).toContain('Loading');
  });
});

describe('loading of standings', () => {
  beforeAll(async (done) => {
    wrapper = mount(
      <Provider store={store} initialState={initialState}>
        <App />
      </Provider>
    );
    setTimeout(() => {
      wrapper.update()
      done()
    }, 1500);
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('has a container div', () => {
    expect(wrapper.find(".container").length).toEqual(1);
  });
  it('has a header', () => {
    expect(wrapper.find("h3").length).toEqual(1);
    expect(wrapper.find("h3").text()).toContain('Standings');
  });
  it('has 20 rows', () => {
    expect(wrapper.find(".row").length).toEqual(19);
    expect(wrapper.find(".rowLast").length).toEqual(1);
  });
  it('redux loading of standings is false', () => {
    const standingsLoading = wrapper.state().storeState['standings']['standingsLoading'];
    expect(standingsLoading).toEqual(false);
  });
  it('loads an array of 20 teams', () => {
    const standings = wrapper.state().storeState['standings']['standings'];
    expect(standings.length).toEqual(20);
  });
  it('one team contains a position and a crest', () => {
    const standings = wrapper.state().storeState['standings']['standings'];
    expect(standings[0].position).toBeTruthy();
    expect(standings[0].crest).toBeTruthy();
  });
  it('one team contains home, away and total in standings returned', () => {
    const standings = wrapper.state().storeState['standings']['standings'];
    expect(standings[0].home).toBeTruthy();
    expect(standings[0].away).toBeTruthy();
    expect(standings[0].total).toBeTruthy();
  });
});


describe('loading of standings', () => {
  beforeAll(async (done) => {
    wrapper = mount(
      <Provider store={store} initialState={initialState}>
        <App />
      </Provider>
    );
    setTimeout(() => {
      wrapper.update()
      done()
    }, 1500);
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('on click of sort on Position, standing order changes to descending', () => {
    const initialStandings = wrapper.state().storeState['standings']['standings'];
    wrapper.find('#total-position').first().simulate('click');
    wrapper.update();
    const updateStandings = wrapper.state().storeState['standings']['standings'];
    expect(initialStandings).not.toEqual(updateStandings);
    expect(initialStandings).toEqual(updateStandings.reverse());
  });
});