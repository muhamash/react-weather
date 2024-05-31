/* eslint-disable react/prop-types */
import HeartIcon from '../../assets/heart.svg';

export default function Fav({onShow}) {
    return (
        <div className="p-2 hover:bg-rose-400 hover:text-white cursor-pointer flex gap-2 items-center rounded-md transition-all">
            <img src={HeartIcon} alt="" />
            <span onClick={ onShow }>Favorite Locations</span>
        </div>
    );
}
