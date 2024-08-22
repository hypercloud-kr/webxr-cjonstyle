import RadioList from './RadioList';
import RadioItem from './RadioItem';
import RadioGroup from './RadioGroup';

const Radio = {
  List: RadioList,
  Group: RadioGroup,
  Item: RadioItem,
};

export default Radio;

/*
Usage: RadioItem
<Radio.Group>
  <RadioItem name={"gender"} text={"남성"} value={"male"} />
  <RadioItem name={"gender"} text={"여성"} value={"female"} />
</Radio.Group>

Usage: RadioList
<Radio.Group>
  <Radio.List name="gender" items={[{value: "male", text: "남성"}, {value: "female", text: "여성"}]} />
</Radio.Group>
<Radio.Group>
  <Radio.List name="gender" items={["male","female"]} />
</Radio.Group>

 */
