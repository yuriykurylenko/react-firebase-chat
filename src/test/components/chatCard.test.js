import React from 'react';
import ChatCard from '../../components/chatCard/chatCard';
import { mount } from 'enzyme';

describe('<ChatCard />', () => {
  const props = {
    userName: 'Lars Larsen',
    userPhotoUrl: 'http://random-url.com',
    lastMessageSentTime: 'Today at 10:00',
    lastMessageText: 'Hey!',
    isActive: false,
    onClick: jest.fn()
  };

  describe('render', () => {
    test('it renders the ChatCard component', () => {
      const component = mount(<ChatCard { ...props } />);

      expect(component.find('.chat-card').length).toEqual(1);
    });

    test('it renders the profile image with correct url inside the card', () => {
      const component = mount(<ChatCard { ...props } />);

      expect(component.find('img').length).toEqual(1);
      expect(component.find('img').props()).toHaveProperty('src', props.userPhotoUrl);
    });

    test('it renders the correct last message inside the card', () => {
      const component = mount(<ChatCard { ...props } />);

      expect(component.find('.message-text').length).toEqual(1);
      expect(component.find('.message-text').text()).toEqual(props.lastMessageText);
    });

    test('it renders the correct last message send time inside the card', () => {
      const component = mount(<ChatCard { ...props } />);

      expect(component.find('.time-text').length).toEqual(1);
      expect(component.find('.time-text').text()).toEqual(props.lastMessageSentTime);
    });

    describe('when last message details are not specified', () => {
      const dummyText = 'Your chat starts here...';
      const dummyCardProps = {
        ...props,
        lastMessageSentTime: null,
        lastMessageText: null
      };

      test('it renders only the dummy text inside the card', () => {
        const component = mount(<ChatCard { ...dummyCardProps } />);

        expect(component.text()).toEqual(dummyText);
      });
    });

    describe('onClick', () => {
      test('it reacts to a click', () => {
        const component = mount(<ChatCard { ...props } />);

        component.find('a').simulate('click');
        expect(props.onClick).toHaveBeenCalled();
      });
    })
  });
});
