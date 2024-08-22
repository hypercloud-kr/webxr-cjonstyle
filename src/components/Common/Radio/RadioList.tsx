import { useMemo } from 'react';
import RadioItem from './RadioItem';
import RadioGroup from './RadioGroup';
import { FieldValue, UseFormRegister } from 'react-hook-form';

interface ItemObjectType {
  text: string;
  value: string;
}

interface RadioProps {
  items: (string | ItemObjectType)[];
  name: string;
  register?: UseFormRegister<FieldValue<any>>;
}

const RadioList = (props: RadioProps) => {
  const { name, register } = props;
  const items: ItemObjectType[] = useMemo(() => {
    return props.items.map(item => {
      if (typeof item === 'string') {
        return { text: item, value: item };
      }
      return item;
    });
  }, [props.items]);
  return (
    <RadioGroup>
      {items.map((item, idx) => {
        return (
          <RadioItem
            {...register?.(name)}
            key={item.value}
            name={name}
            text={item.text}
            value={item.value}
            defaultChecked={idx === 0}
          />
        );
      })}
    </RadioGroup>
  );
};

export default RadioList;
